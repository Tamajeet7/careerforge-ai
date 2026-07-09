export interface ATSBreakdown {
  contact: number;
  skills: number;
  projects: number;
  experience: number;
  education: number;
  formatting: number;
}

export interface ATSResult {
  score: number;
  breakdown: ATSBreakdown;
  suggestions: string[];
}