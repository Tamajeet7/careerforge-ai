import type { ParsedResume } from "../resume/parser";
import type { ATSResult } from "./ats.types";

import {
  evaluateContact,
  evaluateSkills,
  evaluateProjects,
  evaluateExperience,
  evaluateEducation,
  evaluateFormatting,
} from "./rules";

import {
  calculateScore,
  calculateConfidence,
  calculateMetrics,
  calculateReadiness,
  mergeSuggestions,
} from "./calculators";

export async function calculateATS(
  resume: ParsedResume
): Promise<ATSResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are an extremely strict, critical, and realistic ATS (Applicant Tracking System) software used by Fortune 500 companies. 
Your task is to analyze the following parsed resume data and evaluate it strictly against standard ATS criteria. 

CRITICAL INSTRUCTIONS for scoring:
- Be EXTREMELY HARSH and REALISTIC. A typical resume scores between 40-65. Only the absolute top 1% of perfect resumes should score above 85.
- The average resume across all industries scores around 50-55. Do NOT inflate scores.
- Penalize heavily for missing quantifiable impact metrics (numbers, percentages, $ amounts) in experience bullets.
- Penalize heavily for generic, uninspiring bullet points that lack action verbs.
- Penalize for missing contact info (e.g. LinkedIn, GitHub, missing phone number).
- Penalize for short, vague project descriptions.
- A score of 70+ should be genuinely impressive. A score of 80+ should be exceptional.
- Calculate scores (0-100) for different sections based on these harsh criteria.
- Provide actionable, blunt, and highly specific suggestions for improvement. Do not sugarcoat the feedback.

Resume JSON:
${JSON.stringify(resume, null, 2)}

You must return ONLY a JSON object that strictly conforms to the following TypeScript interface:
{
  "score": number, // Overall ATS score (0-100)
  "resumeQuality": number, // Overall quality score (0-100)
  "skillsMatch": number, // General skill relevancy score (0-100)
  "aiConfidence": "High" | "Medium" | "Low", // Confidence in your parsing/evaluation
  "recruiterReadiness": "Poor" | "Average" | "Good" | "Excellent", // Readiness level
  "breakdown": {
    "contact": number, // Score (0-100) for contact info completeness
    "skills": number, // Score (0-100) for skills presentation
    "projects": number, // Score (0-100) for projects quality
    "experience": number, // Score (0-100) for experience descriptions
    "education": number, // Score (0-100) for education section
    "formatting": number // Score (0-100) for estimated formatting/structure
  },
  "suggestions": string[] // Array of actionable, specific suggestions to improve the resume
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
      });
      
      const text = response.text || "{}";
      const result = JSON.parse(text) as ATSResult;
      
      if (result && typeof result.score === 'number' && result.breakdown) {
          return result;
      }
    } catch (error) {
      console.error("AI ATS Calculation failed, falling back to static rules:", error);
    }
  }

  const contact = evaluateContact(resume);
  const skills = evaluateSkills(resume);
  const projects = evaluateProjects(resume);
  const experience = evaluateExperience(resume);
  const education = evaluateEducation(resume);
  const formatting = evaluateFormatting(resume);

  const breakdown = {
    contact: contact.score,
    skills: skills.score,
    projects: projects.score,
    experience: experience.score,
    education: education.score,
    formatting: formatting.score,
  };

  const score = calculateScore(breakdown);
  const metrics = calculateMetrics(breakdown);

  return {
    score,
    resumeQuality: metrics.resumeQuality,
    skillsMatch: metrics.skillsMatch,
    aiConfidence: calculateConfidence(score),
    recruiterReadiness: calculateReadiness(score),
    breakdown,
    suggestions: mergeSuggestions(
      contact.suggestions,
      skills.suggestions,
      projects.suggestions,
      experience.suggestions,
      education.suggestions,
      formatting.suggestions
    ),
  };
}