import { useState, useEffect } from "react";
import { Locale } from "../types";
import { X, MessageSquare } from "lucide-react";
import { WHATSAPP_CONFIG } from "../config/whatsapp";

interface WhatsAppButtonProps {
  currentLocale: Locale;
}

export default function WhatsAppButton({ currentLocale }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [animatePulse, setAnimatePulse] = useState(true);

  // Auto hide tooltip after some seconds to not annoy users, but keep it visible long enough
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const tooltipText = WHATSAPP_CONFIG.tooltipText;
  const messageText = WHATSAPP_CONFIG.messageText;

  const encodedMsg = encodeURIComponent(messageText[currentLocale]);
  const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMsg}`;

  return (
    <div 
      id="whatsapp-floating-envelope" 
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none"
    >
      {/* Interactive Speech Tooltip Card */}
      {showTooltip && (
        <div 
          id="whatsapp-direct-tooltip"
          className="pointer-events-auto max-w-xs bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 font-sans text-neutral-300 relative animate-fadeIn select-none"
        >
          {/* Close button for tooltip */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2.5 right-2.5 p-1 text-neutral-500 hover:text-white rounded-full bg-slate-950/60 transition cursor-pointer"
            title={currentLocale === "es" ? "Cerrar" : "Close"}
          >
            <X className="size-3" />
          </button>

          <div className="flex gap-2.5 items-start pr-4">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5 shrink-0">
              <MessageSquare className="size-4 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {tooltipText[currentLocale].title}
              </p>
              <p className="text-[10px] text-neutral-400 leading-normal mt-0.5">
                {tooltipText[currentLocale].desc}
              </p>
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            onClick={() => setShowTooltip(false)}
            className="w-full bg-emerald-500 hover:bg-emerald-450 transition text-black text-[10px] font-mono tracking-wider font-extrabold uppercase py-2 px-3 rounded-lg text-center cursor-pointer flex items-center justify-center gap-1.5"
          >
            {tooltipText[currentLocale].cta} →
          </a>
        </div>
      )}

      {/* Floating Action Badge Button */}
      <a
        id="whatsapp-floating-trigger"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        onMouseEnter={() => setAnimatePulse(false)}
        onMouseLeave={() => setAnimatePulse(true)}
        className="pointer-events-auto size-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-2xl relative active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        title={currentLocale === "es" ? "Contactar por WhatsApp" : "Contact on WhatsApp"}
        aria-label="WhatsApp Contact"
      >
        {/* Pulsing Outer Rings */}
        {animatePulse && (
          <>
            <span className="absolute inset-0 rounded-full border border-emerald-500/60 animate-ping opacity-75 scale-125" />
            <span className="absolute inset-x-0 inset-y-0 rounded-full border border-emerald-400/40 animate-ping opacity-40 scale-150 [animation-delay:0.3s]" />
          </>
        )}

        {/* High-Fidelity SVG WhatsApp Logo path */}
        <svg 
          viewBox="0 0 448 512" 
          className="size-7 fill-white transition-transform group-hover:rotate-12 duration-300 pointer-events-none"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Small tooltip hover cue */}
        <span className="absolute right-16 scale-0 origin-right transition-all group-hover:scale-100 bg-emerald-600 text-white text-[10px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-1 rounded-md opacity-90 leading-none whitespace-nowrap shadow-xl">
          {tooltipText[currentLocale].hoverCue}
        </span>
      </a>
    </div>
  );
}
