import { Locale } from "../types";
import { Globe, Sun, Moon, Briefcase } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  isLightTheme: boolean;
  toggleTheme: () => void;
  openContactModal: () => void;
}

export default function Navbar({
  currentLocale,
  setLocale,
  isLightTheme,
  toggleTheme,
  openContactModal
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", path: "/", label: { es: "inicio", en: "home" } },
    { id: "smarthands", path: "/soporte-tecnico", label: { es: "smart hands", en: "smart hands" } },
    { id: "servicios", path: "/tarifas-msp", label: { es: "planes msp", en: "msp plans" } },
    { id: "calculadora", path: "/auditoria-riesgo", label: { es: "auto-auditoría", en: "self-audit" } },
    { id: "portal", path: "/portal", label: { es: "portal clt", en: "client workspace" } },
  ];

  return (
    <nav
      id="floating-navbar"
      className="absolute top-14 left-0 right-0 z-40 px-4 sm:px-6 md:px-10 pt-4 flex items-center justify-between gap-3 w-full"
    >
      {/* Left Pill: Custom SVG Logo + Brand */}
      <button
        id="navbar-brand-logo"
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 bg-neutral-950/85 backdrop-blur-xl border border-white/10 rounded-full pl-3.5 pr-5 py-2.5 hover:border-white/25 transition duration-300 cursor-pointer text-left"
      >
        <svg
          viewBox="0 0 256 256"
          className="h-5 w-5 fill-[#3affab] transition-transform hover:rotate-12 duration-300"
          aria-hidden="true"
        >
          <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
        </svg>
        <span className="text-white text-base font-extrabold tracking-tighter uppercase select-none">
          smgtec
        </span>
      </button>

      {/* Center Pill: Desktop Navigation Links (Hidden on Mobile) */}
      <div
        id="navbar-center-pill"
        className="hidden md:flex items-center gap-1 bg-neutral-950/85 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-xl"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => navigate(item.path)}
              className={`text-xs uppercase tracking-wider font-bold px-4 py-1.5 rounded-full transition-all duration-300 select-none cursor-pointer ${
                isActive
                  ? "bg-[#3affab] text-black font-extrabold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label[currentLocale]}
            </button>
          );
        })}
      </div>

      {/* Right Controls Pill: Locale, Theme toggle & Main Call-To-Action Button */}
      <div id="navbar-right-controls" className="flex items-center gap-2">
        {/* Compact Utility Pill (locale + theme switcher) */}
        <div className="flex items-center gap-1.5 bg-neutral-950/85 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-xl">
          {/* Language Toggle Button */}
          <button
            id="toggle-locale-btn"
            onClick={() => setLocale(currentLocale === "es" ? "en" : "es")}
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-neutral-800 flex items-center justify-center cursor-pointer"
            title={currentLocale === "es" ? "Toggle to English" : "Cambiar a Español"}
          >
            <Globe className="size-4 text-[#70d6ff]" />
            <span className="text-[10px] uppercase ml-1 font-mono font-bold text-neutral-300">
              {currentLocale === "es" ? "en" : "es"}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="toggle-theme-btn"
            onClick={toggleTheme}
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-neutral-800 flex items-center justify-center cursor-pointer"
            title={isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightTheme ? <Moon className="size-4 text-sky-400" /> : <Sun className="size-4 text-amber-400" />}
          </button>
        </div>

        {/* Action Button: Get Free Audit */}
        <button
          id="cta-navbar-booking"
          onClick={openContactModal}
          className="bg-white hover:bg-[#3affab] text-black text-xs font-bold uppercase tracking-wider rounded-full px-5 py-2.5 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
        >
          {currentLocale === "es" ? "Reserva" : "book audit"}
        </button>
      </div>
    </nav>
  );
}
