import { Configuration, PublicClientApplication } from "@azure/msal-browser";

// 1. CLIENT PORTAL CONFIGURATION (Multi-tenant)
export const clientMsalConfig: any = {
  auth: {
    clientId: (import.meta as any).env.VITE_MSAL_CLIENT_ID_CLIENT || "placeholder-client-id-client",
    authority: `https://login.microsoftonline.com/${(import.meta as any).env.VITE_MSAL_TENANT_ID_CLIENT || "organizations"}`,
    redirectUri: typeof window !== "undefined" ? `${window.location.origin}/portal` : undefined,
    postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : undefined,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

// 2. TEAM PORTAL CONFIGURATION (Single-tenant - @smgtec.es)
export const teamMsalConfig: any = {
  auth: {
    clientId: (import.meta as any).env.VITE_MSAL_CLIENT_ID_TEAM || "placeholder-client-id-team",
    authority: `https://login.microsoftonline.com/${(import.meta as any).env.VITE_MSAL_TENANT_ID_TEAM || "SMGTEC.onmicrosoft.com"}`,
    redirectUri: typeof window !== "undefined" ? `${window.location.origin}/internal` : undefined,
    postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : undefined,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

// 3. EXPORT EXPLICIT PUBLIC CLIENT APPLICATION INSTANCES
export const clientMsalInstance = new PublicClientApplication(clientMsalConfig);
export const teamMsalInstance = new PublicClientApplication(teamMsalConfig);
