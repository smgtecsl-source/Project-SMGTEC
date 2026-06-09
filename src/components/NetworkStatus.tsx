import { useState, useEffect } from "react";
import { Locale } from "../types";
import { Shield, Server, RefreshCw, CheckCircle2 } from "lucide-react";

interface NetworkStatusProps {
  currentLocale: Locale;
}

export default function NetworkStatus({ currentLocale }: NetworkStatusProps) {
  const [latency, setLatency] = useState(14);
  const [lastVerified, setLastVerified] = useState<string>("");
  const [packetsSent, setPacketsSent] = useState(185903);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Generate some randomized latency & packets sent
    const interval = setInterval(() => {
      setLatency((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2;
        const next = prev + offset;
        return next < 8 ? 8 : next > 25 ? 25 : next;
      });
      setPacketsSent((p) => p + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    // Dynamic timestamp updating
    const updateTimestamp = () => {
      const now = new Date();
      const minsAgo = now.getMinutes() % 15; // simulate verified a few minutes ago
      setLastVerified(
        currentLocale === "es"
          ? `Verificado hace ${minsAgo === 0 ? "1" : minsAgo} min`
          : `Verified ${minsAgo === 0 ? "1" : minsAgo}m ago`
      );
    };

    updateTimestamp();
    const tsInterval = setInterval(updateTimestamp, 60000);

    // Initial logs
    setLogs(
      currentLocale === "es"
        ? [
            "SYS_LOG: Iniciando monitor de red...",
            "SOC_SHIELD_ARMED: SentinelOne EDR activo en 342 terminales.",
            "BCDR_STATUS: Replicación en caliente completada en Datto Cloud Barcelona.",
            "TRAFFIC_OK: Equinix BA1 & BA2 operando en condiciones óptimas (SLA 99.99%)."
          ]
        : [
            "SYS_LOG: Starting network telemetry monitor...",
            "SOC_SHIELD_ARMED: SentinelOne EDR active on 342 user endpoints.",
            "BCDR_STATUS: Hot replication finalized at Datto Cloud Barcelona.",
            "TRAFFIC_OK: Equinix BA1 & BA2 routing under nominal load (SLA 99.99%)."
          ]
    );

    return () => {
      clearInterval(interval);
      clearInterval(tsInterval);
    };
  }, [currentLocale]);

  return (
    <div
      id="live-status-widget"
      className="w-full bg-[#151a24] border border-white/10 rounded-2xl p-5 md:p-6 font-mono text-xs text-white/90 shadow-2xl relative overflow-hidden"
    >
      {/* Absolute Subtle Tech Decorator */}
      <div className="absolute top-0 right-0 p-3 text-neutral-600 font-extrabold select-none text-[8px]">
        SMG_SYS_V4.30
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
        {/* Active Header Status Indicator */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3affab] opacity-75"
              style={{ animationDuration: "1.5s" }}
            ></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3affab] shadow-[0_0_8px_#3affab]"></span>
          </span>
          <div>
            <span className="text-white font-extrabold uppercase tracking-wider text-xs">
              {currentLocale === "es" ? "ESTADO DEL SISTEMA: OPERATIVO" : "SYSTEM STATUS: OPERATIONAL"}
            </span>
            <p className="text-[10px] text-[#70d6ff] font-mono mt-0.5 uppercase tracking-wide">
              BCN NODE-1 | LATENCY: {latency}ms | PACKETS: {packetsSent.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action button to refresh metrics */}
        <button
          onClick={() => {
            setLatency(10 + Math.floor(Math.random() * 6));
            setPacketsSent((p) => p + 142);
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 hover:border-white/25 active:bg-neutral-650 transition text-[10px] font-bold uppercase text-neutral-300 rounded-md border border-white/10 cursor-pointer"
        >
          <RefreshCw className="size-3 text-[#3affab]" />
          {currentLocale === "es" ? "Comprobar NOC" : "Diagnostics NOC"}
        </button>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
        {/* NOC Status */}
        <div className="bg-black/40 p-3.5 rounded-lg border border-white/5 flex items-start gap-3">
          <Server className="size-5 text-[#3affab] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[11px] text-neutral-400 uppercase">
              {currentLocale === "es" ? "Soporte NOC" : "NOC Operations"}
            </p>
            <p className="text-xs text-[#3affab] font-bold mt-1 uppercase flex items-center gap-1">
              <span className="inline-block size-1.5 rounded-full bg-[#3affab] animate-pulse"></span>
              {currentLocale === "es" ? "Activo 24/7" : "Active 24/7"}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1 lowercase">
              {currentLocale === "es" ? "barcelona metropolitano" : "bcn metro SLA"}
            </p>
          </div>
        </div>

        {/* SOC Shield Status */}
        <div className="bg-black/40 p-3.5 rounded-lg border border-white/5 flex items-start gap-3">
          <Shield className="size-5 text-[#70d6ff] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[11px] text-neutral-400 uppercase">
              {currentLocale === "es" ? "Ciberseguridad SOC" : "SOC Shield"}
            </p>
            <p className="text-xs text-[#70d6ff] font-bold mt-1 uppercase flex items-center gap-1">
              <span className="inline-block size-1.5 rounded-full bg-[#70d6ff]"></span>
              {currentLocale === "es" ? "Protegido SIEM" : "Armed + Monitored"}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1 lowercase">
              {currentLocale === "es" ? "amenazas bloqueadas" : "threat shield active"}
            </p>
          </div>
        </div>

        {/* Backup verification */}
        <div className="bg-black/40 p-3.5 rounded-lg border border-white/5 flex items-start gap-3">
          <CheckCircle2 className="size-5 text-[#3affab] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[11px] text-neutral-400 uppercase">
              {currentLocale === "es" ? "Copias BCDR" : "BCDR Backup"}
            </p>
            <p className="text-xs text-[#3affab] font-bold mt-1 uppercase flex items-center gap-1">
              <span className="inline-block size-1.5 rounded-full bg-[#3affab]"></span>
              {currentLocale === "es" ? "Verificado" : "DB Verified"}
            </p>
            <p className="text-[10px] text-neutral-400 font-mono mt-1 lowercase">
              {lastVerified}
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Telemetry Lines */}
      <div className="bg-black/80 text-neutral-400 p-3 rounded-lg border border-white/5 overflow-x-auto select-none space-y-1 max-h-32 text-[11px] leading-relaxed">
        {logs.map((log, index) => {
          const isHighlight = log.includes("SOC_SHIELD_ARMED") || log.includes("BCDR_STATUS");
          return (
            <div key={index} className="flex gap-2">
              <span className="text-[#3affab] font-bold">$&gt;</span>
              <p className={isHighlight ? "text-neutral-200" : ""}>
                {log}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
