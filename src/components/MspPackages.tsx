import { useState } from "react";
import { Locale } from "../types";
import { Shield, Check, X, ShieldAlert, Award, Star } from "lucide-react";
import AuditBooking from "./booking/AuditBooking";

interface MspPackagesProps {
  currentLocale: Locale;
  openContactModal: (planName?: string) => void;
}

export default function MspPackages({ currentLocale, openContactModal }: MspPackagesProps) {
  const [activePlan, setActivePlan] = useState<"silver" | "gold" | "platinum">("gold");

  // Plan general info
  const plans = [
    {
      id: "silver" as const,
      name: "Silver",
      icon: Shield,
      price: "Bespoke",
      period: { es: "Cotización a medida", en: "Bespoke SLA Plan" },
      desc: {
        es: "Soporte reactivo de alta velocidad para startups tecnológicas y oficinas en expansión que requieren robustez operativa.",
        en: "Assured rapid response reactive support tailored for high-potential systems and critical client terminals."
      },
      tag: { es: "SLA Estándar", en: "Standard SLA" },
      badgeColor: "bg-neutral-800 text-neutral-400"
    },
    {
      id: "gold" as const,
      name: "Gold",
      icon: Star,
      price: "Corporate",
      period: { es: "Servicios IT Proactivos", en: "Fully Managed IT Ops" },
      desc: {
        es: "Defensa ciber-operativa premium completa con SentinelOne EDR gestionado, actualizaciones automatizadas de fallos y BCDR.",
        en: "Complete premium cybersecurity and systems custody featuring active SentinelOne EDR threat hunting, predictive vulnerability patching, and business continuity systems."
      },
      tag: { es: "Servicio Premium", en: "Premium Managed" },
      badgeColor: "bg-[#3affab]/20 text-[#3affab] border border-[#3affab]/40"
    },
    {
      id: "platinum" as const,
      name: "Platinum",
      icon: Award,
      price: "Sovereign",
      period: { es: "SOC y Cobertura 24/7", en: "24/7 SIEM/NOC Custody" },
      desc: {
        es: "Nivel de seguridad soberano definitivo. Soporte ininterrumpido 24/7/365, monitorización SOC activa, auditorías de LOPDGDD premium de alta dirección y Smart Hands ilimitado.",
        en: "Total technological shielding. Permanent 24/7/365 active SIEM/NOC monitoring, quarterly high-level regulatory governance audits, and absolute on-demand smart hands dispatch."
      },
      tag: { es: "Grado Soberano", en: "Sovereign Grade" },
      badgeColor: "bg-[#70d6ff]/10 text-[#70d6ff] border border-[#70d6ff]/30"
    }
  ];

  // Features checklist map
  const features = [
    {
      name: { es: "Soporte Antivirus Estándar", en: "Standard Endpoint Antivirus" },
      silver: true, gold: true, platinum: true
    },
    {
      name: { es: "SentinelOne EDR Avanzado (Garantía de Ciberseguridad)", en: "SentinelOne Managed EDR Security" },
      silver: false, gold: true, platinum: true
    },
    {
      name: { es: "Control y Parches de Sistema Operativo Remotos", en: "OS Patching & Registry Integrity Checks" },
      silver: true, gold: true, platinum: true
    },
    {
      name: { es: "Copias de Seguridad Cloud Diarias (Datto/Synology)", en: "Off-Site Secure Backups (Datto Cloud)" },
      silver: false, gold: true, platinum: true
    },
    {
      name: { es: "SLA de Soporte Telefónico Reactivo", en: "Direct Technical Helpdesk SLA" },
      silver: { es: "4 Horas", en: "4 Hours" },
      gold: { es: "1 Hora", en: "1 Hour" },
      platinum: { es: "<15 Minutos", en: "<15 Minutes" }
    },
    {
      name: { es: "Monitorización SOC/MDR 24/7/365 (Amenazas Activas)", en: "24/7 SOC/SIEM Security Threat Incident response" },
      silver: false, gold: false, platinum: true
    },
    {
      name: { es: "Auditorías de Cumplimiento LOPDGDD Anuales", en: "Yearly Compliance LOPDGDD/GDPR Auditing" },
      silver: false,
      gold: { es: "Básica", en: "Essential" },
      platinum: { es: "Completa (Trimestral)", en: "Comprehensive (Quarterly)" }
    },
    {
      name: { es: "Soporte In-Situ Smart Hands en Barcelona", en: "Smart Hands On-Location Barcelona Help" },
      silver: { es: "Tarifas bajo demanda", en: "On-demand fees" },
      gold: { es: "Despacho Preferente", en: "Preferred Dispatch" },
      platinum: { es: "ILIMITADO (SLA <2h)", en: "UNLIMITED (<2h SLA)" }
    }
  ];

  return (
    <div id="msp-packages-wrapper" className="space-y-12">
      {/* Header section description */}
      <div className="text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3affab]/10 border border-[#3affab]/20 rounded-full text-[11px] text-[#3affab] font-mono uppercase tracking-wider mb-4">
          <ShieldAlert className="size-3.5" />
          {currentLocale === "es" ? "PLANES DE SOPORTE GESTIONADOS" : "MANAGED SERVICE TIERS"}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase font-sans tracking-tighter">
          {currentLocale === "es"
            ? "Arquitectura de Soporte Bajo Demanda y SLAs Elite"
            : "Bespoke Enterprise SLAs & Elite Support Agreements"}
        </h2>
        <p className="text-base text-neutral-400 leading-relaxed max-w-3xl">
          {currentLocale === "es"
            ? "Cada red corporativa posee vectores de riesgo únicos. Deliberadamente rechazamos los paquetes estandarizados de bajo coste y baja calidad. Diseñamos acuerdos de nivel de servicio a medida adaptados a la escala exacta de tu organización, exigencias de SOC/MDR y gobernanza en Barcelona."
            : "Every high-stakes infrastructure demands unique defensive posture. We deliberately reject standard low-tier transactional pricing. We engineer elite bespoke SLAs engineered exclusively for your precise user footprint, strict compliance standards, and custom cybersecurity needs."}
        </p>
      </div>

      {/* Plan selector toggles for mobile viewports */}
      <div className="flex md:hidden bg-black/40 p-1.5 border border-white/10 rounded-full justify-between max-w-md mx-auto">
        {plans.map((p) => (
          <button
            key={p.id}
            id={`toggle-plan-selector-${p.id}`}
            onClick={() => setActivePlan(p.id)}
            className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              activePlan === p.id
                ? "bg-[#3affab] text-black font-extrabold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Grid Comparison Layout (Desktop display, Adaptive on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isGold = p.id === "gold";
          const isSelectedOnMobile = activePlan === p.id;

          return (
            <div
              key={p.id}
              id={`msp-plan-card-${p.id}`}
              className={`border rounded-3xl p-6 relative overflow-hidden transition-all duration-350 flex flex-col justify-between ${
                isGold
                  ? "bg-[#151a24] border-[#3affab] shadow-[0_0_15px_rgba(58,255,171,0.15)] scale-100 lg:scale-[1.02]"
                  : "bg-[#151a24]/80 border-white/10 hover:border-white/20"
              } ${isSelectedOnMobile ? "flex" : "hidden md:flex"}`}
            >
              {/* Highlight ribbon */}
              {p.tag && (
                <span className={`absolute top-4 right-4 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${p.badgeColor}`}>
                  {p.tag[currentLocale]}
                </span>
              )}

              <div>
                {/* Under header identifier */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`p-2.5 rounded-xl ${isGold ? "bg-[#3affab]/10 text-[#3affab]" : "bg-black/30 text-white"}`}>
                    <p.icon className="size-5 shrink-0" />
                  </span>
                  <span className="text-xl font-bold font-mono tracking-tight text-white uppercase">{p.name}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {p.desc[currentLocale]}
                </p>

                {/* Big billing cost indicators */}
                <div className="flex items-baseline gap-2 border-b border-white/5 pb-6 mb-6">
                  <span className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white">
                    {p.price}
                  </span>
                  <span className="text-xs text-neutral-400 lowercase italic font-mono">
                    {p.period[currentLocale]}
                  </span>
                </div>

                {/* Specific features overview list (Mobile layout only) */}
                <div className="space-y-4 md:hidden">
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">[ {currentLocale === "es" ? "CARACTERÍSTICAS INCLUIDAS" : "FEATURES MAP"} ]</h4>
                  {features.map((feat, fIndex) => {
                    const status = feat[p.id];
                    if (status === false) return null;
                    return (
                      <div key={fIndex} className="flex gap-2.5 text-xs text-neutral-300">
                        <Check className="size-4 text-[#3affab] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-white/90">{feat.name[currentLocale]}</p>
                          {status !== true && (
                            <span className="font-mono text-[10px] text-[#3affab] uppercase font-semibold">
                              {typeof status === "object" ? (status as any)[currentLocale] : status}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <button
                  id={`select-p-tier-${p.id}`}
                  onClick={() => openContactModal(p.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition cursor-pointer duration-300 shadow-md ${
                    isGold
                      ? "bg-[#3affab] text-black hover:bg-white"
                      : "bg-neutral-900 hover:bg-neutral-850 text-white border border-white/10"
                  }`}
                >
                  {currentLocale === "es" ? `Solicitar Tarifa Propia ${p.name}` : `Consult Bespoke Fees`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table (Visible only on Desktop for beautiful UI layout) */}
      <div className="hidden md:block bg-[#151a24] border border-white/10 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-sm font-mono text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-3 mb-4 select-none">
          [ {currentLocale === "es" ? "MATRIZ COMPLETA DE COMPARACIÓN DE COBERTURA" : "COMPREHENSIVE COVERAGE COMPARISON MATRIX"} ]
        </h3>

        <table className="w-full text-left font-mono text-xs text-white/90 leading-normal border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] text-neutral-400 uppercase font-bold">
              <th className="py-3 px-2 w-[45%] font-sans font-bold">
                {currentLocale === "es" ? "Concepto / Servicio IT" : "IT Scope / Feature"}
              </th>
              <th className="py-3 px-2 text-center w-[18%]">Silver</th>
              <th className="py-3 px-2 text-center w-[18%] text-[#3affab]">Gold</th>
              <th className="py-3 px-2 text-center w-[19%] text-[#70d6ff]">Platinum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {features.map((feat, fIndex) => (
              <tr key={fIndex} className="hover:bg-white/5 transition">
                <td className="py-3.5 px-2 font-sans font-semibold text-neutral-200">
                  {feat.name[currentLocale]}
                </td>
                <td className="py-3.5 px-2 text-center">
                  {renderCellVal(feat.silver, currentLocale)}
                </td>
                <td className="py-3.5 px-2 text-center font-bold text-[#3affab]">
                  {renderCellVal(feat.gold, currentLocale)}
                </td>
                <td className="py-3.5 px-2 text-center font-bold text-[#70d6ff]">
                  {renderCellVal(feat.platinum, currentLocale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Direct Scheduling Live Gateway Embed */}
      <div className="space-y-6 pt-12 border-t border-white/5">
        <div className="text-left max-w-2xl">
          <span className="font-mono text-xs text-[#3affab] uppercase tracking-widest block mb-2 font-bold">
            [ {currentLocale === "es" ? "CALENDARIO DIRECTO DE CONSULTAS" : "DIRECT TELEPHONIC BOOKINGS GATEWAY"} ]
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
            {currentLocale === "es" ? "Reserva tu Reunión con Ingeniería IT" : "Secure Direct Coordination Meeting"}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {currentLocale === "es"
              ? "Selecciona directamente una fecha y hora en la plataforma segura para coordinar tu auditoría IT in-situ en Barcelona o llamada virtual por Microsoft Teams."
              : "Use the live scheduling interface below to book a consultation instantly, direct with our infrastructure engineering leads."}
          </p>
        </div>

        <AuditBooking currentLocale={currentLocale} />
      </div>
    </div>
  );
}

// Inline value helper
function renderCellVal(val: any, locale: Locale) {
  if (val === true) {
    return <Check className="size-4 text-[#3affab] mx-auto" />;
  }
  if (val === false) {
    return <X className="size-4 text-neutral-600 mx-auto" />;
  }
  if (val && typeof val === "object" && (val as any)[locale]) {
    return <span className="text-[11px] font-semibold">{(val as any)[locale]}</span>;
  }
  return <span className="text-[11px] font-semibold">{val}</span>;
}
