export interface ParsedResume {
  contact: {
    name: string;
    email: string;
    phone: string;
    location?: string;
  };

  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };

  summary?: string;

  skills: string[];

  education: string[];

  experience: string[];

  projects: string[];

  certifications: string[];

  achievements: string[];

  languages: string[];

  rawText: string;
}