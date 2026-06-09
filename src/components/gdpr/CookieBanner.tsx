import { useState, useEffect } from "react";
import { Locale } from "../../types";
import { Shield, Settings, X, Check, Lock } from "lucide-react";

interface CookieBannerProps {
  currentLocale: Locale;
}

export default function CookieBanner({ currentLocale }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Granular settings states
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already made a selection
    const savedConsent = localStorage.getItem("smgtec_cookie_consent_v2");
    if (!savedConsent) {
      // Delay slightly for smooth slide-up intro
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // If we have saved consent, apply GTM / gtag updates automatically on mount
      if (savedConsent === "granted") {
        updateGtagConsent("granted", "granted");
      } else if (savedConsent === "denied") {
        // Keeps the default denied states, do not change GTM
      } else {
        // In case of granular custom selections stored as JSON
        try {
          const parsed = JSON.parse(savedConsent);
          updateGtagConsent(
            parsed.analytics ? "granted" : "denied",
            parsed.marketing ? "granted" : "denied"
          );
        } catch (e) {
          // Fallback if parsing failed
        }
      }
    }
  }, []);

  const updateGtagConsent = (analyticsState: "granted" | "denied", marketingState: "granted" | "denied") => {
    if (typeof window !== "undefined") {
      const dataLayer = (window as any).dataLayer || [];
      
      // Google Consent Mode v2 update call
      const consentPayload = {
        analytics_storage: analyticsState,
        ad_storage: marketingState,
        ad_user_data: marketingState,
        ad_personalization: marketingState,
      };

      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("consent", "update", consentPayload);
      } else {
        dataLayer.push(["consent", "update", consentPayload]);
      }

      // Also push a consent updated event to trigger GTM tags if needed
      dataLayer.push({
        event: "consent_update",
        analytics_storage: analyticsState,
        ad_storage: marketingState,
        ad_user_data: marketingState,
        ad_personalization: marketingState
      });
    }
  };

  const handleAcceptAll = () => {
    // Call client-side gtag consent update with 'granted' for everything
    updateGtagConsent("granted", "granted");
    
    // Save 'granted' to localStorage and close banner
    localStorage.setItem("smgtec_cookie_consent_v2", "granted");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    // Save 'denied' to localStorage and close banner without changing default states
    localStorage.setItem("smgtec_cookie_consent_v2", "denied");
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const customConsent = {
      analytics: analyticsConsent,
      marketing: marketingConsent
    };
    
    // Apply granular consent updates
    updateGtagConsent(
      analyticsConsent ? "granted" : "denied",
      marketingConsent ? "granted" : "denied"
    );

    // Save custom settings payload to localStorage
    localStorage.setItem("smgtec_cookie_consent_v2", JSON.stringify(customConsent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="compliance-cookie-banner"
      className="fixed bottom-6 left-6 right-6 z-50 max-w-xl mx-auto md:mr-6 md:ml-auto md:right-6 md:left-auto bg-[#0a0c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl font-sans text-neutral-350 translate-y-0 transition-all duration-300 animate-slideUp"
    >
      <div className="space-y-3.5 text-left w-full">
        <div className="flex items-center gap-2 text-[#3affab] font-mono text-xs uppercase tracking-widest font-black">
          <Shield className="size-4 shrink-0 animate-pulse text-[#3affab]" />
          <span>[ {currentLocale === "es" ? "POLÍTICA DE PRIVACIDAD GTM v2" : "GTM v2 PRIVACY LEDGER"} ]</span>
        </div>

        {!showPreferences ? (
          <>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              {currentLocale === "es"
                ? "Utilizamos tecnologías de medición y cookies técnicas bajo la normativa GDPR Consent Mode v2 para proteger la integridad operativa de este portal y analizar flujos de red seguros."
                : "We integrate Google Tag Manager and security cookies compliant with GDPR Consent Mode v2 to evaluate operational stability and optimize active defensive parameters."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                id="cookie-btn-accept-all"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 bg-[#3affab] hover:bg-white text-black py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition duration-200 cursor-pointer text-center"
              >
                {currentLocale === "es" ? "Aceptar todas" : "Accept all"}
              </button>
              
              <button
                id="cookie-btn-reject-all"
                onClick={handleRejectAll}
                className="w-full sm:flex-1 bg-neutral-900 border border-neutral-800 hover:border-red-500/30 text-red-400 hover:text-red-300 py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition duration-200 cursor-pointer text-center"
              >
                {currentLocale === "es" ? "Rechazar" : "Reject all"}
              </button>

              <button
                id="cookie-btn-configure"
                onClick={() => setShowPreferences(true)}
                className="w-full sm:w-auto bg-neutral-950 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white p-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1"
                title={currentLocale === "es" ? "Configurar Cookies" : "Configure Cookies"}
              >
                <Settings className="size-3.5" />
                <span className="text-[9px] font-mono uppercase tracking-wider block sm:hidden">
                  {currentLocale === "es" ? "Configurar" : "Configure"}
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4 pt-1 animate-fadeIn">
            <p className="text-[10px] leading-relaxed text-neutral-400 border-b border-white/5 pb-2">
              {currentLocale === "es"
                ? "Configure de manera pormenorizada su consentimiento para cada categoría de rastreo seguro:"
                : "Select preference configurations for each diagnostic active category:"}
            </p>

            <div className="space-y-3">
              {/* Category: Necessary */}
              <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                <div className="space-y-0.5">
                  <p className="font-bold text-white text-2xs uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="size-2.5 text-[#3affab]" />
                    {currentLocale === "es" ? "Técnicas y Necesarias" : "Strictly Necessary"}
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    {currentLocale === "es" 
                      ? "Requeridas para la carga del portal SPA y la sesión segura." 
                      : "Required to maintain Single-Page App runtime states structure."}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/20 uppercase tracking-widest font-bold">
                  {currentLocale === "es" ? "Activo" : "Active"}
                </span>
              </div>

              {/* Category: Analytics */}
              <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                <div className="space-y-0.5">
                  <p className="font-bold text-white text-2xs uppercase tracking-wider">
                    {currentLocale === "es" ? "Estadísticas y Medición" : "Telemetry & Web Traffic"}
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    {currentLocale === "es" 
                      ? "Otorga acceso a diagnósticos de rendimiento a través de Google Tag Manager." 
                      : "Allows tracking payload analytics to assess web speeds and loading cycles."}
                  </p>
                </div>
                <div className="relative flex items-center h-5">
                  <input
                    id="cookie-toggle-analytics"
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="size-4 rounded accent-[#3affab] bg-neutral-900 border-white/10 cursor-pointer"
                  />
                </div>
              </div>

              {/* Category: Marketing */}
              <div className="flex items-start justify-between gap-4 py-1.5">
                <div className="space-y-0.5">
                  <p className="font-bold text-white text-2xs uppercase tracking-wider">
                    {currentLocale === "es" ? "Personalización de Contenidos" : "Personalized Enterprise Ads"}
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    {currentLocale === "es" 
                      ? "Permite a Google Tag Manager servir píxeles de concordancia publicitaria." 
                      : "Enables ad-retargeting tag hooks to display contextual business campaigns."}
                  </p>
                </div>
                <div className="relative flex items-center h-5">
                  <input
                    id="cookie-toggle-marketing"
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="size-4 rounded accent-[#3affab] bg-neutral-900 border-white/10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                id="cookie-btn-save-custom"
                onClick={handleSaveCustom}
                className="flex-1 bg-white hover:bg-[#3affab] text-black py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition cursor-pointer text-center"
              >
                {currentLocale === "es" ? "Guardar selección" : "Apply Custom Choices"}
              </button>
              
              <button
                id="cookie-btn-back"
                onClick={() => setShowPreferences(false)}
                className="px-3 bg-neutral-900 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer text-center"
              >
                {currentLocale === "es" ? "Volver" : "Back"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
