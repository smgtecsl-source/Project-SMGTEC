export interface LocalizedString {
  es: string;
  en: string;
}

export interface IndustrySolution {
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export interface IndustryConfig {
  slug: string;
  name: LocalizedString;
  headline: LocalizedString;
  description: LocalizedString;
  challenges: {
    es: string[];
    en: string[];
  };
  solutions: IndustrySolution[];
  compliance: string[];
  pricingCTA: LocalizedString;
  recommendedPackage?: LocalizedString;
}

export type Locale = "es" | "en";

export type ActivePage = "home" | "smarthands" | "servicios" | "calculadora" | "sobre-nosotros" | "legal";
