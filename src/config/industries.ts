import { IndustryConfig } from "../types";

export const industriesConfig: IndustryConfig[] = [
  {
    slug: "legal",
    name: { es: "Despachos de Abogados", en: "Law Firms & Legal" },
    headline: {
      es: "Soporte IT y Ciberseguridad Gestionada para Despachos de Abogados en Barcelona.",
      en: "Managed IT Support & Cybersecurity for Law Firms in Barcelona."
    },
    description: {
      es: "Protegemos la confidencialidad de tus clientes con sistemas IT adaptados al estricto cumplimiento de la LOPDGDD y planes de ciberseguridad avanzada.",
      en: "Protect client data confidentiality with robust IT infrastructure built specifically for strict legal compliance, security standards, and rapid user support."
    },
    challenges: {
      es: [
        "Pérdida de horas facturables debido a caídas de sistema o lentitud.",
        "Riesgo de sanciones graves por incumplimiento de confidencialidad y RGPD/LOPDGDD.",
        "Fugas de datos en el intercambio de archivos confidenciales con clientes y juzgados."
      ],
      en: [
        "Loss of billable hours due to system downtime or performance latency.",
        "Risk of heavy penalties from confidentiality breaches and GDPR/LOPDGDD non-compliance.",
        "Data leaks during secure document exchange with clients and court records."
      ]
    },
    solutions: [
      {
        title: { es: "Soporte Inmediato con SLA Garantizado", en: "SLA-Backed Immediate Support" },
        description: {
          es: "Tiempo de respuesta de menos de 15 minutos para problemas críticos para proteger cada hora facturable.",
          en: "Guaranteed response time under 15 minutes for critical issues to safeguard billable hours."
        },
        icon: "Clock"
      },
      {
        title: { es: "Cumplimiento Normativo Integrado", en: "Integrated Regulatory Compliance" },
        description: {
          es: "Adaptación completa a la RGPD/LOPDGDD con auditorías periódicas y cifrado de datos extremo a extremo.",
          en: "Full alignment with European GDPR/LOPDGDD standards via scheduled audits and endpoint encryption."
        },
        icon: "Shield"
      },
      {
        title: { es: "Salas de Datos Seguras", en: "Secure Virtual Data Rooms" },
        description: {
          es: "Configuración de almacenamiento en la nube cifrado para compartir expedientes con total confidencialidad.",
          en: "Encrypted cloud storage structures configured for secure client docket exchanges with bulletproof credentials."
        },
        icon: "Database"
      }
    ],
    compliance: ["RGPD", "LOPDGDD", "ISO 27001", "ENS"],
    pricingCTA: {
      es: "Solicitar Propuesta para Despachos",
      en: "Request Bespoke Firm Proposal"
    },
    recommendedPackage: {
      es: "Recomendado: Plan Gold (para despachos medianos) o Platinum (para firmas corporativas)",
      en: "Recommended: Gold Plan (for mid-sized firms) or Platinum Suite (for enterprise partners)"
    }
  },
  {
    slug: "healthcare",
    name: { es: "Salud y Clínicas", en: "Healthcare & Clinics" },
    headline: {
      es: "Infraestructura Segura para Sanidad e Historias Clínicas",
      en: "Secure & Resilient Infrastructure for Medical Practices"
    },
    description: {
      es: "Garantizamos la disponibilidad de datos de pacientes en tiempo real protegiendo la privacidad de los historiales clínicos electrónicos de forma robusta.",
      en: "Deliver real-time clinical system availability while keeping electronic health records strictly secured and private."
    },
    challenges: {
      es: [
        "Robo de historiales médicos o datos personales sensibles.",
        "Inactividad de plataformas de gestión de citas y fichas de pacientes.",
        "Falta de auditorías periódicas requeridas por normativas catalanas y españolas de salud."
      ],
      en: [
        "Siphoning of high-value patient health files and records.",
        "Technical service disruption holding back patient intake & check-up streams.",
        "Lack of specialized healthcare dynamic compliance audits."
      ]
    },
    solutions: [
      {
        title: { es: "Acceso Zero-Trust", en: "Zero-Trust Medical Access" },
        description: {
          es: "Garantía de control biométrico y doble factor (MFA) para médicos y enfermeros en el acceso a historiales.",
          en: "Enforcing dual-factor access protocols for nurses, labs, and physicians accessing medical files."
        },
        icon: "Lock"
      },
      {
        title: { es: "Mantenimiento Preventivo", en: "24/7 Endpoint Maintenance" },
        description: {
          es: "Auditoría en tiempo real de terminales y soporte in-situ veloz en centros hospitalarios de Barcelona.",
          en: "Continuous health checks and swift local IT replacement dispatch for medical hardware."
        },
        icon: "Activity"
      }
    ],
    compliance: ["ENS", "LOPDGDD", "RGPD", "HIPAA Reference"],
    pricingCTA: {
      es: "Contactar Especialista Sanitario",
      en: "Contact Healthcare Specialist"
    }
  },
  {
    slug: "fintech",
    name: { es: "Finanzas y Fintech", en: "Fintech & Financial" },
    headline: {
      es: "Seguridad y Rendimiento de Grado Bancario para Fintech",
      en: "Bank-Grade Security and Low Latency for Fintechs"
    },
    description: {
      es: "Cumple las normativas de PCI-DSS, PSD2 y el estándar ENS con nuestra arquitectura de sistemas y parches automáticos redundantes.",
      en: "Comply with PCI-DSS, PSD2, and strict European requirements using our zero-trust system engineering and automated patching."
    },
    challenges: {
      es: [
        "Amenazas persistentes de phishing y ataques de inyección SQL.",
        "Sanciones financieras severas por brechas de datos de transacciones.",
        "Sistemas lentos que degradan la experiencia de compra de los usuarios."
      ],
      en: [
        "Targeted phishing campaigns and SQL-injection attempts.",
        "Severe penalties for breach of transactional and credit data.",
        "Core database lag degrading customer checkout/account speeds."
      ]
    },
    solutions: [
      {
        title: { es: "Shield de Ciberseguridad", en: "SOC SIEM Shielding" },
        description: {
          es: "Monitorización SOC/MDR 24/7/365 con aislamiento de redes y respuesta ante incidentes instantánea.",
          en: "Continuous threat detection and automated endpoint quarantine upon any anomalous behavior detection."
        },
        icon: "Activity"
      },
      {
        title: { es: "Alta Disponibilidad Cloud", en: "Multi-Zone High Availability" },
        description: {
          es: "Clustering Kubernetes e infraestructura multizona automatizada con copias por minuto.",
          en: "High availability Docker or Kubernetes clustering paired with real-time geographical backup vaults."
        },
        icon: "Layers"
      }
    ],
    compliance: ["PCI-DSS", "PSD2", "ENS", "RGPD"],
    pricingCTA: {
      es: "Solicitar Auditoría Finanzas",
      en: "Schedule Financial Audit"
    }
  },
  {
    slug: "manufacturing",
    name: { es: "Industria y Logística", en: "Manufacturing & Logistics" },
    headline: {
      es: "Sistemas IT Continuos para Plantas de Producción Industrial",
      en: "Zero-Downtime Operations for Industrial Factories & Yards"
    },
    description: {
      es: "Evitamos costosos paros de las líneas de embalaje y producción con planes preventivos BCDR, monitorización IoT y soporte Smart Hands in-situ.",
      en: "Stop costly line stoppages on factory floors with proactive physical checks, local Barcelona dispatch, and industrial backups."
    },
    challenges: {
      es: [
        "Inactividad imprevista en el software ERP/MES que congela la carga de camiones.",
        "Ataques de malware a sistemas legacy mal protegidos.",
        "Retrasos severos en la sustitución de servidores rack en zonas industriales (Zona Franca, Vallès)."
      ],
      en: [
        "Unplanned ERP/SCADA offline periods freezing cargo dispatches.",
        "Unpatched old OT/IT machinery vulnerable to malware.",
        "Hours of delay waiting for computer repairs in industrial parks around Barcelona."
      ]
    },
    solutions: [
      {
        title: { es: "Smart Hands 2-Hour SLA", en: "2-Hour SLA Local Hands" },
        description: {
          es: "Envío urgente de ingenieros a plantas industriales para sustitución de switches u ordenadores de control.",
          en: "Rapid on-location dispatch to factories for hardware replacements and network cable management."
        },
        icon: "Wrench"
      },
      {
        title: { es: "Inmunidad ante Ransomware", en: "Ransomware Vaulting" },
        description: {
          es: "Solución inmutable que asegura que tus planos e inventarios estén blindados frente al malware.",
          en: "Immutable storage architectures that lock master files safely against active ransomware execution."
        },
        icon: "Lock"
      }
    ],
    compliance: ["ISO 27001", "NIS2 Directive", "RGPD"],
    pricingCTA: {
      es: "Consultar Cobertura Industrial",
      en: "Consult Factory Range"
    }
  },
  {
    slug: "startups",
    name: { es: "Startups de Producto", en: "SaaS & Product Startups" },
    headline: {
      es: "Velocidad de Escala y Ciberseguridad para Startups en Barcelona",
      en: "Scale Instantly with Secured Infrastructure and Expert Devops"
    },
    description: {
      es: "Te permitimos centrarte en tu código mientras nosotros nos encargamos del SOC, parches, cuentas de Microsoft 365, auditorías de clientes corporativos y SOC2.",
      en: "Scale your SaaS features while we govern SOC threat hunting, AWS/M365 accounts, and compliance assessments."
    },
    challenges: {
      es: [
        "Bloqueo en ventas enterprise por falta de certificaciones de seguridad o respuestas al cuestionario de riesgos.",
        "Robo de credenciales de repositorios y entornos de producción cloud.",
        "Gasto de tiempo de ingenieros clave en tareas de helpdesk o configuración de portátiles nuevos."
      ],
      en: [
        "Losing high-value Enterprise accounts due to unanswered IT risk surveys.",
        "Accidental GitHub or AWS credential leaks stalling funding rounds.",
        "Senior developer hours wasted setting up employee laptops and SSO pools."
      ]
    },
    solutions: [
      {
        title: { es: "Preparación SOC2 y ENS", en: "SOC2 & ENS Enablement" },
        description: {
          es: "Aceleramos tu camino a la conformidad documentando redes, seguridad de endpoints y flujos de datos.",
          en: "Fast-track and audit your firm's security postures to win complex public & corporate deals."
        },
        icon: "CheckCircle"
      },
      {
        title: { es: "Soporte IT Delegado", en: "Delegated IT-as-a-Service" },
        description: {
          es: "Asistencia directa a usuarios y automatización del Onboarding mediante sistemas MDM eficientes.",
          en: "Direct team helpdesk, password resets, and bulletproof laptop MDM setups before shipment."
        },
        icon: "Headphones"
      }
    ],
    compliance: ["RGPD", "ENS Categoría Media", "ISO 27001"],
    pricingCTA: {
      es: "Consultar Acuerdo de Escala Startup",
      en: "Inquire Custom Startup SLA"
    }
  },
  {
    slug: "retail",
    name: { es: "Retail y Franquicias", en: "Retail & Multi-franchise" },
    headline: {
      es: "TPVs e Inventarios Conectados y Protegidos 24/7/365",
      en: "Connected POS & Real-Time Logistics Protection"
    },
    description: {
      es: "Garantizamos que tus terminales de venta (TPV) cobren sin interrupción y que tu stock esté siempre sincronizado de forma segura.",
      en: "Protect checkout counters from crashing during high-volume sales days while optimizing multi-location local networks."
    },
    challenges: {
      es: [
        "Caídas de conexión a internet o de red local que imposibilitan el cobro con tarjeta.",
        "Ataques de malware a terminales de pago locales.",
        "Falta de supervisión de red inalámbrica para clientes en tienda."
      ],
      en: [
        "Local router failure blocking card terminal acquisitions.",
        "POS device malware or local credential harvesting.",
        "Insecure guest Wi-Fi exposing internal inventory segments."
      ]
    },
    solutions: [
      {
        title: { es: "Red de Backup Celular 4G/5G", en: "Multi-Carrier Cellular failover" },
        description: {
          es: "Conmutación por error automática para que sigas cobrando si el cable de fibra se corta.",
          en: "Redundant cellular fallbacks ensuring infinite uptime upon physical fiber disconnection."
        },
        icon: "Tv"
      },
      {
        title: { es: "Soporte Multitienda Express", en: "Express Multi-Store IT Dispatch" },
        description: {
          es: "Técnicos calificados para resolver problemas de red locales en tiendas físicas en menos de 2h.",
          en: "Proactive local maintenance routing and urgent hardware replacement across Barcelona storefronts."
        },
        icon: "Sparkles"
      }
    ],
    compliance: ["PCI-DSS", "RGPD", "LOPDGDD"],
    pricingCTA: {
      es: "Solicitar Plan Comercial",
      en: "Inquire Retail Program"
    }
  },
  {
    slug: "tourism",
    name: { es: "Turismo y Hotelería", en: "Tourism & Hospitality" },
    headline: {
      es: "Sistemas IT Continuos para Cadenas Hoteleras y Portales Turísticos",
      en: "Always-On High Availability IT for Hotels & Tourism Groups"
    },
    description: {
      es: "Garantizamos conexiones Wi-Fi ultra-estables para huéspedes, sistemas PMS en la nube blindados y monitorización proactiva de sistemas de reserva v2.",
      en: "Ensure bulletproof guest Wi-Fi networks, robust PMS security, and high-availability digital booking databases."
    },
    challenges: {
      es: [
        "Caídas de red que paralizan el check-in y check-out de huéspedes.",
        "Fugas de datos de tarjetas de crédito y perfiles personales en el ecosistema de reservas PMS.",
        "Mala cobertura de Wi-Fi de cortesía que genera reseñas negativas de clientes."
      ],
      en: [
        "Network downtime stalling user front-desk check-in streams.",
        "PCI-DSS data exposure of guest credit cards via vulnerable channel managers.",
        "Subpar wireless coverage provoking negative digital reviews."
      ]
    },
    solutions: [
      {
        title: { es: "Soporte Wi-Fi de Alta Densidad", en: "High-Density Guest Wi-Fi" },
        description: {
          es: "Garantía de conectividad robusta de cortesía con aislamiento de redes IoT y tráfico público.",
          en: "Advanced hardware deployment guaranteeing reliable wireless connections segregated from backoffice services."
        },
        icon: "Tv"
      },
      {
        title: { es: "Integración PMS Zero-Trust", en: "Secure Cloud PMS Integration" },
        description: {
          es: "Aseguramos los canales de reservas y los accesos administrativos al software operativo principal.",
          en: "Safeguard room keys, booking nodes, and CRM integrations from unauthorized administrative entry."
        },
        icon: "Lock"
      }
    ],
    compliance: ["PCI-DSS", "RGPD", "ISO 27001"],
    pricingCTA: {
      es: "Consultar Plan Hotelero",
      en: "Inquire Digital Hotel Program"
    },
    recommendedPackage: {
      es: "Recomendado: Plan Gold (Soporte Express 24/7 de Guardia)",
      en: "Recommended: Gold SLA (24/7 Critical On-Call Assist)"
    }
  },
  {
    slug: "energy",
    name: { es: "Energía y Utilities", en: "Energy & Utilities" },
    headline: {
      es: "Ciberseguridad OT e Infraestructuras Críticas de Energía",
      en: "Industrial OT Cybersecurity & IT Maintenance for Energy Providers"
    },
    description: {
      es: "Protegemos tus redes SCADA, alineamos tus activos con la directiva NIS2 y damos soporte 24/7 a ingenieros de campo en plantas solares y eólicas.",
      en: "Defend SCADA pipelines, comply with strict NIS2 directives, and deliver expert maintenance to remote energy grids."
    },
    challenges: {
      es: [
        "Infiltraciones silenciosas en redes operativas OT comprometiendo controladores lógicos programables.",
        "Incumplimiento de la nueva directiva europea NIS2 contra sabotajes.",
        "Desconexión de telemetría crítica en plantas renovables aisladas."
      ],
      en: [
        "Silent intrusions in SCADA operational technology pipelines compromising PLC setups.",
        "Strict NIS2 regulatory non-compliance leading to massive liabilities.",
        "Telemetry drops and sensor communication failures in remote wind or solar projects."
      ]
    },
    solutions: [
      {
        title: { es: "Auditoría y Plan NIS2 Industrial", en: "NIS2 Cybersecurity Engineering" },
        description: {
          es: "Ejecutamos planes proactivos y marcos defensivos alineados a la normativa gubernamental europea.",
          en: "Formulate risk frameworks and secure access blueprints conforming to the latest Critical Infrastructure alerts."
        },
        icon: "ShieldAlert"
      },
      {
        title: { es: "Telemetría y Enlaces Redundantes", en: "Remote Telemetry Hardening" },
        description: {
          es: "Despliegue de pasarelas VPN de alta tolerancia y enlaces satelitales auxiliares para telemetría.",
          en: "Configure resilient encrypted tunnels and multi-satellite fallbacks to stream sensor registers securely."
        },
        icon: "Database"
      }
    ],
    compliance: ["NIS2 Directive", "ISO 27001", "ENS"],
    pricingCTA: {
      es: "Consultar Ingeniero OT",
      en: "Contact Utility Specialist"
    },
    recommendedPackage: {
      es: "Recomendado: Plan Platinum (SLA de Ciberrespuesta 15m y Auditoría NIS2)",
      en: "Recommended: Platinum Enterprise (15m Cyber-Response & NIS2 Audit)"
    }
  }
];
