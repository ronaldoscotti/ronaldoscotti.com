export type Language = "pt-BR" | "en";

export interface NavLink {
  href: string;
  label: string;
}

export interface Job {
  role: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface Project {
  name: string;
  description: string;
  links: { label: string; url: string }[];
  image?: string;
}

export interface Translations {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };

  nav: {
    links: NavLink[];
    resume: string;
    skipToContent: string;
    switchLabel: string;
    theme: { toDark: string; toLight: string };
  };

  hero: {
    role: string;
    name: string;
    tagline: string;
    intro: string;
    photoAlt: string;
  };

  about: {
    heading: string;
    body: string;
  };

  activity: {
    heading: string;
    /** Template with {total} and {days} placeholders. */
    contributions: string;
    languagesHeading: string;
    otherLanguages: string;
    stackHeading: string;
    stack: string[];
    updated: string;
  };

  experience: {
    heading: string;
    /** Usa {years}, calculado a partir de CAREER_START. */
    intro: string;
    resumeCta: string;
    jobs: Job[];
    educationHeading: string;
    education: string[];
  };

  projects: {
    heading: string;
    intro: string;
    items: Project[];
  };

  writing: {
    heading: string;
    intro: string;
    more: string;
    archive: string;
    badge: string;
    /** Shown only on the EN page: the archive is in Portuguese. */
    languageNote?: string;
    languageTag?: string;
  };

  contact: {
    heading: string;
    email: string;
    links: { label: string; url: string }[];
    location: string;
  };

  footer: {
    motto: string;
  };

  schema: {
    jobTitle: string;
    description: string;
    knowsAbout: string[];
  };
}
