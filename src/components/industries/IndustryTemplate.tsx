import { useParams, useNavigate, Link } from "react-router-dom";
import { Locale } from "../../types";
import { industriesConfig } from "../../config/industries";
import AuditBooking from "../booking/AuditBooking";
import {
  Shield, ShieldAlert, Database, Lock, Activity, Layers, Clock,
  ChevronRight, ArrowLeft, AlertCircle, Sparkles, Wrench, Tv,
  ArrowUpRight, CheckCircle2, FileText, Check
} from "lucide-react";

interface IndustryTemplateProps {
  currentLocale: Locale;
}

export default function IndustryTemplate({ currentLocale }: IndustryTemplateProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the config block for the selected sector slug
  const currentConfig = industriesConfig.find((ind) => ind.slug === slug);

  // Fallback to beautiful immersive 404 page if no match found
  if (!currentConfig) {
    return (
      <div id="industry-404-canvas" className="max-w-xl mx-auto px-4 py-40 text-center space-y-6 animate-fadeIn font-sans">
        <div className="relative inline-flex items-center justify-center p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 mb-2">
          <AlertCircle className="size-12" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-2xs font-extrabold text-red-500 tracking-widest block uppercase">[ VECTOR_UNMAPPED ]</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            {currentLocale === "es" ? "Sector no Encontrado" : "Uncharted Directive"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
            {currentLocale === "es"
              ? "La plantilla técnica solicitada para '" + slug + "' no está registrada en nuestra infraestructura."
              : "The specialized blueprint for '" + slug + "' does not correspond to any registered sector configuration."}
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#3affab] text-black font-black text-xs uppercase px-6 py-3.5 rounded-xl hover:bg-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#3affab]/15"
          >
            <ArrowLeft className="size-4" />
            {currentLocale === "es" ? "Volver al Panel" : "Return to Dashboard"}
          </Link>
        </div>
      </div>
    );
  }

  // Map icon names dynamically with elite aesthetic indicators
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
        return <ShieldAlert className="size-6 text-red-400 shrink-0" />;
      case "Database":
      case "DatabaseBackup":
        return <Database className="size-6 text-sky-400 shrink-0" />;
      case "Lock":
        return <Lock className="size-6 text-emerald-400 shrink-0" />;
      case "Activity":
        return <Activity className="size-6 text-[#3affab] shrink-0" />;
      case "Layers":
        return <Layers className="size-6 text-indigo-400 shrink-0" />;
      case "Wrench":
        return <Wrench className="size-6 text-orange-400 shrink-0" />;
      case "Tv":
        return <Tv className="size-6 text-pink-400 shrink-0" />;
      case "Clock":
        return <Clock className="size-6 text-[#70d6ff] shrink-0" />;
      case "Sparkles":
        return <Sparkles className="size-6 text-amber-400 shrink-0" />;
      default:
        return <Shield className="size-6 text-[#3affab] shrink-0" />;
    }
  };

  return (
    <div
      id={`industry-page-${slug}`}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20 text-left relative overflow-hidden font-sans"
    >
      {/* Decorative background glow rings for 0.01% elite atmosphere */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3affab]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/10 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Breadcrumb / Return trigger */}
      <div className="animate-fadeIn">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-2xs font-mono text-neutral-500 hover:text-[#3affab] transition-all py-1.5 px-3 rounded-full border border-white/5 bg-neutral-900/40 uppercase tracking-widest font-black"
        >
          <ArrowLeft className="size-3.5" />
          {currentLocale === "es" ? "VOLVER AL INICIO" : "RETURN TO OVERVIEW"}
        </button>
      </div>

      {/* 1. INDUSTRY HERO SECTION */}
      <section className="animate-fadeIn space-y-6 max-w-4xl relative">
        <div className="inline-flex items-center gap-2 bg-[#3affab]/10 border border-[#3affab]/25 text-[#3affab] uppercase font-mono text-3xs font-black px-4.5 py-1.5 rounded-full tracking-wider shadow-[0_2px_12px_rgba(58,255,171,0.04)]">
          <Sparkles className="size-3 animate-pulse" />
          <span>{currentConfig.name[currentLocale]} Sector Blueprint</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] max-w-3xl">
            {currentConfig.headline[currentLocale]}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed font-sans max-w-2xl pt-2">
            {currentConfig.description[currentLocale]}
          </p>
        </div>

        {/* Hero CTA Block linking directly to the Risk Assessment widget */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link
            to="/auditoria-riesgo"
            className="group inline-flex items-center justify-between gap-4 bg-[#3affab] text-black font-black text-xs uppercase px-7 py-4.5 rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#3affab]/10"
          >
            <span>
              {currentLocale === "es"
                ? "Calcular mi dardo de riesgo en 1 minuto"
                : "Evaluate IT Security Gaps Instantly"}
            </span>
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {currentConfig.recommendedPackage && (
            <div className="flex items-center gap-2.5 px-5 py-4 rounded-2xl border border-white/5 bg-neutral-900/35 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-mono text-3xs text-neutral-400 uppercase tracking-wider">
                {currentConfig.recommendedPackage[currentLocale]}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 2. PAIN POINTS GRID (CORE CHALLENGES) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-3xs font-extrabold text-red-400 tracking-widest uppercase block">
            [ SECTION_01 // CORE_VULNERABILITIES__ ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            {currentLocale === "es" ? "Puntos Críticos de Falla y Amenazas" : "Unmitigated Liability Gaps"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {currentConfig.challenges[currentLocale].map((chal, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-neutral-950/90 border border-red-500/10 hover:border-red-500/30 rounded-2xl p-6.5 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(239,68,68,0.03)]"
            >
              {/* Corner warning status banner */}
              <div className="absolute top-0 right-0 p-3 font-mono text-4xs text-red-500/35 group-hover:text-red-500/60 transition-colors select-none font-bold">
                RISK_VECTOR_0{index + 1}
              </div>

              <div className="space-y-4 pt-1">
                <div className="size-9 rounded-xl bg-red-950/30 border border-red-500/15 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <span className="font-mono text-xs font-black">0{index + 1}</span>
                </div>
                <p className="text-sm font-semibold text-neutral-200 leading-snug">
                  {chal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOLUTIONS GRID */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-3xs font-extrabold text-[#3affab] tracking-widest uppercase block">
            [ SECTION_02 // SYSTEM_HARDENING_SUITE ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            {currentLocale === "es" ? "Armadura de Servicio y Mitigación IT" : "Secure Operational Architecture"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {currentConfig.solutions.map((sol, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-[#0d1117] border border-white/5 hover:border-[#3affab]/25 rounded-2xl p-6.5 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(58,255,171,0.03)]"
            >
              <div className="absolute top-0 right-0 p-3 font-mono text-4xs text-neutral-600 group-hover:text-[#3affab]/40 select-none font-bold">
                SOL_REMEDY_0{index + 1}
              </div>

              <div className="space-y-4 pt-1">
                <div className="size-11 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {renderIcon(sol.icon)}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-[#3affab] transition-colors uppercase">
                    {sol.title[currentLocale]}
                  </h3>
                  <p className="text-xs text-neutral-450 leading-relaxed">
                    {sol.description[currentLocale]}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Premium addition: Realtime NOC integration service card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#10b981]/5 to-transparent border border-[#10b981]/15 rounded-2xl p-6.5 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-3 font-mono text-4xs text-[#10b981]/45 select-none font-bold">
              SYS_ACTIVE_99_99
            </div>
            <div className="space-y-3">
              <div className="size-9 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981]">
                <Activity className="size-4 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-tight">
                {currentLocale === "es" ? "SLA Máximo Autorizado" : "Continuous NOC Monitoring"}
              </h3>
              <p className="text-2xs text-neutral-400 leading-normal">
                {currentLocale === "es"
                  ? "Atención crítica de guardia gestionada de principio a fin las 24 horas del día."
                  : "All endpoints bridged to our round-the-clock Security Operations network."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE PROFILE HIGHLIGHTS */}
      <section className="bg-neutral-950/80 border border-white/5 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#3affab]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-left">
            <span className="font-mono text-3xs font-extrabold text-[#3affab] tracking-widest uppercase block">
              [ SECTION_03 // DATA_SOVEREIGNTY_PROFILE ]
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              {currentLocale === "es" ? "Alineación y Cumplimiento de Normativa" : "Sovereign Regulatory Alignment"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-xl">
              {currentLocale === "es"
                ? "Garantizamos que toda tu infraestructura IT cumpla escrupulosamente con el marco legal aplicable. Implementamos controles estrictos de seguridad que evitan sanciones críticas para tu negocio."
                : "Ensure your computing frameworks stand protected from liability exposure. We enforce rigid administrative & technical parameters conforming directly to target audit benchmarks."}
            </p>
          </div>

          <div className="md:col-span-5 space-y-3">
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">
              {currentLocale === "es" ? "Certificaciones Incorporadas:" : "Enforced Compliance Protocols:"}
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {currentConfig.compliance.map((c) => (
                <div
                  key={c}
                  className="px-3.5 py-3 rounded-xl border border-white/5 bg-neutral-900/60 font-mono text-[10px] font-bold text-neutral-100 flex items-center gap-2"
                >
                  <span className="size-4 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-[#3affab] text-3xs">
                    ✓
                  </span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL BOOKING CTA SECTION */}
      <section className="space-y-8 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-mono text-3xs font-extrabold text-[#3affab] tracking-widest uppercase block">
            [ SECTION_04 // BARCELONA_NOC_BOOKING ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {currentLocale === "es" ? "Agenda tu Auditoría Gratuita" : "Schedule Your On-Call Consult"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            {currentLocale === "es"
              ? "Reserva una sesión estratégica ininterrumpida de 15 minutos para delimitar riesgos corporativos."
              : "Lock in an uncompromised 15-minute slot linked directly to our on-call operations engineer."}
          </p>
        </div>

        {/* Audit Booking integration */}
        <div className="max-w-4xl mx-auto pt-2">
          <AuditBooking currentLocale={currentLocale} />
        </div>
      </section>
    </div>
  );
}
