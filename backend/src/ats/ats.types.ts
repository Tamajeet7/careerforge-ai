export interface ResumeATSData {
  name: string;
  email: string;
  phone: string;

  github?: string;
  linkedin?: string;
  portfolio?: string;

  skills: string[];

  rawText: string;
}

export interface ScoreBreakdown {
  contact: number;
  skills: number;
  projects: number;
  education: number;
  experience: number;
  sections: number;
  formatting: number;
}

export interface ATSResult {
  overallScore: number;

  breakdown: ScoreBreakdown;

  suggestions: string[];
}