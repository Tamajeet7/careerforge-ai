/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location?: string;
}

/*
|--------------------------------------------------------------------------
| Links
|--------------------------------------------------------------------------
*/

export interface ResumeLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  website?: string;
}

export interface SectionItem {
  title: string;
  subtitle?: string;
  bullets: string[];
}

/*
|--------------------------------------------------------------------------
| Resume Sections
|--------------------------------------------------------------------------
*/

export interface ResumeSections {
  header: string;

  summary: string;

  education: string;

  experience: string;

  projects: string;

  skills: string;

  certifications: string;

  achievements: string;

  languages: string;
}

/*
|--------------------------------------------------------------------------
| Parsed Resume
|--------------------------------------------------------------------------
*/

export interface ParsedResume {
  contact: ContactInfo;

  links: ResumeLinks;

  summary?: string;

  skills: string[];

  education: SectionItem[];

  experience: SectionItem[];

  projects: SectionItem[];

  certifications: SectionItem[];

  achievements: SectionItem[];

  languages: SectionItem[];

  rawText: string;
}