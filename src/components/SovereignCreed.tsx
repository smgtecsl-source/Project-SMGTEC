import { useState } from "react";
import { Locale } from "../types";
import { ShieldCheck, HelpCircle, ArrowRightLeft, Info, HelpCircle as HelpIcon, Lock, Swords, Zap, CheckCircle } from "lucide-react";

interface SovereignCreedProps {
  currentLocale: Locale;
  openContactModal: (topic?: string) => void;
}

export default function SovereignCreed({ currentLocale, openContactModal }: SovereignCreedProps) {
  const [activeGlossary, setActiveGlossary] = useState<"edr" | "soc" | "bcdr" | "sla">("edr");

  // Jargon decryptor data map
  const glossaryItems = {
    edr: {
      title: "EDR (Endpoint Detection & Response)",
      acronym: "EDR",
      es: {
        concept: "Protección Activa No-Reactiva",
        decrypt: "No es un simple antivirus que te avisa cuando ya te han robado. Es una inteligencia activa (SentinelOne) instalada en tus PC que detecta comportamientos extraños de ransomware y bloquea, aísla y revierte los archivos afectados de inmediato."
      },
      en: {
        concept: "Proactive Autonomous Safeguard",
        decrypt: "Not a traditional passive antivirus waiting for weekly scans. Managed EDR is an autonomous agent (SentinelOne) running on your systems that detects anomalous hacker operations, sandboxes the threat, and automatically rolls back altered files in seconds."
      }
    },
    soc: {
      title: "SOC (Security Operations Center)",
      acronym: "SOC",
      es: {
        concept: "Fuerza Especial de Vigilancia 24/7",
        decrypt: "Un búnker de analistas e ingenieros dedicados exclusivamente a auditar los logs e informes de intrusión de tu red en tiempo real. Actúan de madrugada aislando el equipo infectado para que tú puedas dormir con total tranquilidad."
      },
      en: {
        concept: "24/7 Active Tactical Bunker",
        decrypt: "A dedicated war room of cyber analysts scanning telemetry, log streams, and terminal signals around the clock. They intervene instantly at 3:00 AM to freeze breach attempts before your employees log in next morning."
      }
    },
    bcdr: {
      title: "BCDR (Business Continuity & Disaster Recovery)",
      acronym: "BCDR",
      es: {
        concept: "Plan de Resurrección de Red Veloz",
        decrypt: "No es un simple backup en la nube. Es un sistema integral que copia tus servidores y archivos cada hora. Si tu servidor central sufre un cortocircuito físico, levantamos un gemelo virtual cloud en menos de 15 minutos."
      },
      en: {
        concept: "15-Minute System Virtualization",
        decrypt: "Far beyond primitive off-site folders. BCDR is a structured duplication pattern that clones entire virtual machines every hour. If your physical rack is corrupted, we spin up a virtual twin clone in the cloud instantly."
      }
    },
    sla: {
      title: "SLA (Service Level Agreement)",
      acronym: "SLA",
      es: {
        concept: "Contrato de Velocidad Penalizado",
        decrypt: "Nuestra garantía por escrito. No te prometemos 'haremos lo posible'. Firmamos por contrato que si tienes un incidente crítico respondemos en menos de 15 minutos o asumimos penalizaciones directas sobre tu tarifa."
      },
      en: {
        concept: "Legally Binding Speed Warranty",
        decrypt: "A strict contractual speed pledge. We ban empty 'best effort' promises. We write our <15-minute response times into legally binding service agreements with direct financial penalties if we ever fail."
      }
    }
  };

  return (
    <section id="sovereign-creed-matrix" className="space-y-16">
      
      {/* 1. Header Hero Panel with premium visual design */}
      <div className="text-left max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3affab] uppercase tracking-wider px-2.5 py-1 bg-[#3affab]/10 rounded-full border border-[#3affab]/20">
          <ShieldCheck className="size-3.5" />
          {currentLocale === "es" ? "EL MANIFIESTO SOBERANO" : "THE SOVEREIGN QUALITY PLEDGE"}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
          {currentLocale === "es" 
            ? "Por qué los líderes rechazan las soluciones IT estándar" 
            : "Why high-tier operators reject average IT templates"}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
          {currentLocale === "es"
            ? "Un sitio web corporativo de 1 millón de dólares no esconde la realidad: el soporte IT de bajo coste es la opción más cara de la industria ante un ciberataque. Así es como garantizamos la inmunidad de tus sistemas."
            : "An elite operation cannot rely on low-density compromises. Standard IT providers compete on discount rates while cutting raw operational corners. We design uncompromising technological shields."}
        </p>
      </div>

      {/* 2. Three columns layout addressing Confused, Selector, and Cynic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Column A: Interactive Decryptor [THE CONFUSED READER] */}
        <div className="lg:col-span-4 bg-[#151a24]/90 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3affab]/3 rounded-full blur-[30px] pointer-events-none"></div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              <Info className="size-3.5 text-[#3affab]" />
              {currentLocale === "es" ? "Decodificador de Jargon IT" : "Technical Jargon Decryptor"}
            </div>
            
            <h3 className="text-xl font-bold tracking-tight text-white font-sans">
              {currentLocale === "es" ? "¿Confuso con los acrónimos?" : "Confused by security acronyms?"}
            </h3>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {currentLocale === "es" 
                ? "Te quitamos el humo técnico. Haz clic en cada token para comprender qué significan estos términos técnicos en el mundo real:" 
                : "We strip away deceptive marketing tech-talk. Select any protocol below to understand its exact real-world purpose:"}
            </p>

            {/* Selector tokens */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {(Object.keys(glossaryItems) as Array<keyof typeof glossaryItems>).map((key) => {
                const item = glossaryItems[key];
                const isSelected = activeGlossary === key;
                return (
                  <button
                    key={key}
                    id={`glossary-btn-${key}`}
                    onClick={() => setActiveGlossary(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#3affab] text-black shadow-lg"
                        : "bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.acronym}
                  </button>
                );
              })}
            </div>

            {/* Display decrypter insight box */}
            <div className="bg-black/60 border border-white/5 rounded-2xl p-4 mt-3 space-y-2 select-none min-h-[140px] flex flex-col justify-center">
              <span className="text-[10px] font-mono text-[#3affab] uppercase font-bold tracking-wide">
                ↳ {glossaryItems[activeGlossary][currentLocale].concept}
              </span>
              <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                {glossaryItems[activeGlossary][currentLocale].decrypt}
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <span className="text-[9px] font-mono text-neutral-500 uppercase block">
              [ {currentLocale === "es" ? "Claridad absoluta garantizada" : "Zero deceptive corporate talk"} ]
            </span>
          </div>
        </div>

        {/* Column B: Head-to-Head Comparison [THE SELECTOR / COMPARER] */}
        <div className="lg:col-span-5 bg-[#151a24]/90 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#70d6ff]/3 rounded-full blur-[30px] pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              <ArrowRightLeft className="size-3.5 text-[#3affab]" />
              {currentLocale === "es" ? "Comparativa Directa de Valor" : "The Core Operator Contrast"}
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white font-sans">
              {currentLocale === "es" ? "Proveedores Tradicionales vs SMGTEC" : "Traditional MSP Operators vs Our Standard"}
            </h3>

            {/* Direct rows comparison map */}
            <div className="space-y-3 pt-2 text-[11px] font-sans">
              
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-2">
                <div>
                  <span className="text-red-400 block font-bold font-mono text-[9px] uppercase">❌ SOPORTE TRADICIONAL</span>
                  <p className="text-neutral-400 mt-0.5 leading-snug">
                    {currentLocale === "es" ? "Soporte basado en emails reactivos. Esperas de hasta 48 horas sin SLA real." : "Ticket-based email support with slow 'best effort' 48-hour response queues."}
                  </p>
                </div>
                <div>
                  <span className="text-[#3affab] block font-bold font-mono text-[9px] uppercase">⚡ SISTEMA SOBERANO SMGTEC</span>
                  <p className="text-neutral-250 mt-0.5 leading-snug font-semibold">
                    {currentLocale === "es" ? "Compromiso escrito de SLA <15 minutos por teléfono con ingenieros senior directos." : "Legally written SLA securing direct helpdesk connect times under 15 minutes."}
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-2">
                <div>
                  <span className="text-red-400 block font-bold font-mono text-[9px] uppercase">❌ ANTIVIRUS GENÉRICOS</span>
                  <p className="text-neutral-400 mt-0.5 leading-snug">
                    {currentLocale === "es" ? "Software gratuito de firmas de virus estáticas. Vulnerable a ataques de día cero." : "Legacy freeware checkers vulnerable to advanced zero-day ransomware loops."}
                  </p>
                </div>
                <div>
                  <span className="text-[#3affab] block font-bold font-mono text-[9px] uppercase">🛡️ SENTINELONE MANAGED EDR</span>
                  <p className="text-neutral-250 mt-0.5 leading-snug font-semibold">
                    {currentLocale === "es" ? "Suscripciones corporativas con análisis heurístico de amenazas y aislamiento automatizado." : "Enterprise SentinelOne engine sandboxing and rolling back malicious attacks instantly."}
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-red-400 block font-bold font-mono text-[9px] uppercase">❌ PRECIOS ENREDO</span>
                  <p className="text-neutral-400 mt-0.5 leading-snug">
                    {currentLocale === "es" ? "Cuotas misteriosas que aumentan con horas extras no declaradas y cargos sorpresa." : "Secret fees that hide expensive onboarding work or spike upon overtime."}
                  </p>
                </div>
                <div>
                  <span className="text-[#3affab] block font-bold font-mono text-[9px] uppercase">💎 TRANSPARENCIA SIN CATÁLOGOS</span>
                  <p className="text-neutral-250 mt-0.5 leading-snug font-semibold">
                    {currentLocale === "es" ? "Costes cerrados, basados estrictamente en tu escala y acordados bajo contrato mutuo." : "100% custom defined pricing scale agreed beforehand with zero undisclosed surcharges."}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-[9px] font-mono text-[#70d6ff] select-none font-bold">
            <span>[ COMPROMISO DE ALTA FIDELIDAD IT ]</span>
            <span>VANGUARD_V1</span>
          </div>
        </div>

        {/* Column C: The Cynic & Cheap Objections [CYNIC & CHEAP READERS] */}
        <div className="lg:col-span-3 bg-neutral-950 border border-[#3affab]/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Active outline pulse to stand out as highly professional */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#3affab]/5 rounded-full blur-[40px] pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-1 text-[#3affab] font-mono text-[10px] uppercase tracking-widest font-bold">
              <Lock className="size-3.5 shrink-0" />
              {currentLocale === "es" ? "Filosofía del Precio Único" : "Our SLA Pricing Manifesto"}
            </div>

            <h3 className="text-lg font-bold tracking-tight text-white font-sans uppercase">
              {currentLocale === "es" ? "¿Por qué prohibimos las tarifas fijas del montón?" : "Why we ban standardized box rates"}
            </h3>

            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              {currentLocale === "es"
                ? "Los planes de catálogo baratos arrastran fallos peligrosos. Cada servidor en Barcelona posee una superficie de ataque y una importancia de datos distinta."
                : "Catalog MSP prices are a dangerous trap. Two networks of 30 computers are never identical; one stores plain metadata, while the other processes high-stakes compliance files."}
            </p>

            <blockquote className="border-l-2 border-[#3affab] pl-3 py-1 font-mono text-[10px] leading-snug text-white italic">
              {currentLocale === "es"
                ? '"Comprar IT barata es el error más costoso de las empresas modernas. Una hora de caída de base de datos cuesta más que un año entero de cobertura dedicada."'
                : '"Generic IT subscription is an invitation to failure. A single localized database outage offsets the initial cost of premium service by 10x."'}
            </blockquote>
          </div>

          <div className="pt-6 space-y-2">
            <button
              id="cta-manifesto-action"
              onClick={() => openContactModal("Manifesto Custom Audit")}
              className="w-full bg-[#3affab] hover:bg-white text-black py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition duration-300 block cursor-pointer shadow-md"
            >
              {currentLocale === "es" ? "Solicitar Auditoría de ROI" : "Request ROI Audit"}
            </button>
            <span className="text-[9px] font-mono text-neutral-600 block text-center uppercase select-none">
              [ {currentLocale === "es" ? "Gobernanza de Nivel Bancario" : "Bank-Grade Operational Care"} ]
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
