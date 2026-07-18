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
  contact: number;
  skills: number;
  projects: number;
  experience: number;
  education: number;
  formatting: number;
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
}