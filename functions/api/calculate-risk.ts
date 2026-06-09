import { z } from "zod";

interface Env {
  HUBSPOT_SERVICE_KEY: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY: string;
}

const calculateRiskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  score: z.number().min(0).max(100),
  gaps: z.array(z.string()),
  turnstileToken: z.string().optional().nullable(),
  highUrgency: z.boolean().optional(),
});

export const onRequestPost = async (context: { request: any; env: Env }) => {
  try {
    const data: any = await context.request.json();

    const validation = calculateRiskSchema.safeParse(data);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Malformed or missing request parameters.",
          details: validation.error.format()
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, company, email, score, gaps, turnstileToken, highUrgency } = validation.data;

    // 1. Verify Cloudflare Turnstile token if secret key is present
    if (context.env.CLOUDFLARE_TURNSTILE_SECRET_KEY && turnstileToken) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(context.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}`
      });
      const verifyJson: any = await verifyRes.json();
      if (!verifyJson.success) {
        return new Response(
          JSON.stringify({ success: false, error: "Security validation failed. Please try again." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // 2. HubSpot Integration (Contact, Company, Association, and Deal Generation)
    let contactId = "";
    let companyId = "";

    if (context.env.HUBSPOT_SERVICE_KEY) {
      const headers = {
        "Authorization": `Bearer ${context.env.HUBSPOT_SERVICE_KEY}`,
        "Content-Type": "application/json"
      };

      // 2a. Search or Create Company
      try {
        const companySearchRes = await fetch("https://api.hubapi.com/crm/v3/objects/companies/search", {
          method: "POST",
          headers,
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: "name",
                operator: "EQ",
                value: company
              }]
            }]
          })
        });

        if (companySearchRes.ok) {
          const searchData: any = await companySearchRes.json();
          if (searchData.results && searchData.results.length > 0) {
            companyId = searchData.results[0].id;
          }
        }

        if (!companyId) {
          const companyCreateRes = await fetch("https://api.hubapi.com/crm/v3/objects/companies", {
            method: "POST",
            headers,
            body: JSON.stringify({
              properties: {
                name: company
              }
            })
          });
          if (companyCreateRes.ok) {
            const companyData: any = await companyCreateRes.json();
            companyId = companyData.id;
          }
        }
      } catch (err) {
        console.error("HubSpot Company integration failed:", err);
      }

      // 2b. Search or Create/Update Contact
      try {
        const contactSearchRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
          method: "POST",
          headers,
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: "email",
                operator: "EQ",
                value: email
              }]
            }]
          })
        });

        let contactExists = false;
        if (contactSearchRes.ok) {
          const searchData: any = await contactSearchRes.json();
          if (searchData.results && searchData.results.length > 0) {
            contactId = searchData.results[0].id;
            contactExists = true;
          }
        }

        const contactProperties = {
          email: email,
          firstname: name.split(" ")[0] || name,
          lastname: name.split(" ").slice(1).join(" ") || "",
          company: company,
          it_risk_score: String(score),
          gap_tags: gaps.join("; "),
          description: `IT Risk Score: ${score}/100. Gaps Identified: ${gaps.join(", ") || "None"}. High Urgency Flag: ${highUrgency ? "YES" : "NO"}`
        };

        if (contactExists && contactId) {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ properties: contactProperties })
          });
        } else {
          const contactCreateRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
            method: "POST",
            headers,
            body: JSON.stringify({ properties: contactProperties })
          });
          if (contactCreateRes.ok) {
            const contactData: any = await contactCreateRes.json();
            contactId = contactData.id;
          }
        }
      } catch (err) {
        console.error("HubSpot Contact integration failed:", err);
      }

      // 2c. Associate Contact to Company
      if (contactId && companyId) {
        try {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, {
            method: "PUT",
            headers
          });
        } catch (err) {
          console.error("HubSpot Contact-to-Company relationship mapping failed:", err);
        }
      }

      // 2d. Create Deal under 'IT Audit Requested' stage of our sales pipeline
      try {
        const dealPayload = {
          properties: {
            dealname: `SLA Risk Audit - ${company}`,
            dealstage: "it_audit_requested", // 'IT Audit Requested' stage identifier
            pipeline: "default",
            amount: "0",
            description: `Score: ${score}/100. Gaps Identified: ${gaps.join(", ") || "None"}. High Urgency Flag: ${highUrgency ? "YES" : "NO"}`
          },
          associations: [] as any[]
        };

        if (contactId) {
          dealPayload.associations.push({
            to: { id: contactId },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 3 // Deal to Contact
              }
            ]
          });
        }

        if (companyId) {
          dealPayload.associations.push({
            to: { id: companyId },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 5 // Deal to Company
              }
            ]
          });
        }

        await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
          method: "POST",
          headers,
          body: JSON.stringify(dealPayload)
        });
      } catch (err) {
        console.error("HubSpot Deal creation failed:", err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, score, gaps, highUrgency }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
