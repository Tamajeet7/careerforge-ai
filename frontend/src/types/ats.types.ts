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

  resumeQuality: number;

  skillsMatch: number;

  aiConfidence:
    | "High"
    | "Medium"
    | "Low";

  recruiterReadiness:
    | "Poor"
    | "Average"
    | "Good"
    | "Excellent";

  breakdown: ATSBreakdown;

  suggestions: string[];
}