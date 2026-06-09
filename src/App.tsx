import { useState, useEffect, FormEvent, lazy, Suspense } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useParams, 
  useNavigate, 
  useLocation, 
  Link 
} from "react-router-dom";
import { Locale } from "./types";
import SlaHeader from "./components/SlaHeader";
import Navbar from "./components/Navbar";
import NetworkStatus from "./components/NetworkStatus";
import DowntimeCalculator from "./components/DowntimeCalculator";
import IndustriesList from "./components/IndustriesList";
import SovereignCreed from "./components/SovereignCreed";
import CookieBanner from "./components/gdpr/CookieBanner";
import WhatsAppButton from "./components/WhatsAppButton";
import { WHATSAPP_CONFIG } from "./config/whatsapp";
import { MsalProvider } from "@azure/msal-react";
import { clientMsalInstance, teamMsalInstance } from "./lib/msalConfig";
import { industriesConfig } from "./config/industries";

// Code splitting via dynamic lazy imports to reduce chunk size below 500kB limit
const SmartHands = lazy(() => import("./components/SmartHands"));
const MspPackages = lazy(() => import("./components/MspPackages"));
const RiskCalculator = lazy(() => import("./components/RiskCalculator"));
const LegalPages = lazy(() => import("./components/LegalPages"));
const Portal = lazy(() => import("./components/Portal"));
const TeamPortal = lazy(() => import("./components/TeamPortal"));
const IndustryTemplate = lazy(() => import("./components/industries/IndustryTemplate"));
import {
  Shield, Check, Wrench, Play, BookOpen, Volume2, Globe, Clock, MessageSquare, Mail, Phone,
  MapPin, AlertCircle, Heart, Info, ArrowUpRight, CheckCircle2, ChevronRight, X, Calendar,
  ShieldAlert, Database, Lock, Activity, Sparkles, Layers, ArrowLeft
} from "lucide-react";

// Forced scroll behavior adjustment upon transitions
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Modal Contact Overlay states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<any>(null);
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [verifyingTurnstile, setVerifyingTurnstile] = useState(false);

  // Form contact leads
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [meetingConfirmed, setMeetingConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const slots = [
    "10:00 - 10:30 (CET)",
    "11:30 - 12:00 (CET)",
    "14:00 - 14:30 (CET)",
    "16:00 - 16:30 (CET)"
  ];

  // Theme support
  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [isLightTheme]);

  // Turnstile verification simulator inside the scheduling modal
  useEffect(() => {
    if (isContactOpen) {
      setVerifyingTurnstile(true);
      const timer = setTimeout(() => {
        setVerifyingTurnstile(false);
        setTurnstileVerified(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setTurnstileVerified(false);
      setVerifyingTurnstile(false);
    }
  }, [isContactOpen]);

  const openContactWithDetails = (details?: any) => {
    setSelectedPlanDetails(details);
    setIsContactOpen(true);
  };

  const handleBookMeeting = (e: FormEvent) => {
    e.preventDefault();
    setMeetingConfirmed(true);
  };

  const t = {
    heroSlogan: {
      es: "WE MANAGE YOUR CLOUD. WE SHIELD YOUR REVENUE.",
      en: "WE MANAGE YOUR CLOUD. WE SHIELD YOUR REVENUE."
    },
    heroDesc: {
      es: "gestionamos tu infraestructura it, garantizamos tu ciberseguridad y mantenemos tu negocio operativo 24/7/365 en barcelona.",
      en: "we govern your cloud spaces, secure your system endpoints, and guarantee total service uptime 24/7/365 in barcelona."
    },
    ctaAudit: {
      es: "Auditoría IT Gratis",
      en: "Free IT Risk Audit"
    },
    ctaServices: {
      es: "Explorar Canales",
      en: "Explore Channels"
    },
    sectionDowntime: {
      es: "Pérdida por Inactividad",
      en: "Downtime Loss Analysis"
    },
    sectionIndustries: {
      es: "Sectores y Cumplimiento",
      en: "Sectors & Local Compliance"
    },
    footerRights: {
      es: "© 2026 smgtec sl. todos los derechos reservados. barcelona, españa. cif: b22687644",
      en: "© 2026 smgtec sl. all rights reserved. barcelona, spain. vat: b22687644"
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-text-primary transition-colors duration-300 w-full overflow-x-hidden flex flex-col justify-between selection:bg-[#3affab] selection:text-black immersive-gradient-bg">
        
        {/* Ribbon banner */}
        <SlaHeader currentLocale={locale} />

        {/* Global Floating Navigation Navbar */}
        <Navbar
          currentLocale={locale}
          setLocale={setLocale}
          isLightTheme={isLightTheme}
          toggleTheme={toggleTheme}
          openContactModal={() => openContactWithDetails("Navbar Book Audit")}
        />

        {/* Main Content Areas inside Router routes with custom Suspense for chunks lazy loading */}
        <Suspense fallback={
          <div className="min-h-screen bg-[#0a0c12] flex items-center justify-center font-mono text-neutral-500 text-3xs tracking-widest uppercase">
            <div className="flex flex-col items-center gap-4">
              <div className="size-6 rounded-full border-2 border-t-transparent border-[#3affab] animate-spin" />
              <span className="animate-pulse">[ INIT_SECURE_ROUTING_ENVELOPE ]</span>
            </div>
          </div>
        }>
          <Routes>
          
          {/* Landing / Home route */}
          <Route path="/" element={
            <>
              {/* Hero Header */}
              <header className="relative min-h-[100svh] lg:min-h-screen w-full overflow-hidden bg-[#0a0c12] flex items-center justify-center pt-24 sm:pt-28 lg:pt-0 pb-16 lg:pb-0">
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c12] via-transparent to-[#0a0c12] pointer-events-none"></div>

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 flex flex-col justify-center">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 lg:py-16">
                    
                    <div className="lg:col-span-7 flex flex-col text-left space-y-6 sm:space-y-8">
                      <div className="space-y-1 sm:space-y-2">
                        <span className="block text-[11vw] sm:text-[7vw] lg:text-[5.5rem] xl:text-[6.2rem] font-black text-white leading-none uppercase tracking-tighter select-none">
                          {locale === "es" ? "gestión" : "manage"}
                        </span>
                        <span className="block text-[11vw] sm:text-[7vw] lg:text-[5.5rem] xl:text-[6.2rem] font-black text-white leading-none uppercase tracking-tighter select-none">
                          {locale === "es" ? "tu" : "your"}
                        </span>
                        <span className="block text-[11vw] sm:text-[7vw] lg:text-[5.5rem] xl:text-[6.2rem] font-black text-[#3affab] leading-none uppercase tracking-tighter select-none">
                          {locale === "es" ? "cloud" : "cloud"}
                        </span>
                      </div>

                      <div id="hero-floating-description" className="border-l-2 border-[#3affab] pl-4 max-w-xl space-y-5">
                        <p className="text-sm sm:text-base text-neutral-300 font-sans tracking-wide leading-relaxed font-semibold capitalize-first">
                          {t.heroDesc[locale]}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                          <Link
                            to="/auditoria-riesgo"
                            className="px-5.5 py-3.5 bg-[#3affab] hover:bg-white text-black rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer text-center duration-300 shadow-xl active:scale-95"
                          >
                            {t.ctaAudit[locale]}
                          </Link>
                          <Link
                            to="/tarifas-msp"
                            className="px-5.5 py-3.5 bg-neutral-900/90 backdrop-blur-md hover:bg-neutral-800 text-white border border-white/10 rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer text-center duration-300"
                          >
                            {t.ctaServices[locale]}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right stats SLA list */}
                    <div className="lg:col-span-5 w-full flex flex-col gap-4">
                      
                      <div className="bg-[#151a24]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 hover:border-[#3affab]/30 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl">
                        <div>
                          <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-mono font-bold text-white tracking-tighter block">
                            +99.99%
                          </span>
                          <p className="text-[10px] sm:text-xs text-[#3affab] font-sans tracking-wide mt-1 uppercase font-bold">
                            {locale === "es" ? "disponibilidad de red" : "startups SLA uptime"}
                          </p>
                        </div>
                        <div className="size-11 rounded-full bg-[#3affab]/15 border border-[#3affab]/25 flex items-center justify-center font-mono text-xs text-[#3affab] font-bold">
                          SLA
                        </div>
                      </div>

                      <div className="bg-[#151a24]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 hover:border-[#3affab]/30 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl">
                        <div>
                          <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-mono font-bold text-white tracking-tighter block">
                            &lt;15m
                          </span>
                          <p className="text-[10px] sm:text-xs text-[#3affab] font-sans tracking-wide mt-1 uppercase font-bold">
                            {locale === "es" ? "tiempo de respuesta crítico" : "critical incident speed"}
                          </p>
                        </div>
                        <div className="size-11 rounded-full bg-[#70d6ff]/15 border border-[#70d6ff]/30 flex items-center justify-center font-mono text-xs text-[#70d6ff] font-bold">
                          LIVE
                        </div>
                      </div>

                      <div className="bg-[#151a24]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 hover:border-[#3affab]/30 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl">
                        <div>
                          <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-mono font-bold text-white tracking-tighter block">
                            &lt;2h
                          </span>
                          <p className="text-[10px] sm:text-xs text-[#3affab] font-sans tracking-wide mt-1 uppercase font-bold">
                            {locale === "es" ? "despacho smart hands" : "barcelona metro dispatch"}
                          </p>
                        </div>
                        <div className="size-11 rounded-full bg-[#3affab]/15 border border-[#3affab]/25 flex items-center justify-center font-mono text-xs text-[#3affab] font-bold">
                          BCN
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0c12] z-25"></div>
              </header>

              {/* Home main modules sections */}
              <div id="content-anchoring-plane" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24 relative z-30">
                <section id="noc-telemetry-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-5 text-left">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3affab] uppercase tracking-wider px-2.5 py-0.5 bg-[#3affab]/10 rounded border border-[#3affab]/20">
                      <span className="size-1.5 rounded-full bg-[#3affab] animate-pulse"></span>
                      {locale === "es" ? "TELEMETRÍA EN VIVO NOC" : "LIVE NOC TELEMETRY"}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white animate-fadeIn">
                      {locale === "es" ? "Infraestructura Segura. Auditoría Constante." : "Shield Your Operations 24/7/365."}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                      {locale === "es"
                        ? "Nuestros ingenieros de Barcelona vigilan constantemente tu red para detener amenazas antes de que paralicen tu actividad."
                        : "We establish proactive guardrails to isolate threats, monitor internet routing gateways, and verify database backup loops automatically."}
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <NetworkStatus currentLocale={locale} />
                  </div>
                </section>

                <section id="interactive-calculator-region">
                  <DowntimeCalculator
                    currentLocale={locale}
                    openContactModal={(summary) => openContactWithDetails(summary)}
                  />
                </section>

                <SovereignCreed
                  currentLocale={locale}
                  openContactModal={(topic) => openContactWithDetails(topic)}
                />

                <section id="industries-coverage">
                  <div className="text-left max-w-xl mb-8">
                    <span className="font-mono text-xs text-[#3affab] uppercase tracking-widest block mb-2 font-bold">[ {t.sectionIndustries[locale]} ]</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white animate-fadeIn">
                      {locale === "es" ? "Soluciones IT por Sector" : "Specialized Sector Frameworks"}
                    </h3>
                  </div>
                  <IndustriesList
                    currentLocale={locale}
                    openContactModal={(slug) => openContactWithDetails(`Sector: ${slug}`)}
                  />
                  
                  {/* Dynamic Sector Navigation Link */}
                  <div className="pt-4 flex justify-start">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wide mr-2">[ {locale === "es" ? "Navegar páginas del sector" : "Browse sector sheets"} ]:</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {industriesConfig.map((ind) => (
                        <Link 
                          key={ind.slug}
                          to={`/industrias/${ind.slug}`}
                          className="text-[11px] font-mono text-[#3affab] hover:underline font-bold"
                        >
                          {ind.name[locale]} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </>
          } />

          {/* Dedicated Soporte Técnico page */}
          <Route path="/soporte-tecnico" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <SmartHands currentLocale={locale} openContactModal={() => openContactWithDetails("Soporte Técnico Smart Hands")} />
            </div>
          } />

          {/* MSP Packages plans listings */}
          <Route path="/tarifas-msp" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <MspPackages currentLocale={locale} openContactModal={(name) => openContactWithDetails(`Tarifa MSP Plan: ${name}`)} />
            </div>
          } />

          {/* Dedicted IT Risk Assessment calculator page */}
          <Route path="/auditoria-riesgo" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
                <span className="font-mono text-xs text-[#3affab] uppercase tracking-widest block font-bold">[ {locale === "es" ? "Auditoría de Ciberseguridad" : "Strategic Vulnerabilities Auditing"} ]</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {locale === "es" ? "Auto-Evaluación de Riesgo IT" : "Enterprise IT Self-Audit"}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {locale === "es"
                    ? "Completa las 8 cuestiones clave para computar de forma instantánea el índice de riesgo de tu parque tecnológico."
                    : "Review the 8 operational vectors to find security gaps and calculate compliance posture scores."}
                </p>
              </div>
              <RiskCalculator 
                currentLocale={locale} 
                onSubmitLead={(lead) => {
                  console.info("Risk calculator submitted lead", lead);
                }} 
              />
            </div>
          } />

          {/* Secure client Microsoft Active Directory MSAL portal route */}
          <Route path="/portal" element={
            <MsalProvider instance={clientMsalInstance}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
                <Portal currentLocale={locale} />
              </div>
            </MsalProvider>
          } />

          {/* Secure internal team Microsoft Active Directory MSAL portal route */}
          <Route path="/internal" element={
            <MsalProvider instance={teamMsalInstance}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
                <TeamPortal currentLocale={locale} />
              </div>
            </MsalProvider>
          } />

          {/* Dynamic dynamic sector page layout from industries.ts */}
          <Route path="/industrias/:slug" element={<IndustryTemplate currentLocale={locale} />} />

          {/* Spanish compliance law pages */}
          <Route path="/aviso-legal" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <LegalPages currentLocale={locale} type="notice" />
            </div>
          } />

          <Route path="/politica-de-privacidad" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <LegalPages currentLocale={locale} type="privacy" />
            </div>
          } />

          <Route path="/politica-de-cookies" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen">
              <LegalPages currentLocale={locale} type="cookies" />
            </div>
          } />

          {/* Catch-all route */}
          <Route path="*" element={
            <div className="max-w-md mx-auto px-4 py-36 text-center space-y-4">
              <AlertCircle className="size-11 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold uppercase text-white font-mono">[ 404_NOT_FOUND ]</h2>
              <p className="text-xs text-neutral-400">{locale === "es" ? "La página solicitada no está mapeada en nuestro entorno." : "The requested page does not exist."}</p>
              <Link to="/" className="inline-block bg-[#3affab] text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-white transition">
                {locale === "es" ? "Volver al Inicio" : "Return to Home Page"}
              </Link>
            </div>
          } />

        </Routes>
        </Suspense>

        {/* Global Footer element */}
        <footer id="global-footer" className="bg-[#0a0c12]/95 border-t border-white/5 py-12 px-4 sm:px-6 text-center font-mono text-neutral-500 text-[10px] tracking-wider uppercase select-none relative z-30">
          <div className="max-w-5xl mx-auto space-y-4">
            <svg viewBox="0 0 256 256" className="size-8 fill-neutral-600 hover:fill-[#3affab] transition mx-auto duration-300">
              <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
            </svg>
            <p className="max-w-lg mx-auto leading-relaxed">{t.footerRights[locale]}</p>
            
            {/* Inline footer links */}
            <div className="flex flex-wrap justify-center gap-4 text-neutral-600 text-[9px] font-bold">
              <Link to="/aviso-legal" className="hover:text-neutral-400 transition">[ {locale === "es" ? "Aviso Legal" : "Legal Notice"} ]</Link>
              <span>•</span>
              <Link to="/politica-de-privacidad" className="hover:text-neutral-400 transition">[ {locale === "es" ? "Política de Privacidad" : "Privacy Policy"} ]</Link>
              <span>•</span>
              <Link to="/politica-de-cookies" className="hover:text-neutral-400 transition">[ {locale === "es" ? "Política de Cookies (GTM v2)" : "Cookie Policy (GTM v2)"} ]</Link>
            </div>
          </div>
        </footer>

        {/* Global cookie policy indicator consent banner */}
        <CookieBanner currentLocale={locale} />

        {/* Global floating WhatsApp Support Badge */}
        <WhatsAppButton currentLocale={locale} />

        {/* Unified Booking contact schedule drawer modal screen */}
        {isContactOpen && (
          <div id="contact-overlay-backdrop" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div
              id="modal-card"
              className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 relative font-sans text-neutral-300 shadow-2xl animate-scaleUp"
            >
              <button
                onClick={() => {
                  setIsContactOpen(false);
                  setMeetingConfirmed(false);
                  setSelectedSlot(null);
                }}
                className="absolute top-4 right-4 p-2 bg-neutral-950 border border-neutral-800 rounded-full hover:border-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {!meetingConfirmed ? (
                <div id="modal-booking-panel" className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-sky-400 tracking-widest font-bold block mb-1">
                      [ CAL.COM BILINGUAL DIRECT GATEWAY ]
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {locale === "es" ? "Reserva tu Auditoría Gratuita de Sistemas" : "Schedule Your Live Technical System Audit"}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      {locale === "es"
                        ? "Sin duplicidad de datos. Elige tu fecha y hora in-situ para Barcelona o reunión de Teams."
                        : "Zero form redundancy. Lock a face-to-face slot at Equinix or secure a Teams link instantly."}
                    </p>
                    <div className="mt-2.5 flex items-center justify-start">
                      <a
                        href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.messageText[locale])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20 transition cursor-pointer select-none"
                      >
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        {locale === "es" ? "¿Prefieres WhatsApp urgente? Chatea ahora" : "Urgent? Text on WhatsApp instead"} &rarr;
                      </a>
                    </div>
                  </div>

                  {selectedPlanDetails && typeof selectedPlanDetails === "object" && (
                    <div className="bg-[#3affab]/5 border border-[#3affab]/20 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-emerald-400">
                      <p className="font-bold border-b border-emerald-500/10 pb-1 mb-1 text-white uppercase">
                        📝 {locale === "es" ? "Métricas de Evaluación Guardadas:" : "Piped Audit Diagnostics:"}
                      </p>
                      {selectedPlanDetails.score !== undefined && (
                        <>
                          <p><strong>Puntuación IT:</strong> {selectedPlanDetails.score} / 100</p>
                          <p><strong>Brechas:</strong> {selectedPlanDetails.gaps?.length || 0}</p>
                          <p><strong>Urgencia:</strong> {selectedPlanDetails.highUrgency ? "[ALTA CRITICIDAD]" : "[ESTÁNDAR]"}</p>
                        </>
                      )}
                      {selectedPlanDetails.totalLoss !== undefined && (
                        <>
                          <p>{locale === "es" ? "Pérdida estimada" : "Expected loss value"}: {selectedPlanDetails.totalLoss?.toLocaleString()} €</p>
                          <p>{locale === "es" ? "Trabajadores" : "Workforce Size"}: {selectedPlanDetails.employees} | {locale === "es" ? "Tiempo de caída" : "Downtime depth"}: {selectedPlanDetails.downtimeHours} h</p>
                        </>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleBookMeeting} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">{locale === "es" ? "Nombre completo" : "Name"}</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Joan Puig"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-sm text-white focus:border-sky-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">{locale === "es" ? "Email corporativo" : "Corporate Email"}</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="e.g. joan@empresa.cat"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-sm text-white focus:border-sky-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">
                        {locale === "es" ? "Selecciona un horario cal.com para la llamada" : "Select Your Scheduled Slot"}
                      </label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {slots.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-3 rounded-lg text-[11px] font-mono border text-center transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#3affab] border-[#3affab] text-black font-bold"
                                  : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="sm:col-span-2 bg-neutral-950 border border-neutral-850 rounded-xl p-3 flex items-center justify-between text-xs font-mono select-none">
                      <div className="flex items-center gap-2">
                        {verifyingTurnstile ? (
                          <div className="size-4 border-2 border-slate-500 border-t-[#3affab] rounded-full animate-spin"></div>
                        ) : turnstileVerified ? (
                          <span className="size-4 bg-[#3affab] rounded-full inline-flex items-center justify-center text-black text-[9px] font-bold">✓</span>
                        ) : (
                          <span className="size-4 bg-yellow-500 rounded-full"></span>
                        )}
                        <span className="text-neutral-400 text-[11px]">
                          {verifyingTurnstile
                            ? (locale === "es" ? "Protegiendo conexión (Cloudflare)..." : "Checking security Turnstile...")
                            : turnstileVerified
                            ? (locale === "es" ? "Verificado por Cloudflare Turnstile" : "Cloudflare Turnstile Verified")
                            : (locale === "es" ? "Verificando conexiones humanas..." : "Pending browser compliance checks")}
                        </span>
                      </div>
                      <span className="text-[8.5px] text-neutral-600 font-bold">SEC_SHIELD_V2</span>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        disabled={!turnstileVerified || !selectedSlot}
                        className="w-full bg-[#3affab] hover:bg-white text-black text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {locale === "es" ? "Confirmar Reserva con SMGTEC" : "Confirm Booking Slot"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div id="modal-confirmation-final" className="text-center py-8 space-y-5">
                  <div className="size-16 bg-[#3affab]/20 border border-[#3affab] rounded-full inline-flex items-center justify-center animate-bounce mb-2">
                    <CheckCircle2 className="size-8 text-[#3affab]" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      {locale === "es" ? "¡Reunión Confirmada!" : "Meeting Confirmed!"}
                    </h4>
                    <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                      {locale === "es"
                        ? `Hemos reservado tu slot para el horario: ${selectedSlot}. Un enlace de Teams y detalles de auditoría han sido enviados a ${leadEmail}.`
                        : `Your booking at ${selectedSlot} is locked. A confirmation calendar invite has been sent to ${leadEmail}.`}
                    </p>
                  </div>
                  
                  <div className="pt-4 max-w-sm mx-auto">
                    <button
                      onClick={() => {
                        setIsContactOpen(false);
                        setMeetingConfirmed(false);
                        setSelectedSlot(null);
                      }}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
                    >
                      {locale === "es" ? "Volver a la Web" : "Return to Home Page"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}

// Wrapper subpage layout for dynamics /industrias/:slug pathways
interface IndustryDetailWrapperProps {
  locale: Locale;
  openContact: (detailText: string) => void;
}

function IndustryDetailWrapper({ locale, openContact }: IndustryDetailWrapperProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const currentConfig = industriesConfig.find((ind) => ind.slug === slug);

  if (!currentConfig) {
    return (
      <div className="max-w-md mx-auto px-4 py-36 text-center space-y-4 font-mono">
        <AlertCircle className="size-11 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white uppercase">[ INDUSTRY_NOT_FOUND ]</h2>
        <button onClick={() => navigate("/")} className="bg-[#3affab] text-black text-xs font-black uppercase px-4 py-2 rounded-xl transition">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full animate-fadeIn min-h-screen text-left space-y-12">
      
      {/* Back to Home action */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#3affab] transition font-mono uppercase tracking-widest font-bold"
      >
        <ArrowLeft className="size-4" />
        {locale === "es" ? "VOLVER AL PANEL" : "BACK TO PORTAL"}
      </button>

      {/* Header section segment */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1 bg-[#3affab]/10 border border-[#3affab]/35 text-[#3affab] uppercase font-mono text-[9px] font-bold px-3 py-1 rounded-full tracking-widest">
          <Shield className="size-3" />
          {currentConfig.name[locale]}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
          {currentConfig.headline[locale]}
        </h1>
        <p className="text-sm sm:text-lg text-neutral-400 leading-relaxed font-sans">
          {currentConfig.description[locale]}
        </p>
      </div>

      {/* Grid of Challenges and Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Challenges Pane */}
        <div className="lg:col-span-5 bg-neutral-950 border border-red-500/10 rounded-2xl p-6 relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 p-3 font-mono text-[8vw] sm:text-[9px] text-red-500/15 select-none font-bold">
            VULNERABILITIES_GAP_V3
          </div>
          <h3 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="size-4 shrink-0" />
            {locale === "es" ? "Vectores de Fallo e Incompatibilidad" : "Critical Threat Vector Risks"}
          </h3>
          <ul className="space-y-3 font-sans text-xs sm:text-sm text-neutral-350 leading-relaxed">
            {currentConfig.challenges[locale].map((chal, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="text-red-500 font-mono text-xs font-bold mt-0.5">&gt;</span>
                <span>{chal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Solutions Pane */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-extrabold">
              [ {locale === "es" ? "ESTÁNDAR DE MITIGACIÓN Y SOPORTE DIRECTO" : "STRATEGIC SOLUTIONS & HARDENING"} ]
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentConfig.solutions.map((sol, index) => {
                let SolIcon = Database;
                if (sol.icon === "Lock") SolIcon = Lock;
                if (sol.icon === "Activity") SolIcon = Activity;
                if (sol.icon === "ShieldAlert") SolIcon = ShieldAlert;
                if (sol.icon === "Wrench") SolIcon = Wrench;
                if (sol.icon === "Layers") SolIcon = Layers;

                return (
                  <div key={index} className="bg-[#151a24] border border-white/5 rounded-xl p-5 hover:border-white/10 transition space-y-2.5 text-left">
                    <div className="flex gap-2.5 items-center">
                      <SolIcon className="size-5 text-[#3affab] shrink-0" />
                      <h5 className="font-bold text-white text-xs sm:text-sm tracking-tight leading-none uppercase">
                        {sol.title[locale]}
                      </h5>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                      {sol.description[locale]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Compliance Certification Strip and Action button */}
      <div className="bg-[#151a24] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2.5 text-left">
          <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
            [ {locale === "es" ? "NORMAS Y COMPLIANCE ESPAÑOL VINCULADOS" : "REGULATORY COMPLIANCE COVERAGE"} ]
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentConfig.compliance.map((c) => (
              <span key={c} className="font-mono text-[9px] font-bold px-3 py-1 bg-black text-[#3affab] border border-white/5 rounded-md uppercase tracking-wider">
                ✓ {c} Compliant
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => openContact(`Sector custom contact: ${slug}`)}
          className="w-full md:w-auto shrink-0 bg-[#3affab] hover:bg-white text-black py-4 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
        >
          {currentConfig.pricingCTA[locale]}
          <ChevronRight className="size-4 shrink-0" />
        </button>
      </div>

    </div>
  );
}
