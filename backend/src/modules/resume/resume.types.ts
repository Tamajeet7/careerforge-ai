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
  fileUrl?: string;

  fileSize: number;
  mimeType: string;
  pages: number;

  atsScore?: number | null;
  resumeQuality?: number | null;
  skillsMatch?: number | null;

  aiConfidence?: AIConfidence | null;

  createdAt: string;
  updatedAt: string;
}

/*
|--------------------------------------------------------------------------
| Resume Upload
|--------------------------------------------------------------------------
*/

export interface ResumeUpload {
  userId: string;

  name: string;
  email: string;
  phone: string;

  skills: string[];

  fileName: string;
  filePath: string;

  fileSize: number;
  mimeType: string;
  pages: number;
}

/*
|--------------------------------------------------------------------------
| Resume Analytics
|--------------------------------------------------------------------------
*/

export interface ResumeAnalytics {
  atsScore: number;
  resumeQuality: number;
  skillsMatch: number;
  aiConfidence: AIConfidence;
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