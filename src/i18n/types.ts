export type Language = 'pt-BR' | 'en';

export interface NavLink {
  href: string;
  label: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  name: string;
  url: string;
  description: string;
  image: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface Translations {
  // SEO metadata
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };

  // Navigation
  nav: {
    links: NavLink[];
    contactButton: string;
    contactHref: string;
  };

  // Hero section
  hero: {
    heading: string;
    subheading: string;
  };

  // Problems section
  problems: {
    heading: string;
    description: string;
    closingStatement: string;
    scenarios: string[];
  };

  // Journey section
  journey: {
    heading: string;
    timeline: TimelineItem[];
  };

  // Clients section
  clients: {
    heading: string;
  };

  // Projects section
  projects: {
    heading: string;
    subtitle: string;
    intro: string;
    items: Project[];
  };

  // Services section
  services: {
    heading: string;
    intro: string;
    items: Service[];
  };

  // Contact section
  contact: {
    heading: string;
    description: string;
    whatsappButton: string;
    contactInfo: string;
    motto: string;
  };

  // Schema markup
  schema: {
    person: {
      jobTitle: string;
      description: string;
    };
    website: {
      name: string;
      description: string;
    };
    professionalService: {
      name: string;
      description: string;
      catalogName: string;
      offers: Array<{
        name: string;
        description: string;
      }>;
    };
  };
}
