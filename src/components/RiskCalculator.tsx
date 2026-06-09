import { useState, useEffect, FormEvent } from "react";
import { Locale } from "../types";
import { 
  ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Mail, 
  Landmark, User, Calendar, AlertTriangle, ArrowRight, Sparkles, Check 
} from "lucide-react";
import AuditBooking from "./booking/AuditBooking";

interface RiskCalculatorProps {
  currentLocale: Locale;
  onSubmitLead: (leadData: any) => void;
}

interface Question {
  id: number;
  text: { es: string; en: string };
  desc: { es: string; en: string };
  yesLabel: { es: string; en: string };
  noLabel: { es: string; en: string };
  deductIfNo: boolean; // if true, answer NO deducts points. If false, answer YES deducts points.
  points: number;
  gapText: { es: string; en: string };
}

export default function RiskCalculator({ currentLocale, onSubmitLead }: RiskCalculatorProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  
  // Lead submission gate
  const [isLocked, setIsLocked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const totalSteps = 8;

  // Set up Cloudflare Turnstile
  useEffect(() => {
    if (typeof window !== "undefined" && (import.meta as any).env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY) {
      // Create callback
      (window as any).onTurnstileSuccess = (token: string) => {
        setTurnstileToken(token);
      };

      // Load Turnstile script
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        delete (window as any).onTurnstileSuccess;
      };
    }
  }, [step]); // reload on step changes if needed or on mount

  const questions: Question[] = [
    {
      id: 1,
      text: {
        es: "¿Dispone de una copia de seguridad fuera de sus oficinas (Nube)?",
        en: "Do you have an off-site (Cloud) backup copy?"
      },
      desc: {
        es: "Las copias locales son vulnerables a cortocircuitos corporativos, robos o al ransomware que encripta los discos en red.",
        en: "Local physical backups can be fully corrupted during electrical fluctuations, theft, or local network ransomware cycles."
      },
      yesLabel: { es: "Sí, automática en la nube", en: "Yes, automated in the Cloud" },
      noLabel: { es: "No, o copias en discos manuales", en: "No, or manual physical drives" },
      deductIfNo: true,
      points: 20,
      gapText: { es: "Ausencia de copia de seguridad externa (Nube)", en: "Absence of off-site Cloud backups" }
    },
    {
      id: 2,
      text: {
        es: "¿Utiliza un Firewall profesional gestionado (no el del router del ISP)?",
        en: "Do you use a professional managed Firewall (not the ISP router built-in one)?"
      },
      desc: {
        es: "El router estándar de Telefónica no filtra tráfico malicioso ni detiene solicitudes de puertos expuestos de forma activa.",
        en: "A standard ISP modem cannot filter outbound malware callouts, inspect data packages, or shield network ports."
      },
      yesLabel: { es: "Sí, Firewall profesional gestionado", en: "Yes, security managed Firewall" },
      noLabel: { es: "No, usamos el router del operador", en: "No, only the telecom vendor model" },
      deductIfNo: true,
      points: 15,
      gapText: { es: "Falta de cortafuegos profesional unificado (Firewall)", en: "Unprotected perimeter (No Managed Firewall)" }
    },
    {
      id: 3,
      text: {
        es: "¿Están sus equipos protegidos con Antivirus EDR (SentinelOne o similar)?",
        en: "Are your devices protected with EDR Antivirus (SentinelOne or similar)?"
      },
      desc: {
        es: "El antivirus tradicional busca virus antiguos conocidos. El EDR analiza el comportamiento sospechoso en tiempo real para bloquear ataques nuevos.",
        en: "Legacy antivirus software only detects old known signatures. EDR blocks live anomalous behavior in seconds."
      },
      yesLabel: { es: "Sí, protegidos con EDR activo", en: "Yes, active EDR clients in place" },
      noLabel: { es: "No, o antivirus básico/Windows Defender", en: "No, or standard legacy antivirus" },
      deductIfNo: true,
      points: 15,
      gapText: { es: "Carencia de agente EDR frente a Ransomware", en: "Absence of managed EDR endpoint agent" }
    },
    {
      id: 4,
      text: {
        es: "¿Sus empleados utilizan Doble Factor de Autenticación (MFA/2FA)?",
        en: "Do your employees use Multi-Factor Authentication (MFA/2FA)?"
      },
      desc: {
        es: "Más del 80% de los accesos fraudulentos ocurren por contraseñas débiles filtradas. Activar el doble factor blinda los servicios de inmediato.",
        en: "Over 80% of enterprise breaches stem from leaked user passwords. MFA enforces double verification."
      },
      yesLabel: { es: "Sí, obligatorio en Outlook/Workspace", en: "Yes, enforced on all core accounts" },
      noLabel: { es: "No, o es opcional para el equipo", en: "No, or optional for employees" },
      deductIfNo: true,
      points: 15,
      gapText: { es: "Doble Factor de Autenticación deshabilitado", en: "No Multi-Factor Authentication (MFA) enforce" }
    },
    {
      id: 5,
      text: {
        es: "¿Dispone de un registro de cumplimiento RGPD/LOPDGDD actualizado?",
        en: "Do you have an updated GDPR/LOPDGDD compliance audit audit trail?"
      },
      desc: {
        es: "La Agencia Española de Protección de Datos impone multas severas por carecer de registro de actividades o brechas de seguridad informadas.",
        en: "The European Union imposes harsh compliance penalties for missing data mapping inventories or breach reports."
      },
      yesLabel: { es: "Sí, auditado anualmente por ley", en: "Yes, fully audited and compliant" },
      noLabel: { es: "No, o desconocemos si cumple", en: "No, or status undocumented" },
      deductIfNo: true,
      points: 15,
      gapText: { es: "Incumplimiento de RGPD / LOPDGDD local", en: "Non-compliant with European GDPR mandates" }
    },
    {
      id: 6,
      text: {
        es: "¿Tiene inventariados todos sus activos informáticos (Hardware/Software)?",
        en: "Do you have all your IT assets (Hardware/Software) fully inventoried?"
      },
      desc: {
        es: "No se puede proteger aquello que no se sabe que existe. Un inventario centralizado previene que ordenadores viejos queden abandonados de parches.",
        en: "Unmanaged terminals remain highly exposed. Up-to-date hardware mapping is critical for security patch enforcement."
      },
      yesLabel: { es: "Sí, inventariados bajo plataforma", en: "Yes, centralized inventory tracking" },
      noLabel: { es: "No, cada usuario gestiona su equipo", en: "No, managed independently by employees" },
      deductIfNo: true,
      points: 10,
      gapText: { es: "Carencia de inventario formal de activos IT", en: "No consolidated physical asset inventory" }
    },
    {
      id: 7,
      text: {
        es: "¿Tienen sus ordenadores o servidores más de 4 años de antigüedad?",
        en: "Are your computers or servers more than 4 years old?"
      },
      desc: {
        es: "Los PCs obsoletos sufren fallos mecánicos constantes y carecen de soporte de hardware, lastrando el rendimiento corporativo.",
        en: "Aged computing equipment increases maintenance expenses and lacks security chip standards like TPM 2.0."
      },
      yesLabel: { es: "Sí, la mayoría superan los 4 años", en: "Yes, most terminals exceed 4 years" },
      noLabel: { es: "No, renovamos la flota regularmente", en: "No, modern workstation lifecycle" },
      deductIfNo: false, // Deduct score IF YES
      points: 10,
      gapText: { es: "Flota informática envejecida u obsoleta >4 años", en: "Aging hardware fleet exceeding 4 years" }
    },
    {
      id: 8,
      text: {
        es: "¿Su empresa dejaría de facturar si el sistema cae más de 2 horas?",
        en: "Would your business stop invoicing if systems go down for more than 2 hours?"
      },
      desc: {
        es: "Si tu facturación se detiene por completo ante un fallo del servidor central o internet, necesitas alta redundancia y soporte prioritario.",
        en: "Uptime dependency requires active SLA continuous checks, dual optical fiber, and immediate BCDR virtualization backup options."
      },
      yesLabel: { es: "Sí (Urgencia Alta)", en: "Yes, total revenue dependency (High Urgency)" },
      noLabel: { es: "No, aguantamos más tiempo", en: "No, offline workflows in place" },
      deductIfNo: false,
      points: 0, // No points deducted directly, flagged as High Urgency if YES
      gapText: { es: "Pérdida inmediata de facturación ante caídas de red", en: "High revenue dependency on total system uptime" }
    }
  ];

  // Scoring Logic
  const getResults = () => {
    let score = 100;
    const gaps: string[] = [];

    questions.forEach((q) => {
      const answeredVal = answers[q.id];
      if (answeredVal !== undefined) {
        if (q.id !== 8) {
          // If the deduction condition matches, reduce starting score
          if (q.deductIfNo) {
            if (answeredVal === false) {
              score -= q.points;
              gaps.push(q.gapText[currentLocale]);
            }
          } else {
            if (answeredVal === true) {
              score -= q.points;
              gaps.push(q.gapText[currentLocale]);
            }
          }
        }
      }
    });

    const finalScore = Math.max(10, score);
    // High Urgency is true ONLY if they rely heavily on uptime (Q8 is YES) and their score is compromised (below 80)
    const isUptimeCritical = answers[8] === true;
    const highUrgency = isUptimeCritical && finalScore < 80;

    return { score: finalScore, gaps, highUrgency };
  };

  const results = getResults();

  const handleAnswerSelect = (val: boolean) => {
    setAnswers(prev => ({ ...prev, [step]: val }));
    if (step < totalSteps) {
      setStep(s => s + 1);
    } else {
      // Last question completed, advance to submittal gate
      setStep(9);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
    }
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !companyName) {
      setErrorMessage(currentLocale === "es" ? "Por favor completa todos los campos requeridos." : "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        name: contactName,
        company: companyName,
        email: contactEmail,
        score: results.score,
        gaps: results.gaps,
        highUrgency: results.highUrgency,
        turnstileToken: turnstileToken
      };

      const response = await fetch("/api/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setIsLocked(false);
        // Call parent prop if needed
        onSubmitLead(payload);
      } else {
        setErrorMessage(resData.error || (currentLocale === "es" ? "Error al procesar la auditoría." : "Error processing risk audit."));
      }
    } catch (err: any) {
      setErrorMessage(currentLocale === "es" ? "Fallo de conexión. Por favor reinténtelo." : "Connection failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert Cal.com URL from env to event slug
  const rawCalUrl = (import.meta as any).env.VITE_CALCOM_URL || "https://cal.eu/smgtec/audit";
  const calLinkPath = rawCalUrl.replace("https://cal.com/", "").replace("https://cal.eu/", "");

  return (
    <div
      id="risk-calculator-wizard"
      className="w-full max-w-4xl mx-auto bg-[#0d1117] border border-white/10 rounded-3xl p-6 md:p-10 text-left relative overflow-hidden shadow-2xl transition-all duration-300"
    >
      {/* Top progress indicator */}
      {step <= totalSteps && (
        <div className="w-full bg-neutral-900 h-1 absolute top-0 left-0">
          <div
            className="bg-[#3affab] h-1 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Main wizard header */}
      {step <= totalSteps && (
        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 select-none mt-2">
          <span>[ {currentLocale === "es" ? "Cuestionario de Vulnerabilidad IT" : "IT Security Self-Audit"} ]</span>
          <span>{step} / {totalSteps}</span>
        </div>
      )}

      {/* Step Rendering (1 to 8) */}
      {step <= totalSteps && (
        <div id={`step-${step}-content`} className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-snug">
              {questions[step - 1].text[currentLocale]}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed bg-[#141923] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <span className="absolute top-0 left-0 w-1 h-full bg-[#3affab]/30" />
              {questions[step - 1].desc[currentLocale]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              id={`choice-${step}-yes`}
              onClick={() => handleAnswerSelect(true)}
              className="p-5 rounded-2xl font-bold border text-left transition duration-300 cursor-pointer hover:bg-[#3affab]/5 hover:border-[#3affab]/40 bg-black/35 border-white/5 text-white flex flex-col justify-between group min-h-[145px] hover:shadow-[0_4px_20px_rgba(58,255,171,0.05)]"
            >
              <span className="text-2xs font-mono text-[#3affab] uppercase mb-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">🟢 {currentLocale === "es" ? "OPCIÓN A" : "OPTION A"}</span>
              <p className="text-sm font-bold leading-tight text-neutral-100">{questions[step - 1].yesLabel[currentLocale]}</p>
            </button>
            <button
              id={`choice-${step}-no`}
              onClick={() => handleAnswerSelect(false)}
              className="p-5 rounded-2xl font-bold border text-left transition duration-300 cursor-pointer hover:bg-red-500/5 hover:border-red-500/40 bg-black/35 border-white/5 text-white flex flex-col justify-between group min-h-[145px] hover:shadow-[0_4px_20px_rgba(239,68,68,0.05)]"
            >
              <span className="text-2xs font-mono text-red-400 uppercase mb-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">⚠️ {currentLocale === "es" ? "OPCIÓN B" : "OPTION B"}</span>
              <p className="text-sm font-bold leading-tight text-neutral-100">{questions[step - 1].noLabel[currentLocale]}</p>
            </button>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition py-2 px-3 cursor-pointer font-bold uppercase tracking-wider"
              >
                <ChevronLeft className="size-4" />
                {currentLocale === "es" ? "Atrás" : "Back"}
              </button>
            ) : (
              <div />
            )}
            
            {/* Skip or next button if answered previously */}
            {answers[step] !== undefined && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1 text-xs text-[#3affab] hover:text-white transition py-2 px-3 cursor-pointer font-bold uppercase tracking-wider font-mono"
              >
                {currentLocale === "es" ? "Siguiente" : "Next"}
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 9: Results Gate or Display */}
      {step > totalSteps && (
        <div className="space-y-8">
          
          {/* Dynamic Score gauge box - ALWAYS VISIBLE to prevent user blind spot */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#151a24] border border-white/10 rounded-2xl p-6 sm:p-8">
            
            {/* Visual Gauge gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-2 py-4">
              <span className="font-mono text-3xs text-neutral-500 uppercase tracking-widest font-bold">
                [ {currentLocale === "es" ? "VULNERABILIDAD GENERAL" : "GENERAL OUTAGE OUTCOME"} ]
              </span>
              
              {/* Gauge block with color */}
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36">
                  <circle 
                    className="text-neutral-900" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="58" 
                    cx="72" 
                    cy="72" 
                  />
                  <circle 
                    className={
                      results.score >= 80 
                        ? "text-emerald-400" 
                        : results.score >= 50 
                          ? "text-amber-400" 
                          : "text-red-500"
                    } 
                    strokeWidth="8" 
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * results.score) / 100}
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="58" 
                    cx="72" 
                    cy="72" 
                    transform="rotate(-90 72 72)"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-mono font-black text-white">{results.score}</span>
                  <span className="text-xs font-mono text-neutral-500 block">/ 100</span>
                </div>
              </div>

              <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${
                results.score >= 80 
                  ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" 
                  : results.score >= 50 
                    ? "text-amber-400 border-amber-400/20 bg-amber-400/5" 
                    : "text-red-500 border-red-500/20 bg-red-400/5 animate-pulse"
              }`}>
                {results.score >= 80 ? (currentLocale === "es" ? "Riesgo Bajo" : "Low Risk") :
                 results.score >= 50 ? (currentLocale === "es" ? "Riesgo Medio" : "Medium Risk") :
                 (currentLocale === "es" ? "RIESGO SEVERO" : "EXTREME RISK")}
              </span>
            </div>

            {/* General Description Header */}
            <div className="md:col-span-7 space-y-3">
              <h5 className="font-mono text-xs text-[#3affab] uppercase tracking-widest font-bold">
                ↳ {currentLocale === "es" ? "Análisis de Estado Inicial" : "Initial Security State Ledger"}
              </h5>
              <p className="text-xs text-neutral-350 leading-relaxed">
                {currentLocale === "es" ? (
                  results.score >= 80
                    ? `Su puntuación de seguridad calculada es de ${results.score}/100. Esto indica una infraestructura robusta y un alineamiento defensivo óptimo. Su organización cuenta con excelentes medidas de protección activa frente a incidentes.`
                    : results.score >= 50
                      ? `Su puntuación de seguridad calculada es de ${results.score}/100. Se detectan brechas moderadas en su postura IT. Aunque dispone de algunas medidas, la falta de controles clave representa un porcentaje de riesgo evitable.`
                      : `Su puntuación de seguridad calculada es de ${results.score}/100. Esta calificación crítica denota múltiples vulnerabilidades severas desatendidas. Su infraestructura requiere endurecimiento reactivo inmediato.`
                ) : (
                  results.score >= 80
                    ? `Your calculated security posture score stands at ${results.score}/100. This indicates a robust infrastructure baseline with excellent compliance. Your operational defense alignment is solid against external threat vectors.`
                    : results.score >= 50
                      ? `Your calculated security posture score stands at ${results.score}/100. This highlights moderate gaps within your active IT layout. While some measures are deployed, missing crucial layers compromises resilience.`
                      : `Your calculated security posture score stands at ${results.score}/100. Ratings below 50 indicate extreme vulnerability and exposure. Immediate defensive hardening is strongly recommended to protect core assets.`
                )}
              </p>
              {results.highUrgency && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-2 select-none font-mono font-bold animate-pulse">
                  <AlertTriangle className="size-3.5" />
                  <span>{currentLocale === "es" ? "ALERTA: CRITICIDAD REVELADA (Downtime >2h)" : "HIGH URGENCY PRIORITY SLATE ASSIGNED"}</span>
                </div>
              )}
            </div>

          </div>

          {isLocked ? (
            /* locked blurred results block & lead gate form */
            <div id="results-gate-form" className="space-y-6">
              
              <div className="border border-white/5 bg-black/40 rounded-3xl p-6 relative overflow-hidden text-center min-h-[160px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-[6px] flex flex-col justify-center items-center p-6 space-y-2 z-10">
                  <Sparkles className="size-5 text-[#3affab] animate-pulse" />
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-black">
                    [ {currentLocale === "es" ? "REGISTRO DE BRECHAS Y AGENDA BLOQUEADA" : "GAP TAGS REPORT & BOOKING SHIELDED"} ]
                  </span>
                  <p className="text-[11px] text-neutral-400 max-w-md">
                    {currentLocale === "es"
                      ? "Proporcione los datos corporativos a continuación para ver el desglose confidencial de incidencias y habilitar la plataforma de reserva directa."
                      : "Provide your corporate details below to review your specific vulnerability gaps list and access our engineering direct scheduling."}
                  </p>
                </div>
                
                {/* Simulated blurred lists */}
                <div className="w-full text-left space-y-2 blur-[4px] select-none">
                  <p className="text-xs text-neutral-550">❌ Missing off-site backup infrastructures</p>
                  <p className="text-xs text-neutral-550">❌ Open ports unfiltered by legacy routers</p>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-xl mx-auto pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">
                      {currentLocale === "es" ? "Nombre completo" : "Full Name"}
                    </label>
                    <div className="relative">
                      <User className="size-4 text-neutral-500 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Joan Puig"
                        className="w-full bg-neutral-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-[#3affab] outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">
                      {currentLocale === "es" ? "Email corporativo" : "Corporate Email"}
                    </label>
                    <div className="relative">
                      <Mail className="size-4 text-neutral-500 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="j.puig@empresa.es"
                        className="w-full bg-neutral-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-[#3affab] outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-neutral-400 block font-semibold">
                    {currentLocale === "es" ? "Nombre de la empresa" : "Company Name"}
                  </label>
                  <div className="relative">
                    <Landmark className="size-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Despacho Puig S.L."
                      className="w-full bg-neutral-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-[#3affab] outline-none transition"
                    />
                  </div>
                </div>

                {/* Cloudflare Turnstile Verification Box */}
                {(import.meta as any).env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY && (
                  <div className="flex justify-center pt-2">
                    <div 
                      className="cf-turnstile" 
                      data-sitekey={(import.meta as any).env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}
                      data-callback="onTurnstileSuccess"
                      data-theme="dark"
                    ></div>
                  </div>
                )}

                {errorMessage && (
                  <p className="text-xs text-red-400 font-mono text-center font-semibold">
                    ⚠️ {errorMessage}
                  </p>
                )}

                <div className="pt-2 flex justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(totalSteps)}
                    className="text-xs text-neutral-400 hover:text-white font-mono uppercase tracking-wider"
                  >
                    ← {currentLocale === "es" ? "Modificar Respuestas" : "Modify Answers"}
                  </button>
                  <button
                    type="submit"
                    id="submit-lead-unlock"
                    disabled={isSubmitting || (!!(import.meta as any).env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY && !turnstileToken)}
                    className="bg-[#3affab] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white text-black py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    {isSubmitting ? (currentLocale === "es" ? "Verificando..." : "Securing...") : (currentLocale === "es" ? "Ver Informe Completo" : "Unlock Risk Analysis")}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>

            </div>
          ) : (
            /* Unlocked detailed lists and modular CAL.COM scheduling component */
            <div id="unlocked-results-report" className="space-y-8 animate-fadeIn">
              
              {/* Detailed dynamic gap lists */}
              <div className="bg-[#0e1118]/80 border border-white/5 rounded-2xl p-6 space-y-4">
                <h5 className="font-mono text-xs text-[#3affab] uppercase tracking-widest font-bold">
                  ⚠️ {currentLocale === "es" ? "Brechas Técnicas Identificadas" : "Specific Vulnerabilities Logged"}
                </h5>
                
                {results.gaps.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.gaps.map((gap, idx) => (
                      <div key={idx} className="p-3 bg-neutral-950 border border-white/5 rounded-xl flex items-start gap-2 text-xs text-neutral-350">
                        <span className="text-red-500 font-bold shrink-0 mt-0.5">⚠️</span>
                        <span>{gap}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 p-3 bg-neutral-950 border border-emerald-500/10 rounded-xl">
                    <Check className="size-4" />
                    <span>{currentLocale === "es" ? "Excelente postura, no se han registrado desviaciones operativas." : "Your current standards show zero immediate exposures."}</span>
                  </div>
                )}
              </div>

              {/* Native Cal.com Booking Component dynamically placed below results */}
              <div id="calcom-booking-embed" className="space-y-4 pt-4 border-t border-white/5">
                <div className="text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#10b981] font-bold block mb-1">
                    [ CAL.EU NATIVE AUDIT BOARD SCHEDULER ]
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    {currentLocale === "es" ? "Programar Auditoría In-Situ en Barcelona" : "Secure Your System Defenses Review"}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {currentLocale === "es"
                      ? "Nuestros consultores de Barcelona han pre-cargado tus datos. Selecciona tu horario para detallar un plan de mitigación personalizado."
                      : "We have prefilled your credentials. Instantly book your in-person Barcelona audit or Microsoft Teams review below:"}
                  </p>
                </div>

                <AuditBooking 
                  currentLocale={currentLocale} 
                  contactName={contactName} 
                  contactEmail={contactEmail} 
                />
              </div>

              {/* Reset assessment option */}
              <div className="pt-2 flex justify-center">
                <button
                  id="reset-audit-button"
                  onClick={() => {
                    setStep(1);
                    setAnswers({});
                    setIsLocked(true);
                    setContactName("");
                    setContactEmail("");
                    setCompanyName("");
                    setTurnstileToken("");
                  }}
                  className="px-5 py-2.5 bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-full font-mono text-2xs uppercase tracking-wider transition cursor-pointer"
                >
                  🔄 {currentLocale === "es" ? "Realizar Nuevo Cuestionario" : "Retake Assessment Audit"}
                </button>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
