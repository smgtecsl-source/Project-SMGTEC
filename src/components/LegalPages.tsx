import { Locale } from "../types";
import { Shield, BookOpen, FileText } from "lucide-react";

interface LegalPageProps {
  currentLocale: Locale;
  type: "notice" | "privacy" | "cookies";
}

export default function LegalPages({ currentLocale, type }: LegalPageProps) {
  return (
    <div id={`compliance-legal-page-${type}`} className="max-w-4xl mx-auto bg-[#1b222d] border border-white/5 rounded-3xl p-6 sm:p-10 text-left space-y-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3affab]/3 rounded-full blur-[80px] pointer-events-none"></div>

      {type === "notice" && (
        <div id="notice-content-slate" className="space-y-6">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase tracking-wider font-extrabold pb-2 border-b border-white/10">
            <Shield className="size-4 text-[#3affab]" />
            {currentLocale === "es" ? "Aviso Legal Obligatorio" : "Regulatory Legal Notice"}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {currentLocale === "es" ? "AVISO LEGAL Y DATOS DEL PROVEEDOR" : "STATUTORY LEGAL NOTICE"}
          </h1>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3 font-mono text-[11px] text-neutral-300">
            <p className="font-bold border-b border-white/5 pb-1 uppercase tracking-wide text-white">
              [ {currentLocale === "es" ? "Identificación del Titular del Dominio" : "Domain Holder Identification"} ]
            </p>
            <p><strong>Razón Social:</strong> SMGTEC S.L.</p>
            <p><strong>CIF/VAT ID:</strong> B22687644</p>
            <p><strong>Dirección Fiscal / Sede Social:</strong> Barcelona Metro Metropolitan Area, Barcelona, España</p>
            <p><strong>Email de Soporte / Privacidad:</strong> soporte@smgtec.es</p>
            <p><strong>Área Operativa:</strong> Servicios IT de Alta Fidelidad, Soporte Smart Hands, Ciberseguridad EDR y Copias BCDR en Cataluña.</p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            <h2 className="text-white font-bold text-base uppercase">1. Objeto del sitio</h2>
            <p>
              {currentLocale === "es"
                ? "Este canal web ha sido diseñado con fines puramente informativos e interactivos para presentar las soluciones tecnológicas, soporte premium para despachos y startups, y proveer calculadoras interactivas de riesgo y de pérdida monetaria por falta de continuidad IT."
                : "This web instance is provided as an interactive showcase of enterprise-tier managed IT solutions, cybersecurity deployment setups, and cost-of-outage metric engines."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">2. Propiedad Intelectual</h2>
            <p>
              {currentLocale === "es"
                ? "Todos los logotipos, códigos, diseños UI, esquemas lógicos y telemetrías son marcas registradas propiedad de SMGTEC S.L. Queda totalmente prohibida su reproducción sin permiso previo por escrito."
                : "All typographic blueprints, custom layout graphics, and interactive widgets are trademarks owned directly by SMGTEC S.L."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">3. Jurisdicción y Legislación Aplicable</h2>
            <p>
              {currentLocale === "es"
                ? "Cualquier controversia se regirá bajo las leyes e instituciones de los Juzgados y Tribunales de Barcelona, España, renunciando expresamente a cualquier otro foro."
                : "Any legal conflict will be governed exclusively under the regulatory laws of the Courts of Barcelona, Spain, explicitly skipping other jurisdictions."}
            </p>
          </div>
        </div>
      )}

      {type === "privacy" && (
        <div id="privacy-content-slate" className="space-y-6">
          <div className="flex items-center gap-2 text-sky-450 font-mono text-[10px] uppercase tracking-wider font-extrabold pb-2 border-b border-white/10">
            <BookOpen className="size-4 text-[#3affab]" />
            {currentLocale === "es" ? "Garantía de Privacidad RGPD" : "GDPR Compliance Protocol"}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {currentLocale === "es" ? "POLÍTICA DE PRIVACIDAD" : "DATA PRIVACY POLICY"}
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            <h2 className="text-white font-bold text-base uppercase">1. Tratamiento de Datos Personales</h2>
            <p>
              {currentLocale === "es"
                ? "En SMGTEC priorizamos la privacidad de tus datos de contacto corporativo. Cuando realizas la autoevaluación en la calculadora de riesgo, tus datos se procesan con la única finalidad de enviarte el reporte detallado y pre-cargar tu cita tecnológica en nuestra pasarela segura Cal.com."
                : "At SMGTEC we hold corporate data privacy as a prime operational mandate. Contact information provided inside the Risk Assessment forms is strictly processed for report generation and direct pre-filling of Cal appointments."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">2. Base Legal del Tratamiento</h2>
            <p>
              {currentLocale === "es"
                ? "La base jurídica para el tratamiento de tus datos es el consentimiento explícito manifestado al marcar la casilla de aceptación y superar el filtro de seguridad Cloudflare Turnstile."
                : "The processing of user details stands lawful under your explicit consent granted by clicking the submit button and clearing our Turnstile spam protectors."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">3. Destinatarios y Plazos de Conservación</h2>
            <p>
              {currentLocale === "es"
                ? "Tus datos son almacenados de forma segura utilizando integraciones certificadas en HubSpot CRM y no son vendidos a terceros bajo ningún supuesto. Los datos se conservarán durante el período en que se presten servicios de soporte de preventa o hasta que solicites su completa eliminación."
                : "Your corporate details are written directly into HubSpot security-controlled systems. No partner sharing occurs. Data is stored until pre-sale operations wrap up or complete eradication is requested."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">4. Derechos ARCO</h2>
            <p>
              {currentLocale === "es"
                ? "Tienes derecho a acceder, rectificar, deponer o limitar tus datos en cualquier instante escribiendo por correo electrónico a soporte@smgtec.es junto con una copia de tu CIF o documento nacional de identidad."
                : "Under European GDPR rules, you possess absolute rights to access, update, export, or erase your customer profiles at any time by mailing soporte@smgtec.es."}
            </p>
          </div>
        </div>
      )}

      {type === "cookies" && (
        <div id="cookies-content-slate" className="space-y-6">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase tracking-wider font-extrabold pb-2 border-b border-white/10">
            <FileText className="size-4 text-[#3affab]" />
            {currentLocale === "es" ? "Regulación de Archivos de Rastreo" : "HTTP Cookies Auditing"}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {currentLocale === "es" ? "POLÍTICA DE COOKIES (GTM v2)" : "COOKIES FRAMEWORK POLICY"}
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            <h2 className="text-white font-bold text-base uppercase">1. ¿Qué son las cookies?</h2>
            <p>
              {currentLocale === "es"
                ? "Las cookies son pequeños ficheros de texto que se instalan localmente en tu navegador tras tu consentimiento con la finalidad de recordar configuraciones, sesiones de Microsoft MSAL de tu portal de cliente, o analizar métricas de uso generales."
                : "Cookies are compact text identifiers kept inside your local browser partitions to remember SPA language choices, secure client-portal Microsoft MSAL tokens, or collect load speed diagnostic data."}
            </p>

            <h2 className="text-white font-bold text-base uppercase">2. Tipos de cookies utilizadas en SMGTEC</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>{currentLocale === "es" ? "Técnicas / Necesarias:" : "Necessary Static Cookies:"}</strong>{" "}
                {currentLocale === "es"
                  ? "Inalterables. Destinadas a recordar el idioma o las credenciales cifradas del portal de Microsoft Entra ID."
                  : "Mandatory tags to support active login tokens from Microsoft Entra Portal."}
              </li>
              <li>
                <strong>{currentLocale === "es" ? "Analíticas (Google Tag Manager):" : "Analytics Logging (GTM v2):"}</strong>{" "}
                {currentLocale === "es"
                  ? "Opcionales. Mide las visitas a la web y velocidades de renderizado de la UI de forma anónima."
                  : "Tracks browser speed outputs and user clicks in absolute anonymity."}
              </li>
            </ul>

            <h2 className="text-white font-bold text-base uppercase">3. Revocación del consentimiento</h2>
            <p>
              {currentLocale === "es"
                ? "Puedes denegar u otorgar cookies en cualquier instante simplemente borrando la caché de tu navegador o restableciendo tus preferencias utilizando la barra de privacidad inferior."
                : "You can revoke consent tags at any point in time by purging your local storage partitions or resetting browser preferences."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
