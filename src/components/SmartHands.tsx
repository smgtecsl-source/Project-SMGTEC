import { useState } from "react";
import { Locale } from "../types";
import { Wrench, CheckSquare, Clock, MapPin, ExternalLink, HelpCircle } from "lucide-react";

interface SmartHandsProps {
  currentLocale: Locale;
  openContactModal: () => void;
}

export default function SmartHands({ currentLocale, openContactModal }: SmartHandsProps) {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  // Bento Capabilities configs
  const capabilities = [
    {
      title: { es: "Instalación de Hardware", en: "Hardware Deployment" },
      desc: {
        es: "Racking, stacking e instalación física de servidores, switches Cisco, routers Juniper y bandejas de distribución de energía APC.",
        en: "Physical rack & stack configuration of high-density blade servers, firewalls, routers, and PDU setups.",
      },
      tags: ["Rack & Stack", "PDU APC", "Barcelona Metropolitano"],
      stat: "24/7/365"
    },
    {
      title: { es: "Sustracción y Diagnósticos Break-Fix", en: "Break-Fix Swaps & Testing" },
      desc: {
        es: "Reemplazo de componentes críticos (discos SAS/SATA hot-swap, módulos RAM, fuentes redundantes) bajo dirección remota de su equipo de red.",
        en: "Swapping hot-pluggable hardware elements (RAM DIMMs, NVMe disks, PSUs) under your central NOC's remote voice instructions.",
      },
      tags: ["Hot Swap", "Component Loops", "Remote Eyes"],
      stat: "< 15min Resp."
    },
    {
      title: { es: "Soporte en Centros Colocación (MACD)", en: "Data Center MACD Support" },
      desc: {
        es: "Movimientos, Ampliaciones, Cambios y Desmantelamientos en las principales infraestructuras locales como Equinix BA1/BA2, Colt y EdgeConneX.",
        en: "Hands-on Moves, Adds, Changes, and Decommissions at major Barcelona centers including Equinix BA1/BA2, Colt, and EdgeConneX.",
      },
      tags: ["Equinix BA1/BA2", "Colt Barcelona", "Escalada Urgente"],
      stat: "SLA < 2h"
    },
    {
      title: { es: "Cableado Estructurado y Peinados", en: "Cabling & Airflow Cleanup" },
      desc: {
        es: "Peinado de cables de fibra óptica e hilos Cat6 redundantes, rotulaciones, limpieza de flujo de aire y levantamiento físico de calor.",
        en: "Fiber optic patching audits, copper cable labeling, structured loom cleaning, and airflow hotspot checks.",
      },
      tags: ["Fiber Patching", "Cat6 Structured", "Optimización Térmica"],
      stat: "Z-Loom Audits"
    }
  ];

  // SLA pricing tiers table
  const slaTiers = [
    {
      title: { es: "Emergencia Crítica (S1)", en: "Critical Emergency (S1)" },
      time: { es: "Menos de 2 horas", en: "Under 2 Hours" },
      desc: { es: "Pérdida de conectividad global o parada total de operaciones de red.", en: "Complete service outage or crucial primary router drops." },
      badge: "#3affab" // neon green
    },
    {
      title: { es: "Atención Urgente (S2)", en: "Scheduled Urgent (S2)" },
      time: { es: "4 a 6 horas", en: "4 to 6 Hours" },
      desc: { es: "Fallo localizado en canales redundantes secundarias o fallas de test.", en: "Secondary module anomalies with live traffic surviving." },
      badge: "#70d6ff" // immersive blue
    },
    {
      title: { es: "Mantenimiento Planificado (S3)", en: "Planned Maintenance (S3)" },
      time: { es: "Programado 24-48h", en: "Scheduled 24-48h" },
      desc: { es: "MIGRACIONES, cableados ordenados de fibra y auditorías físicas generales.", en: "Comprehensive migrations, patch reorganizations, or inventory audits." },
      badge: "#94a3b8" // slate gray
    }
  ];

  return (
    <div id="smarthands-section-wrapper" className="space-y-12">
      {/* Upper header */}
      <div className="text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3affab]/10 border border-[#3affab]/20 rounded-full text-[11px] text-[#3affab] font-mono uppercase tracking-wider mb-4">
          <MapPin className="size-3.5" />
          {currentLocale === "es" ? "PRESENCIA LOCAL BARCELONA" : "BARCELONA LOCAL DISPATCH"}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {currentLocale === "es"
            ? "Tus Manos y Ojos en los Data Centers de Barcelona"
            : "Your Hands & Eyes On-Site at Barcelona Facilities"}
        </h2>
        <p className="text-base text-neutral-400">
          {currentLocale === "es"
            ? "Olvídate de enviar a tu propio equipo de viaje. SMGTEC proporciona ingenieros capacitados en menos de 2 horas para racking, parches de fibra, sustitución de fuentes y diagnósticos remotos en Equinix BA1/BA2, Colt y oficinas locales."
            : "Avoid flying out engineering resources to Barcelona. SMGTEC secures rapid, certified local technician dispatch in under 2 hours for racking, fiber cross-connect patch loops, and remote break-fix troubleshooting."}
        </p>
      </div>

      {/* Bento Grid layout of capabilities */}
      <h3 className="text-lg font-mono text-neutral-400 border-b border-neutral-850 pb-2 flex items-center gap-2">
        <span className="text-[#3affab] font-bold">[&gt;]</span>
        {currentLocale === "es" ? "CAPACIDADES TÉCNICAS DISPONIBLES" : "DISPATCH CAPABILITIES INDEX"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((cap, index) => (
          <div
            key={index}
            id={`smarthands-bento-cap-${index}`}
            className="group bg-[#151a24] border border-white/10 hover:border-[#3affab]/35 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-lg"
          >
            {/* Hologram aesthetic back */}
            <div className="absolute -top-12 -right-12 size-24 bg-[#3affab]/5 rounded-full blur-xl group-hover:bg-[#3affab]/10 transition-all pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-start gap-4 mb-4">
                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#3affab] transition-colors">
                  {cap.title[currentLocale]}
                </h4>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-black/40 border border-white/15 rounded-md text-[#3affab]">
                  {cap.stat}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                {cap.desc[currentLocale]}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {cap.tags.map((tag, tIndex) => (
                <span
                  key={tIndex}
                  className="font-mono text-[9px] uppercase px-2 py-0.5 bg-black/50 border border-white/5 text-neutral-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Dispatch Flow steps */}
      <div className="bg-[#151a24] border border-white/10 rounded-2xl p-6 md:p-8">
        <h4 className="text-base font-bold font-mono text-white mb-6 uppercase flex items-center gap-2">
          <Clock className="size-4 text-[#3affab]" />
          {currentLocale === "es" ? "FLUJO DE DESPACHO Y ESCALADA DE OPERACIONES" : "STANDARD DISPATCH OPERATIONAL FLOW"}
        </h4>
        
        {/* Step circles */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-[18px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0"></div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="size-9 rounded-full bg-black/40 border border-white/15 font-mono text-xs font-bold text-[#70d6ff] flex items-center justify-center mb-3">
              1
            </div>
            <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">
              {currentLocale === "es" ? "Solicitud Abierta" : "Request Filed"}
            </h5>
            <p className="text-[11px] text-neutral-400 mt-1 max-w-[150px]">
              {currentLocale === "es" ? "Formulario Web o Ticket SLA" : "Secure Web Portal or SLA Ticket form"}
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="size-9 rounded-full bg-black/40 border border-white/15 font-mono text-xs font-bold text-[#70d6ff] flex items-center justify-center mb-3">
              2
            </div>
            <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">
              {currentLocale === "es" ? "Ingeniero Asignado" : "Engineer Selected"}
            </h5>
            <p className="text-[11px] text-neutral-400 mt-1 max-w-[150px]">
              {currentLocale === "es" ? "Asignación técnica en menos de 15min" : "Resource allocated within 15 Minutes"}
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="size-9 rounded-full bg-black/40 border border-white/15 font-mono text-xs font-bold text-[#70d6ff] flex items-center justify-center mb-3">
              3
            </div>
            <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">
              {currentLocale === "es" ? "Llegada In-Situ" : "On-Site Arrival"}
            </h5>
            <p className="text-[11px] text-neutral-400 mt-1 max-w-[150px]">
              {currentLocale === "es" ? "SLA de llegada garantizada < 2h" : "Metro Area SLA: under 2 Hours"}
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="size-9 rounded-full bg-[#3affab]/20 border border-[#3affab] font-mono text-xs font-bold text-[#3affab] flex items-center justify-center mb-3 animate-pulse">
              4
            </div>
            <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">
              {currentLocale === "es" ? "Cierre y Fotos" : "Live Visual Validation"}
            </h5>
            <p className="text-[11px] text-neutral-400 mt-1 max-w-[150px]">
              {currentLocale === "es" ? "Evidencia fotográfica y reporte final" : "Direct status photos & closed logs feed"}
            </p>
          </div>
        </div>
      </div>

      {/* SLA Matrix comparison section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* SLA Description */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-lg font-bold text-white tracking-tight">
            {currentLocale === "es" ? "Compromiso de SLA Contractual" : "Contractual Response Matrix"}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {currentLocale === "es"
              ? "Definimos penalizaciones explícitas en nuestros contratos SLA. Si no nos presentamos en tu data center a tiempo, devaluamos tus costes de cuota de forma automática."
              : "We tie our operations to transparent penalties. Missing our contractual times means direct credit back to your account, no exceptions."}
          </p>
          <button
            onClick={openContactModal}
            className="inline-flex items-center gap-1.5 text-[#3affab] hover:text-white transition-colors text-xs font-bold tracking-wider uppercase cursor-pointer"
          >
            {currentLocale === "es" ? "Ver Acuerdo SLA Completo" : "Review Comprehensive SLA Terms"}
            <ExternalLink className="size-3.5 text-[#70d6ff]" />
          </button>
        </div>

        {/* Interactive Tiers visualizer */}
        <div className="lg:col-span-8 bg-[#151a24] border border-white/10 rounded-2xl p-5 md:p-6 space-y-4 font-mono text-xs shadow-xl">
          <div className="flex border-b border-white/10 pb-2 mb-2 text-neutral-400 text-[10px] uppercase font-bold justify-between">
            <span>[ {currentLocale === "es" ? "EVALUACIÓN DE SEVERIDAD DE DISPARO" : "SLA COMMITMENT SPECIFICATION"} ]</span>
            <span>BCN METRO RANGE</span>
          </div>

          <div className="space-y-2.5">
            {slaTiers.map((tier, index) => (
              <button
                key={index}
                onClick={() => setSelectedTier(index)}
                id={`sla-tier-button-${index}`}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-350 cursor-pointer ${
                  selectedTier === index
                    ? "bg-black/30 border-white/20 shadow-md"
                    : "bg-transparent border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: tier.badge }}
                    ></span>
                    <span className="font-bold text-white text-xs uppercase">
                      {tier.title[currentLocale]}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded uppercase self-start sm:self-auto text-black tracking-wide"
                    style={{ backgroundColor: tier.badge }}
                  >
                    {tier.time[currentLocale]}
                  </span>
                </div>
                {selectedTier === index && (
                  <p className="text-[11px] text-neutral-400 font-sans mt-2.5 leading-relaxed">
                    {tier.desc[currentLocale]}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
