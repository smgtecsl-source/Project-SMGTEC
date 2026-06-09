import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Locale } from "../types";
import { 
  KeyRound, LogOut, Shield, FileText, Send, Clock, User, Landmark, Mail, 
  Layers, Lock, Database, Wrench, Headphones, CircleAlert 
} from "lucide-react";
import { useState, FormEvent } from "react";

interface PortalProps {
  currentLocale: Locale;
}

interface Ticket {
  id: string;
  title: string;
  category: string;
  sla: string;
  status: "open" | "remediation" | "closed";
  created: string;
}

export default function Portal({ currentLocale }: PortalProps) {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  // Parse ID token to extract 'tid' (Tenant ID) claim
  const idTokenClaims: any = account?.idTokenClaims || {};
  const tenantIdClaim = idTokenClaims.tid || account?.tenantId || "organizations";

  /* 
    COMPLIANCE NOTE & FUTURE MAPPING PHASE (ARCHITECTURAL DELEGATION):
    The 'tid' (Tenant ID) claim extracted from the ID token claims will be utilized in
    the upcoming phase to match the client's session safely to their isolated database
    records, specific SIEM telemetry metrics, custom SLAs, and client-specific helpdesk tickets.
  */

  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Escala URGENTE");
  const [ticketsList, setTicketsList] = useState<Ticket[]>([
    {
      id: "TK-40291",
      title: "Auditoría de Cumplimiento RGPD Anual - Despacho Barcelona",
      category: "Seguridad y Compliance",
      sla: "SLA <4h",
      status: "remediation",
      created: "08/06/2026"
    },
    {
      id: "TK-39184",
      title: "Sustitución Switch Rack Principal Zona Franca",
      category: "Smart Hands IT",
      sla: "SLA <2h in-situ",
      status: "closed",
      created: "05/06/2026"
    }
  ]);

  const handleLogin = () => {
    // Attempt popup login or redirect
    instance.loginPopup({
      scopes: ["User.Read"],
      prompt: "select_account"
    }).catch((e) => {
      console.warn("Popup blocked, falling back to redirect", e);
      instance.loginRedirect({
        scopes: ["User.Read"]
      });
    });
  };

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: window.location.origin,
    }).catch(() => {
      instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    });
  };

  const createTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim()) return;

    const newTicket: Ticket = {
      id: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
      title: ticketTitle,
      category: ticketCategory,
      sla: "SLA <15m Telefónico Directo",
      status: "open",
      created: new Date().toLocaleDateString("es-ES")
    };

    setTicketsList(prev => [newTicket, ...prev]);
    setTicketTitle("");
  };

  return (
    <div id="azure-portal-integration-system" className="w-full space-y-8 max-w-6xl mx-auto">
      
      {/* 1. Unauthenticated State Landing */}
      <UnauthenticatedTemplate>
        <div 
          id="portal-signin-box" 
          className="max-w-md mx-auto bg-[#151a24] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#70d6ff]/5 rounded-full blur-[30px] pointer-events-none"></div>
          
          <div className="mx-auto size-14 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center">
            <KeyRound className="size-6 text-[#3affab]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#70d6ff] font-bold block">
              [ MICROSOFT ENTRA ID AUTHENTICATOR ]
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {currentLocale === "es" ? "Acceso Portal Clientes" : "Corporate Client Portal"}
            </h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              {currentLocale === "es"
                ? "Inicia sesión con tu cuenta corporativa de Active Directory / Office 365 de SMGTEC para auditar tus servidores y abrir incidencias críticas."
                : "Sign in with your enterprise Active Directory / Office 365 credentials to view security telemetry logs and submit SLA tickets."}
            </p>
          </div>

          <button
            id="microsoft-auth-popup-trigger"
            onClick={handleLogin}
            className="w-full bg-[#3affab] hover:bg-white text-black py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition duration-300 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Shield className="size-4" />
            {currentLocale === "es" ? "Iniciar Sesión corporativa" : "Corporate Active Directory LogIn"}
          </button>

          <p className="text-[9px] font-mono text-neutral-600 uppercase">
            [ SECURED VIA MICROSOFT MSAL ROUTE GUARD ]
          </p>
        </div>
      </UnauthenticatedTemplate>

      {/* 2. Authenticated State Dashboard */}
      <AuthenticatedTemplate>
        {account && (
          <div id="portal-secure-dashboard" className="space-y-8 animate-fadeIn text-left">
            
            {/* Top Navigation Session Banner */}
            <div className="bg-[#151a24] border border-white/10 rounded-2xl p-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="size-10 rounded-full bg-[#3affab]/15 border border-[#3affab]/35 flex items-center justify-center text-[#3affab] font-bold font-mono text-sm leading-none uppercase">
                  {account.name?.charAt(0) || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p id="entra-user-name" className="text-sm font-bold text-white font-sans leading-none">{account.name}</p>
                    <span className="font-mono text-[8px] text-[#3affab] uppercase px-1.5 py-0.5 bg-[#3affab]/10 border border-[#3affab]/20 rounded font-black select-none">
                      Authorized CLIENT
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <p id="entra-user-email" className="text-xs text-neutral-400 font-mono leading-none">{account.username}</p>
                    <span className="font-mono text-[8.5px] text-[#70d6ff] uppercase px-1.5 py-0.5 bg-[#70d6ff]/10 border border-[#70d6ff]/20 rounded select-none font-extrabold tracking-wide">
                      Tenant ID claim: {tenantIdClaim}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between w-full md:w-auto md:justify-end shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase block leading-none">SYSTEMS_SOCIETY</span>
                  <p className="font-mono text-[10px] text-neutral-350 font-bold leading-none mt-1 uppercase">[ Barcelona NOC Connected ]</p>
                </div>

                <button
                  id="entra-auth-logout-btn"
                  onClick={handleLogout}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/25 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition duration-200 shadow-md"
                >
                  <LogOut className="size-3.5" />
                  {currentLocale === "es" ? "Cerrar Sesión" : "Sign Out"}
                </button>
              </div>
            </div>

            {/* Main console content split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Interactive tickets submissions and lists */}
              <div className="lg:col-span-7 bg-[#151a24] border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans uppercase tracking-tight">
                      {currentLocale === "es" ? "Panel de Incidencias con SLA" : "Secure Helpdesk SLA Tickets"}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5 leading-snug">
                      {currentLocale === "es"
                        ? "Abre incidencias críticas. Nuestro equipo resolverá el caso de forma priorizada bajo contrato de penalización escrito."
                        : "Create responsive SLA dispatches directly. Systems senior engineers will pick up the case instantly."}
                    </p>
                  </div>

                  {/* Create Ticket Form */}
                  <form onSubmit={createTicket} className="bg-neutral-950 border border-white/5 rounded-2xl p-4 space-y-3.5">
                    <span className="font-mono text-[8px] text-[#70d6ff] uppercase tracking-widest block font-bold">
                      [ + NUEVO REQUERIMIENTO DIRECTO CON SLA ]
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-8">
                        <input
                          id="portal-ticket-title-input"
                          type="text"
                          required
                          value={ticketTitle}
                          onChange={(e) => setTicketTitle(e.target.value)}
                          placeholder={currentLocale === "es" ? "e.g. Caída de conexión fibra dual o bloqueo de servidor" : "Outage or server lock..."}
                          className="w-full bg-neutral-900 border border-white/5 rounded-xl py-2.5 px-4 text-xs text-white focus:border-[#3affab] outline-none"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <select
                          id="portal-ticket-cat-select"
                          value={ticketCategory}
                          onChange={(e) => setTicketCategory(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-neutral-350 font-bold outline-none cursor-pointer"
                        >
                          <option value="SLA <15 Min (Incidente Crítico)">{currentLocale === "es" ? "🔥 Crítico (<15m)" : "Critical (<15m)"}</option>
                          <option value="SLA <2 Horas (Smart Hands)">{currentLocale === "es" ? "🔧 In-Situ BCN (<2h)" : "In-Situ BCN (<2h)"}</option>
                          <option value="Suficiente (Atención <4h)">{currentLocale === "es" ? "💻 Estándar (<4h)" : "Standard (<4h)"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        id="portal-ticket-submit-btn"
                        className="bg-[#3affab] hover:bg-white text-black py-2 px-5 rounded-lg font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow"
                      >
                        <Send className="size-3" />
                        {currentLocale === "es" ? "Abrir Incidencia Directa" : "Trigger SLA Alert"}
                      </button>
                    </div>
                  </form>

                  {/* Registered tickets dashboard list */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                      [ HISTORIAL DE CASOS RECIENTES CORPORATIVAS ]
                    </span>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {ticketsList.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="bg-black/60 border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition hover:border-[#3affab]/20"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9.5px] text-[#3affab] font-bold">{ticket.id}</span>
                              <p className="text-xs font-bold text-white font-sans leading-none">{ticket.title}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-450 font-mono">
                              <span>{ticket.category}</span>
                              <span className="text-neutral-600">•</span>
                              <span className="text-neutral-400 font-bold">{ticket.sla}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-[9px] font-mono text-neutral-500">{ticket.created}</span>
                            <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold ${
                              ticket.status === "open"
                                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                                : ticket.status === "remediation"
                                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                                  : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                            }`}>
                              {ticket.status === "open" && (currentLocale === "es" ? "Abierto" : "Open")}
                              {ticket.status === "remediation" && (currentLocale === "es" ? "Remediación" : "Resolving")}
                              {ticket.status === "closed" && (currentLocale === "es" ? "Cerrado" : "Solved")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Secure document directories / directories panel */}
              <div className="lg:col-span-5 bg-neutral-950 border border-[#3affab]/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="space-y-6">
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#3affab] font-mono text-[10px] uppercase font-bold tracking-widest">
                      <Lock className="size-4 shrink-0" />
                      {currentLocale === "es" ? "Directorio Compartido Cifrado" : "Cryptographic Document Directory"}
                    </div>
                    <h3 className="text-lg font-bold text-white font-sans uppercase">
                      {currentLocale === "es" ? "Archivador de Sistemas Seguro" : "Legal Document directory"}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {currentLocale === "es"
                      ? "Repositorio seguro de alta fidelidad. Descarga tus acuerdos SLA firmados, informes mensuales del SOC e inventarios de activos IT vinculados."
                      : "Zero-Knowledge directory vault. Download your signed custom SLAs, monthly SIEM logs, and physical asset listings."}
                  </p>

                  {/* Document layout cards list */}
                  <div className="space-y-2.5 font-sans">
                    
                    {/* Doc 1 */}
                    <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-[#70d6ff]/35 transition">
                      <div className="flex items-center gap-2.5 max-w-[80%]">
                        <div className="size-8 rounded bg-[#70d6ff]/10 flex items-center justify-center shrink-0 text-[#70d6ff]">
                          <FileText className="size-4" />
                        </div>
                        <div className="truncate text-left">
                          <p className="text-xs font-bold text-white truncate">[FIRMA-SLA-SMGTEC]-CONTRATO.pdf</p>
                          <span className="text-[9px] text-neutral-500 font-mono">1.2 MB • Acuerdos SLA Garantizados</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[10px] text-[#3affab] hover:text-white font-mono uppercase font-bold shrink-0 select-none cursor-pointer"
                      >
                        [ LINK ]
                      </a>
                    </div>

                    {/* Doc 2 */}
                    <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-[#70d6ff]/35 transition">
                      <div className="flex items-center gap-2.5 max-w-[80%]">
                        <div className="size-8 rounded bg-[#3affab]/10 flex items-center justify-center shrink-0 text-[#3affab]">
                          <FileText className="size-4" />
                        </div>
                        <div className="truncate text-left">
                          <p className="text-xs font-bold text-white truncate">[REPORTE-SOC-MENSUAL]-AUDIT.pdf</p>
                          <span className="text-[9px] text-neutral-500 font-mono">4.8 MB • Telemetrías de Amenazas</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[10px] text-[#3affab] hover:text-white font-mono uppercase font-bold shrink-0 select-none cursor-pointer"
                      >
                        [ LINK ]
                      </a>
                    </div>

                    {/* Doc 3 */}
                    <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-[#70d6ff]/35 transition">
                      <div className="flex items-center gap-2.5 max-w-[80%]">
                        <div className="size-8 rounded bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
                          <FileText className="size-4" />
                        </div>
                        <div className="truncate text-left">
                          <p className="text-xs font-bold text-white truncate">[INVENTARIO-HARDWARE-ACTIVOS].xlsx</p>
                          <span className="text-[9px] text-neutral-500 font-mono">620 KB • Dispositivos Registrados</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[10px] text-[#3affab] hover:text-white font-mono uppercase font-bold shrink-0 select-none cursor-pointer"
                      >
                        [ LINK ]
                      </a>
                    </div>

                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-2 items-center text-[10px] text-neutral-500 font-mono select-none">
                  <Database className="size-3.5 text-[#3affab]" />
                  <span>SECURE_STORAGE_CONTAINER_V3</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </AuthenticatedTemplate>

    </div>
  );
}
