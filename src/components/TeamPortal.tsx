import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Locale } from "../types";
import { 
  KeyRound, LogOut, Shield, FileText, Clock, User, Mail, 
  Lock, Database, Wrench, CircleAlert, Terminal, Activity, Cpu, Server, AlertTriangle
} from "lucide-react";
import { useState } from "react";

interface TeamPortalProps {
  currentLocale: Locale;
}

interface IncidentLog {
  id: string;
  client: string;
  title: string;
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  node: string;
  status: "dispatching" | "mitigated" | "investigating";
  timestamp: string;
}

export default function TeamPortal({ currentLocale }: TeamPortalProps) {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  // Enforce the organizational domain rule
  const isAuthorized = account?.username?.toLowerCase().endsWith("@smgtec.es");

  const [activeTab, setActiveTab] = useState<"telemetry" | "incidents">("telemetry");
  const [incidents, setIncidents] = useState<IncidentLog[]>([
    {
      id: "INC-88392",
      client: "Despacho BCN Legal",
      title: "Fiber Interface Flapping - Switch A2",
      priority: "CRITICAL",
      node: "ZONA-FRANCA-EQX",
      status: "dispatching",
      timestamp: "Just now"
    },
    {
      id: "INC-88204",
      client: "Vueling Logistics Partner",
      title: "Active Directory Replication Latency",
      priority: "HIGH",
      node: "AWS-EU-WEST-3",
      status: "investigating",
      timestamp: "14 mins ago"
    },
    {
      id: "INC-88119",
      client: "Sovereign Health BCN",
      title: "Weekly Cold Backup Cycle Validation",
      priority: "NORMAL",
      node: "LOCAL-SAN-01",
      status: "mitigated",
      timestamp: "2 hours ago"
    }
  ]);

  const handleLogin = () => {
    // Initiate pop-up login configured for single tenant (team portal config)
    instance.loginPopup({
      scopes: ["User.Read"],
      prompt: "select_account",
      // Guide Azure Entra to prefer matching domain
      domainHint: "smgtec.es"
    }).catch((e) => {
      console.warn("Popup blocked, falling back to redirect auth flow", e);
      instance.loginRedirect({
        scopes: ["User.Read"],
        domainHint: "smgtec.es"
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

  return (
    <div id="azure-team-integration-system" className="w-full space-y-8 max-w-6xl mx-auto">
      
      {/* 1. Unauthenticated Gateway Entry */}
      <UnauthenticatedTemplate>
        <div 
          id="team-signin-box" 
          className="max-w-md mx-auto bg-[#0c0e14] border border-[#ff5b79]/20 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b79]/5 rounded-full blur-[30px] pointer-events-none"></div>
          
          <div className="mx-auto size-14 rounded-2xl bg-neutral-900 border border-neutral-850 flex items-center justify-center">
            <Terminal className="size-6 text-[#ff5b79]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff5b79] font-bold block">
              [ SECURE INTERNAL CONSOLE GATEWAY ]
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {currentLocale === "es" ? "Consola de Operaciones SMGTEC" : "Team Ops Console"}
            </h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              {currentLocale === "es"
                ? "Portal restringido para ingenieros y administradores de SMGTEC. Se requiere una cuenta organizacional @smgtec.es para conectarse."
                : "Restricted developer portal. Single-Sign-On is bound entirely to authorized @smgtec.es directory accounts."}
            </p>
          </div>

          <button
            id="microsoft-team-auth-trigger"
            onClick={handleLogin}
            className="w-full bg-[#ff5b79] hover:bg-white text-black py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition duration-300 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Shield className="size-4" />
            {currentLocale === "es" ? "Acceso Ingeniero SMGTEC" : "Authenticate SMGTEC Account"}
          </button>

          <p className="text-[9px] font-mono text-neutral-600 uppercase">
            [ AUTHORITY: SINGLE-TENANT AD / SMGTEC.ONMICROSOFT.COM ]
          </p>
        </div>
      </UnauthenticatedTemplate>

      {/* 2. Authenticated State Portal Display */}
      <AuthenticatedTemplate>
        {account && (
          !isAuthorized ? (
            /* SECURITY SCREEN: Authenticated but Domain is Unauthorized */
            <div 
              id="team-access-denied"
              className="max-w-lg mx-auto bg-[#0a0c12] border border-red-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl"
            >
              <div className="mx-auto size-16 rounded-full bg-red-500/15 flex items-center justify-center text-red-500 animate-pulse">
                <AlertTriangle className="size-8" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-red-500 font-bold block">
                  [ ERR_ACCESS_DENIED ]
                </span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {currentLocale === "es" ? "Dominio No Autorizado" : "Domain Access Level Error"}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {currentLocale === "es" ? (
                    <>
                      Has iniciado sesión como <span className="text-red-400 font-mono font-bold">{account.username}</span>. El portal interno de operaciones requiere un dominio corporativo <span className="text-[#ff5b79] font-mono font-bold">@smgtec.es</span> para delegar privilegios.
                    </>
                  ) : (
                    <>
                      Authenticated session for <span className="text-red-400 font-mono font-bold">{account.username}</span> does not conform to enterprise active directory bindings. Only <span className="text-[#ff5b79] font-mono font-bold">@smgtec.es</span> users are mapped.
                    </>
                  )}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-white text-black py-3 px-4 rounded-xl text-xs font-bold uppercase transition"
                >
                  {currentLocale === "es" ? "Salir / Cambiar Cuenta" : "Sign Out / Switch Identity"}
                </button>
                <a
                  href="/"
                  className="w-full bg-neutral-900 border border-neutral-800 text-neutral-300 py-3 px-4 rounded-xl text-xs font-bold uppercase block text-center hover:bg-neutral-800 transition"
                >
                  {currentLocale === "es" ? "Volver a la Web" : "Back to Landing"}
                </a>
              </div>
            </div>
          ) : (
            /* SUCCESS: Authorized internal Engineer dashboard */
            <div id="team-secure-dashboard" className="space-y-8 animate-fadeIn text-left">
              
              {/* Top Admin Navigation Header */}
              <div className="bg-[#0c0e14] border border-[#ff5b79]/20 rounded-2xl p-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="size-10 rounded-full bg-[#ff5b79]/15 border border-[#ff5b79]/35 flex items-center justify-center text-[#ff5b79] font-bold font-mono text-sm leading-none uppercase">
                    {account.name?.charAt(0) || "E"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white font-sans leading-none">{account.name}</p>
                      <span className="font-mono text-[8px] text-[#ff5b79] uppercase px-1.5 py-0.5 bg-[#ff5b79]/10 border border-[#ff5b79]/20 rounded font-black select-none">
                        SMGTEC INTERNAL STAFF
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{account.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between w-full md:w-auto md:justify-end shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-[9px] text-[#ff5b79] uppercase block leading-none">ROLE: SYSTEM_LEVEL_ROOT</span>
                    <p className="font-mono text-[10px] text-neutral-350 font-bold leading-none mt-1 uppercase">[ Barcelona NOC HQ Command ]</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/25 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition duration-200 shadow-md"
                  >
                    <LogOut className="size-3.5" />
                    {currentLocale === "es" ? "Cerrar Sesión" : "Sign Out"}
                  </button>
                </div>
              </div>

              {/* Core Tabs Menu */}
              <div className="flex gap-2.5 border-b border-white/5 pb-1">
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold border-b-2 transition ${
                    activeTab === "telemetry"
                      ? "border-[#ff5b79] text-[#ff5b79]"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  [ Telemetría de Infraestructura ]
                </button>
                <button
                  onClick={() => setActiveTab("incidents")}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold border-b-2 transition ${
                    activeTab === "incidents"
                      ? "border-[#ff5b79] text-[#ff5b79]"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  [ Incidencias Clientes ({incidents.length}) ]
                </button>
              </div>

              {/* Tab Display Area */}
              {activeTab === "telemetry" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left panel: active node stats */}
                  <div className="lg:col-span-7 bg-[#0c0e14] border border-white/5 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-[#ff5b79] uppercase tracking-widest block font-bold">
                        [ NETWORK CORE GATEWAY METRICS ]
                      </span>
                      <h3 className="text-lg font-bold text-white font-sans uppercase">
                        Soberanía de Red e Interfaces IPS/IDS
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Stat 1 */}
                      <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 text-center">
                        <Cpu className="size-5 text-[#ff5b79] mx-auto mb-1" />
                        <span className="text-xl font-mono font-bold text-white block">31.4%</span>
                        <span className="text-[9px] uppercase font-mono text-neutral-500">Node Load Average</span>
                      </div>
                      {/* Stat 2 */}
                      <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 text-center">
                        <Activity className="size-5 text-emerald-400 mx-auto mb-1" />
                        <span className="text-xl font-mono font-bold text-emerald-400 block">99.998%</span>
                        <span className="text-[9px] uppercase font-mono text-neutral-500">Direct Fiber SLA</span>
                      </div>
                      {/* Stat 3 */}
                      <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 text-center">
                        <Server className="size-5 text-sky-400 mx-auto mb-1" />
                        <span className="text-xl font-mono font-bold text-white block">2,492 / s</span>
                        <span className="text-[9px] uppercase font-mono text-neutral-500">Encrypted DNS Queries</span>
                      </div>
                    </div>

                    <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 space-y-3 font-mono text-[11px] text-neutral-400 leading-relaxed">
                      <p className="font-bold text-white border-b border-white/5 pb-1 uppercase tracking-wider text-[10px] text-[#ff5b79]">
                        [ AD Directory & Config Context ]
                      </p>
                      <div className="space-y-1">
                        <p><strong>Config Authority:</strong> https://login.microsoftonline.com/SMGTEC.onmicrosoft.com</p>
                        <p><strong>Client App ID:</strong> {(import.meta as any).env.VITE_MSAL_CLIENT_ID_TEAM || "BOUND-TEAM-TOKEN"}</p>
                        <p><strong>Tenant AD Claim (TID):</strong> {account.tenantId}</p>
                        <p><strong>Login Scope Session:</strong> User.Read (Azure AD Enterprise)</p>
                      </div>
                    </div>
                  </div>

                  {/* Right panel: directory mapping and telemetry states */}
                  <div className="lg:col-span-5 bg-[#0a0c12] border border-[#ff5b79]/20 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                    <span className="absolute top-0 right-0 p-3 font-mono text-[7vw] sm:text-[9px] text-[#ff5b79]/10 select-none font-bold uppercase">
                      SECURE_ZONE_BCN
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#ff5b79] font-mono text-[10px] uppercase font-bold tracking-widest">
                        <Lock className="size-4 shrink-0" />
                        NOC Firewalls Logs
                      </div>
                      <h3 className="text-base font-bold text-white font-sans uppercase">
                        Sovereign Infrastructure Protection
                      </h3>
                    </div>

                    <div className="space-y-2.5 font-mono text-[10px]">
                      <div className="p-2.5 bg-neutral-900 border border-white/5 rounded-lg flex justify-between select-none items-center">
                        <div className="flex gap-2 items-center">
                          <span className="size-2 rounded-full bg-[#ff5b79] animate-pulse"></span>
                          <span className="text-white">IP BLOCKED (Spamhaus Match)</span>
                        </div>
                        <span className="text-neutral-500">188.192.4.92 • 1s ago</span>
                      </div>

                      <div className="p-2.5 bg-neutral-900 border border-white/5 rounded-lg flex justify-between select-none items-center">
                        <div className="flex gap-2 items-center">
                          <span className="size-2 rounded-full bg-emerald-400"></span>
                          <span className="text-white">Backups Loop Synchronized</span>
                        </div>
                        <span className="text-neutral-500">Sovereign Vault • 4m ago</span>
                      </div>

                      <div className="p-2.5 bg-neutral-900 border border-white/5 rounded-lg flex justify-between select-none items-center">
                        <div className="flex gap-2 items-center">
                          <span className="size-2 rounded-full bg-sky-400"></span>
                          <span className="text-white">BGP Direct Route Swapped</span>
                        </div>
                        <span className="text-neutral-500">Equinix BCN1 • 12m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* INCIDENTS VIEW: Display open SLA problems with BCN dispatch tags */
                <div className="space-y-4 max-w-4xl bg-[#0c0e14] border border-white/5 rounded-3xl p-6 shadow-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase font-sans">
                      Active Customer Incidents (Escalation & NOC dispatch)
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Case status monitored directly with guaranteed remediation compensation clauses.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {incidents.map((inc) => (
                      <div 
                        key={inc.id}
                        className="bg-black border border-neutral-850 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#ff5b79]/20 transition duration-300"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#ff5b79] font-bold">{inc.id}</span>
                            <span className="text-[10px] font-mono uppercase bg-[#ff5b79]/10 border border-[#ff5b79]/20 font-bold px-1.5 py-0.5 rounded text-[#ff5b79]">
                              {inc.priority}
                            </span>
                            <p className="text-sm font-bold text-white font-sans">{inc.title}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] text-neutral-450">
                            <span className="text-[#3affab] font-bold">{inc.client}</span>
                            <span>•</span>
                            <span>Node: {inc.node}</span>
                            <span>•</span>
                            <span className="text-neutral-500">{inc.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-auto">
                          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded font-black ${
                            inc.status === "dispatching"
                              ? "bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse"
                              : inc.status === "investigating"
                                ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                                : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                          }`}>
                            {inc.status === "dispatching" && "Dispatching engineer"}
                            {inc.status === "investigating" && "Investigating"}
                            {inc.status === "mitigated" && "Mitigated"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )
        )}
      </AuthenticatedTemplate>

    </div>
  );
}
