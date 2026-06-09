import { useState, useEffect } from "react";
import { Locale } from "../../types";
import { Calendar, Clock, ShieldCheck, Loader2 } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface AuditBookingProps {
  currentLocale: Locale;
  contactName?: string;
  contactEmail?: string;
  onSuccess?: () => void;
}

export default function AuditBooking({
  currentLocale,
  contactName = "",
  contactEmail = "",
  onSuccess
}: AuditBookingProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Set up Cal.com widget rules
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({});
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#10b981" } },
          hideEventTypeDetails: true,
          layout: "month_view"
        });
      } catch (error) {
        console.error("Failed to initialize Cal.com api:", error);
      }
    })();

    // Loading transition simulation to prevent layout shift
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // Normalize Cal.com URL from environment
  const rawCalUrl = (import.meta as any).env.VITE_CALCOM_URL || "https://cal.eu/smgtec/audit";
  const calLinkPath = rawCalUrl.replace("https://cal.com/", "").replace("https://cal.eu/", "");

  return (
    <div id="calcom-booking-module" className="w-full space-y-4">
      <div className="relative min-h-[550px] bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        
        {/* Transparent blend decoration rails */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#10b981]/15 to-transparent"></div>

        {/* 1. HIGH-FIDELITY LOADING SKELETON */}
        {isLoading && (
          <div 
            id="cal-skeleton-container" 
            className="absolute inset-0 z-30 bg-[#0c0e14] p-6 sm:p-8 flex flex-col justify-between animate-pulse"
          >
            {/* Top Bar Skeleton */}
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-neutral-800 rounded"></div>
                <div className="h-3 w-48 bg-neutral-900 rounded"></div>
              </div>
              <div className="size-10 rounded-full bg-neutral-900 flex items-center justify-center">
                <Loader2 className="size-4 text-[#10b981] animate-spin" />
              </div>
            </div>

            {/* Calendar Main Grid Mock */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto items-stretch py-4">
              
              {/* Month & Week Selector Skeleton */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <div className="h-4.5 w-24 bg-neutral-800 rounded"></div>
                  <div className="flex gap-2">
                    <div className="size-7 rounded bg-neutral-900"></div>
                    <div className="size-7 rounded bg-neutral-900"></div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2.5 text-center">
                  {/* Weekday headers mock */}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-3 w-6 bg-neutral-900 rounded mx-auto"></div>
                  ))}
                  {/* Calendar day cells mock */}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`size-8 sm:size-9 rounded-full flex items-center justify-center mx-auto ${
                        i % 5 === 2 ? "bg-[#10b981]/10 border border-[#10b981]/25" : "bg-neutral-900/60"
                      }`}
                    >
                      <div className={`size-2.5 rounded-full ${i % 5 === 2 ? "bg-[#10b981]/30" : "bg-neutral-800"}`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Slot Picker Skeleton */}
              <div className="md:col-span-5 space-y-3 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <div className="h-3.5 w-36 bg-neutral-800 rounded mb-2"></div>
                <div className="h-10 w-full bg-neutral-900 rounded-lg"></div>
                <div className="h-10 w-full bg-neutral-900 rounded-lg"></div>
                <div className="h-10 w-full bg-[#10b981]/5 border border-[#10b981]/10 rounded-lg"></div>
                <div className="h-10 w-full bg-neutral-900 rounded-lg"></div>
              </div>

            </div>

            {/* Bottom Status Block */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 border-t border-white/5 pt-4">
              <Calendar className="size-3.5" />
              <span>
                {currentLocale === "es" 
                  ? "Sincronizando con los calendarios de Barcelona NOC..." 
                  : "Securing realtime slots with Barcelona technical coordinators..."}
              </span>
            </div>
          </div>
        )}

        {/* 2. LIVE CAL.COM COMPONENT */}
        <div 
          id="active-calcom-widget" 
          className={`w-full transition-opacity duration-500 ease-out ${
            isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          }`}
          style={{ background: "transparent" }}
        >
          <Cal
            calLink={calLinkPath}
            style={{ width: "100%", height: "550px", overflow: "scroll", background: "transparent" }}
            config={{
              name: contactName,
              email: contactEmail,
              theme: "dark",
              hideEventTypeDetails: true,
            }}
          />
        </div>

      </div>
    </div>
  );
}
