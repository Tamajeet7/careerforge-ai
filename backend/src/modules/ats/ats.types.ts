import type { AIConfidence } from "../resume/resume.types";

/*
|--------------------------------------------------------------------------
| Rule Result
|--------------------------------------------------------------------------
*/

export interface RuleResult {
  score: number;
  suggestions: string[];
}

/*
|--------------------------------------------------------------------------
| Breakdown
|--------------------------------------------------------------------------
*/

export interface ATSBreakdown {
  contact: number;     // 0-100
  skills: number;      // 0-100
  projects: number;    // 0-100
  experience: number;  // 0-100
  education: number;   // 0-100
  formatting: number;  // 0-100
}

/*
|--------------------------------------------------------------------------
| Metrics
|--------------------------------------------------------------------------
*/

export interface ATSMetrics {
  resumeQuality: number;
  skillsMatch: number;
}

/*
|--------------------------------------------------------------------------
| Recruiter Readiness
|--------------------------------------------------------------------------
*/

export type RecruiterReadiness =
  | "Poor"
  | "Average"
  | "Good"
  | "Excellent";

/*
|--------------------------------------------------------------------------
| ATS Result
|--------------------------------------------------------------------------
*/

export interface ATSResult {
  score: number;

  resumeQuality: number;

  skillsMatch: number;

  aiConfidence: AIConfidence;

  recruiterReadiness: RecruiterReadiness;

  breakdown: ATSBreakdown;

  suggestions: string[];

  strengths: string[];

  weaknesses: string[];
}