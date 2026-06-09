import { Locale } from "../types";

export const WHATSAPP_CONFIG = {
  // Pure digits-only Spanish format for absolute API links (no '+' or spaces)
  phoneNumber: "334655729113",
  
  // Clean formatted representation for humans
  displayName: "+34 655 72 91 13",

  tooltipText: {
    es: {
      title: "Atención al Cliente",
      desc: "Chatea con nuestro equipo comercial y de soporte hoy.",
      cta: "WhatsApp Directo",
      hoverCue: "HABLAR CON VENTAS"
    },
    en: {
      title: "Customer Support",
      desc: "Connect directly with our sales & support team today.",
      cta: "WhatsApp Direct",
      hoverCue: "TALK TO SALES"
    }
  },

  messageText: {
    es: "Hola SMGTEC. He estado revisando vuestros servicios y me gustaría hablar con vuestro equipo de atención al cliente y soporte sobre una consulta para mi empresa.",
    en: "Hello SMGTEC. I'm exploring your managed services and would like to chat with your sales and customer support regarding services for my firm."
  }
};
