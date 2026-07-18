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

  education: string[];

  experience: string[];

  projects: string[];

  certifications: string[];

  achievements: string[];

  languages: string[];

  rawText: string;
}