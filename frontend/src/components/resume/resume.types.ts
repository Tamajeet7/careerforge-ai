/*
|--------------------------------------------------------------------------
| Resume
|--------------------------------------------------------------------------
*/

export interface Resume {
  id: string;
  userId: string;

  title: string;

  name: string;
  email: string;
  phone: string;

  skills: string[];

  fileName: string;
  filePath: string;
  fileUrl: string | null;
  fileSize: number;
  mimeType: string;
  pages: number;

  atsScore: number | null;
  resumeQuality: number | null;
  skillsMatch: number | null;

  aiConfidence: AIConfidence | null;

  createdAt: string;
  updatedAt: string;
}

/*
|--------------------------------------------------------------------------
| ATS
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
| Upload
|--------------------------------------------------------------------------
*/

export interface ResumeUploadResponse {
  success: boolean;
  message: string;
  data: Resume;
}

/*
|--------------------------------------------------------------------------
| AI
|--------------------------------------------------------------------------
*/

export type AIConfidence =
  | "High"
  | "Medium"
  | "Low";

export type RecruiterReadiness =
  | "Poor"
  | "Average"
  | "Good"
  | "Excellent";

/*
|--------------------------------------------------------------------------
| Parsed Resume
|--------------------------------------------------------------------------
*/

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
    website?: string;
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