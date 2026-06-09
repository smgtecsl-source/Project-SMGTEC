import { Locale } from "../types";

interface SlaHeaderProps {
  currentLocale: Locale;
}

export default function SlaHeader({ currentLocale }: SlaHeaderProps) {
  return (
    <div
      id="sla-header"
      className="w-full bg-[#151a24] dark:bg-[#151a24] light:bg-[#f1f5f9] border-b border-white/10 dark:border-white/10 light:border-slate-200 text-[10px] font-mono tracking-widest uppercase text-[#70d6ff] dark:text-[#70d6ff] light:text-sky-800 sticky top-0 z-50 py-2 md:py-2.5 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Pulsing Status Indicator with BCN REGION: ACTIVE labels */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3affab] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3affab] shadow-[0_0_8px_#3affab]"></span>
          </span>
          <span className="font-bold tracking-widest text-white/90 dark:text-white/90 light:text-slate-800 hidden xs:inline">
            {currentLocale === "es" ? "SISTEMAS ONLINE" : "SYSTEMS ONLINE"}
          </span>
          <span className="text-white/20 hidden xs:inline">|</span>
          <span>
            {currentLocale === "es" ? "SLA DE DISPONIBILIDAD: 99.99%" : "SLA UPTIME: 99.99%"}
          </span>
        </div>

        {/* Middle and Right side with inline separators */}
        <div className="hidden md:flex items-center gap-4 select-none">
          <span className="text-white/20">|</span>
          <span>
            {currentLocale === "es" ? "RESPUESTA: <15 MIN" : "RESPONSE: <15 MIN"}
          </span>
          <span className="text-white/20">|</span>
          <span>
            {currentLocale === "es" ? "COMPATIBLE LOPDGDD" : "GDPR COMPLIANT"}
          </span>
        </div>

        <div className="flex items-center gap-3 font-semibold">
          <span>{currentLocale === "es" ? "BCN REGION: ACTIVO" : "BCN REGION: ACTIVE"}</span>
        </div>
      </div>
    </div>
  );
}
