import { useState, useEffect } from "react";
import { Locale } from "../types";
import { AlertTriangle, Download, X, HelpCircle, ShieldCheck } from "lucide-react";

interface DowntimeCalculatorProps {
  currentLocale: Locale;
  openContactModal: (calculatorData?: any) => void;
}

export default function DowntimeCalculator({
  currentLocale,
  openContactModal,
}: DowntimeCalculatorProps) {
  // Calculator sliders state
  const [employees, setEmployees] = useState(40);
  const [wage, setWage] = useState(25);
  const [revenue, setRevenue] = useState(500);
  const [hours, setHours] = useState(4);

  // Computed loss
  const [loss, setLoss] = useState(0);
  const [displayLoss, setDisplayLoss] = useState(0);

  // Calculate loss using formula L = H * ((E * W * 0.85) + R)
  useEffect(() => {
    const computed = hours * ((employees * wage * 0.85) + revenue);
    setLoss(computed);
  }, [employees, wage, revenue, hours]);

  // Smooth count animation for loss transitions
  useEffect(() => {
    let animationFrameId: number;
    const start = displayLoss;
    const end = loss;
    if (start === end) return;

    const duration = 250; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad easing
      const ease = progress * (2 - progress);
      const current = Math.floor(start + (end - start) * ease);

      setDisplayLoss(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayLoss(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [loss]);

  // Handle lead conversion button clicks
  const handleConversionClick = () => {
    const summary = {
      employees,
      hourlyWage: wage,
      hourlyRevenue: revenue,
      downtimeHours: hours,
      totalLoss: loss,
    };
    openContactModal(summary);
  };

  const employeesPct = ((employees - 5) / (200 - 5)) * 100;
  const wagePct = ((wage - 15) / (100 - 15)) * 100;
  const revenuePct = ((revenue - 50) / (10000 - 50)) * 100;
  const hoursPct = ((hours - 1) / (48 - 1)) * 100;

  return (
    <div
      id="cost-downtime-calculator-widget"
      className="w-full bg-[#151a24] border border-white/10 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl"
    >
      {/* High-end scoped rules for top 0.01% range sliders */}
      <style>{`
        input[type="range"].premium-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          cursor: pointer;
          outline: none;
          border-radius: 999px;
          transition: all 0.2s ease;
        }
        input[type="range"].premium-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.7);
        }
        input[type="range"].premium-slider::-moz-range-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.7);
        }
        input[type="range"].premium-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #090c12;
          border: 3.5px solid currentColor;
          cursor: grab;
          margin-top: -7px;
          box-shadow: 0 0 12px currentColor, 0 4px 6px rgba(0,0,0,0.8);
          transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        input[type="range"].premium-slider:hover::-webkit-slider-thumb {
          transform: scale(1.15);
          background: currentColor;
        }
        input[type="range"].premium-slider:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.22);
          background: #ffffff;
          border-color: #ffffff;
          box-shadow: 0 0 20px #ffffff, 0 4px 8px rgba(0,0,0,0.9);
        }
        input[type="range"].premium-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #090c12;
          border: 3.5px solid currentColor;
          cursor: grab;
          box-shadow: 0 0 12px currentColor, 0 4px 6px rgba(0,0,0,0.8);
          transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        input[type="range"].premium-slider:hover::-moz-range-thumb {
          transform: scale(1.15);
          background: currentColor;
        }
        input[type="range"].premium-slider:active::-moz-range-thumb {
          cursor: grabbing;
          transform: scale(1.22);
          background: #ffffff;
          border-color: #ffffff;
          box-shadow: 0 0 20px #ffffff, 0 4px 8px rgba(0,0,0,0.9);
        }
      `}</style>

      {/* Decorative Warning glow background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Title block */}
      <div className="mb-6 md:mb-8 text-left max-w-xl">
        <div className="flex items-center gap-2 text-[#70d6ff] font-mono text-xs uppercase tracking-widest font-semibold mb-2">
          <AlertTriangle className="size-4 shrink-0 animate-pulse text-[#3affab]" />
          {currentLocale === "es" ? "Calculador de Rentabilidad IT" : "IT Profitability & Risk Audit"}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
          {currentLocale === "es"
            ? "Mide el Coste Real de una Caída de Sistemas"
            : "Calculate Your Real Cost of Downtime"}
        </h3>
        <p className="text-sm text-neutral-400">
          {currentLocale === "es"
            ? "Muchos negocios en Barcelona ignoran cuánto pierden por hora de inactividad de su servidor, internet o red local. Compruébalo tú mismo:"
            : "Most companies underestimate the cumulative damages of localized IT outages. Use our real-time financial assessment model."}
        </p>
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: 4 Sliders */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slider 1: Employees */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-neutral-250">
              <span className="flex items-center gap-2">
                {currentLocale === "es" ? "1. Empleados Inactivos" : "1. Employees Idle"}
                <span className="group relative">
                  <HelpCircle className="size-3.5 text-neutral-500 hover:text-neutral-300 cursor-help" />
                  <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-0 mb-2 w-48 p-2 bg-neutral-950 text-neutral-400 text-[10px] leading-snug rounded-md border border-neutral-800 transition duration-150 z-30 font-normal">
                    {currentLocale === "es"
                      ? "Número de trabajadores afectados imposibilitados para facturar o producir."
                      : "Total headcount blocked from processing work or servicing clients."}
                  </span>
                </span>
              </span>
              <span className="font-mono text-[#3affab] text-base">{employees}</span>
            </div>
            <input
              id="slider-employees"
              type="range"
              min="5"
              max="200"
              step="1"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="premium-slider text-[#3affab] w-full"
              style={{
                background: `linear-gradient(to right, #3affab 0%, #3affab ${employeesPct}%, #0e1118 ${employeesPct}%, #0e1118 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>5</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          {/* Slider 2: Average Hourly Wage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-neutral-250">
              <span>
                {currentLocale === "es" ? "2. Coste Medio por Hora de Empleado" : "2. Avg. Employee Hourly Cost"}
              </span>
              <span className="font-mono text-[#3affab] text-base">{wage} €/hr</span>
            </div>
            <input
              id="slider-wage"
              type="range"
              min="15"
              max="100"
              step="5"
              value={wage}
              onChange={(e) => setWage(Number(e.target.value))}
              className="premium-slider text-[#3affab] w-full"
              style={{
                background: `linear-gradient(to right, #3affab 0%, #3affab ${wagePct}%, #0e1118 ${wagePct}%, #0e1118 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>15 €</span>
              <span>50 €</span>
              <span>100 €</span>
            </div>
          </div>

          {/* Slider 3: Hourly Revenue */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[#3affab]/90">
              <span>
                {currentLocale === "es" ? "3. Facturación Por Hora Estimada" : "3. Estimated Hourly Revenue"}
              </span>
              <span className="font-mono text-[#3affab] text-base">{revenue.toLocaleString()} €/hr</span>
            </div>
            <input
              id="slider-revenue"
              type="range"
              min="50"
              max="10000"
              step="50"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="premium-slider text-[#3affab] w-full"
              style={{
                background: `linear-gradient(to right, #3affab 0%, #3affab ${revenuePct}%, #0e1118 ${revenuePct}%, #0e1118 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>50 €</span>
              <span>5.000 €</span>
              <span>10.000 €</span>
            </div>
          </div>

          {/* Slider 4: Outage Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-neutral-250">
              <span>
                {currentLocale === "es" ? "4. Duración de la Caída (Horas)" : "4. Outage Location Duration"}
              </span>
              <span className="font-mono text-[#70d6ff] text-base">{hours} h</span>
            </div>
            <input
              id="slider-hours"
              type="range"
              min="1"
              max="48"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="premium-slider text-[#70d6ff] w-full"
              style={{
                background: `linear-gradient(to right, #70d6ff 0%, #70d6ff ${hoursPct}%, #0e1118 ${hoursPct}%, #0e1118 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>1 h</span>
              <span>24 h</span>
              <span>48 h (2 {currentLocale === "es" ? "días" : "days"})</span>
            </div>
          </div>
        </div>

        {/* Right column: Outage report card */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle tech background grids */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

          <div>
            <span className="text-[#3affab]/70 font-mono text-[10px] uppercase block mb-1 font-bold">
              [ {currentLocale === "es" ? "ESTADÍSTICA DE PÉRDIDAS EN TIEMPO REAL" : "REAL-TIME IMPACT COSTING"} ]
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              {currentLocale === "es"
                ? "Basado en un índice estándar del 85% de ociosidad operativa durante la caída registrada."
                : "Standardized calculations apply an 85% core operating productivity loss index during network drop."}
            </p>

            <span className="text-neutral-300 text-xs font-semibold uppercase tracking-wider block mb-2">
              {currentLocale === "es" ? "Pérdida Financiera Estimada:" : "Projected Outage Loss:"}
            </span>
            
            {/* BIG loss number display */}
            <div className="text-4xl md:text-5xl font-mono font-bold text-red-500 tracking-tight flex items-baseline gap-1.5 py-2">
              <span>{displayLoss.toLocaleString()}</span>
              <span className="text-xl">€</span>
            </div>

            <div className="mt-4 flex items-center gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[11px] leading-snug">
              <span className="size-1.5 rounded-full bg-red-400 shrink-0"></span>
              {currentLocale === "es"
                ? "Este coste excede la tarifa media de soporte del Plan Platinum anual."
                : "This single outage cost exceeds our whole Platinum support plan year cost."}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {/* Custom Interactive Conversion Booking Button */}
            <button
              id="calculate-submit-audit"
              onClick={handleConversionClick}
              className="w-full flex items-center justify-center gap-2 bg-[#3affab] text-black py-3.5 px-4 rounded-xl font-bold hover:bg-white transition duration-350 cursor-pointer shadow-md text-xs sm:text-sm uppercase tracking-wider"
            >
              <ShieldCheck className="size-4" />
              {currentLocale === "es" ? "Evitar Este Riesgo - Auditoría Gratis" : "Request Free Security Remediation Plan"}
            </button>

            <button
              id="download-calculator-pdf"
              onClick={handleConversionClick}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 border border-white/5 text-neutral-300 hover:text-white py-3 px-4 rounded-xl text-xs font-bold hover:bg-neutral-850 transition duration-150 cursor-pointer uppercase"
            >
              <Download className="size-3.5 text-[#70d6ff]" />
              {currentLocale === "es" ? "Descargar Informe PDF Brecha" : "Download PDF Impact Report"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
