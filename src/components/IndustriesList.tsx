import { useState } from "react";
import { Locale } from "../types";
import { industriesConfig } from "../config/industries";
import { ShieldAlert, CheckCircle2, ChevronRight, Globe, Star, Shield, Cpu, Lock, Activity, Layers, Headphones, Wrench, Tv, Sparkles, Database, Clock } from "lucide-react";

interface IndustriesListProps {
  currentLocale: Locale;
  openContactModal: (industrySlug?: string) => void;
}

export default function IndustriesList({ currentLocale, openContactModal }: IndustriesListProps) {
  const [selectedSlug, setSelectedSlug] = useState("legal");

  const currentConfig = industriesConfig.find((ind) => ind.slug === selectedSlug) || industriesConfig[0];

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert": return <ShieldAlert className="size-5 text-red-400 shrink-0 mt-1" />;
      case "DatabaseBackup":
      case "Database": return <Database className="size-5 text-sky-400 shrink-0 mt-1" />;
      case "Lock": return <Lock className="size-5 text-emerald-400 shrink-0 mt-1" />;
      case "Activity": return <Activity className="size-5 text-[oklch(75% 0.15 150)] shrink-0 mt-1" />;
      case "Layers": return <Layers className="size-5 text-indigo-400 shrink-0 mt-1" />;
      case "Wrench": return <Wrench className="size-5 text-orange-400 shrink-0 mt-1" />;
      case "Tv": return <Tv className="size-5 text-pink-400 shrink-0 mt-1" />;
      case "Sparkles": return <Sparkles className="size-5 text-yellow-400 shrink-0 mt-1" />;
      case "Clock": return <Clock className="size-5 text-sky-400 shrink-0 mt-1" />;
      case "Shield": return <Shield className="size-5 text-[#3affab] shrink-0 mt-1" />;
      default: return <Shield className="size-5 text-white shrink-0 mt-1" />;
    }
  };

  return (
    <div id="industries-list-wrapper" className="space-y-10">
      {/* Dynamic Switcher buttons */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-neutral-800">
        {industriesConfig.map((ind) => {
          const isSelected = ind.slug === selectedSlug;
          return (
            <button
              key={ind.slug}
              id={`industry-switch-btn-${ind.slug}`}
              onClick={() => setSelectedSlug(ind.slug)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-150 cursor-pointer ${
                isSelected
                  ? "bg-white text-black font-bold border border-white"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {ind.name[currentLocale]}
            </button>
          );
        })}
      </div>

      {/* Main Focus Detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left pane: Title + description + regulatory compliance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {currentConfig.headline[currentLocale]}
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {currentConfig.description[currentLocale]}
            </p>
          </div>

          {/* Compliance chips */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
              [ {currentLocale === "es" ? "ESTÁNDARES DE CUMPLIMIENTO REGULATORIO" : "DATA SECURITY COMPLIANCE COVER"} ]
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentConfig.compliance.map((comp) => (
                <span
                  key={comp}
                  className="font-mono text-[10px] font-semibold px-3 py-1 bg-neutral-950 border border-neutral-800 text-[oklch(75% 0.15 150)] rounded-md uppercase tracking-wider"
                >
                  🔒 {comp} Compliant
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              id="cta-industry-lead"
              onClick={() => openContactModal(currentConfig.slug)}
              className="bg-[#3affab] text-black py-4 px-6 rounded-xl text-xs sm:text-sm font-bold hover:bg-white transition cursor-pointer flex items-center justify-between w-full shadow-md uppercase tracking-wider"
            >
              <span>{currentConfig.pricingCTA[currentLocale]}</span>
              <ChevronRight className="size-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Right pane: Core Challenges and targeted Solutions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Challenges Card */}
          <div className="bg-neutral-950 border border-red-500/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 font-mono text-[8.5px] text-red-500/40 select-none">
              RISK_VECTOR_LIST
            </div>
            <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert className="size-4 shrink-0" />
              {currentLocale === "es" ? "Puntos Críticos de Falla y Amenazas" : "Core Threat Vector Vulnerabilities"}
            </h4>

            <ul className="space-y-3 font-sans text-xs sm:text-sm text-neutral-350 leading-relaxed">
              {currentConfig.challenges[currentLocale].map((chal, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="text-red-500 font-mono text-xs font-bold leading-normal mt-0.5">&gt;</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions list */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
              [ {currentLocale === "es" ? "SOLUCIÓN INTEGRAL DE SERVICIO IT" : "INTEGRATED CODES AND MITIGATION TOOLS"} ]
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentConfig.solutions.map((sol, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition"
                >
                  <div className="flex gap-3 items-start mb-3">
                    {getIcon(sol.icon)}
                    <h5 className="font-bold text-white text-sm sm:text-base tracking-tight leading-snug">
                      {sol.title[currentLocale]}
                    </h5>
                  </div>
                  <p className="text-[11.5px] sm:text-xs text-neutral-400 leading-relaxed">
                    {sol.description[currentLocale]}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
