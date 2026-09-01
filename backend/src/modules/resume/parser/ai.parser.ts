import type { ParsedResume, SectionItem } from "./parser.types";
import { parseResumeText as regexParseResumeText } from "./resume.parser";

/**
 * AI-powered resume parser using Gemini.
 *
 * Sends the raw PDF text to Gemini and asks it to return a fully structured
 * ParsedResume JSON object. This handles any resume format, bullet style,
 * or font-encoding quirk that pdf-parse may introduce.
 *
 * Falls back to the regex-based parser if no API key is present or the
 * AI call fails.
 */
export async function parseResumeWithAI(
  rawText: string
): Promise<ParsedResume> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an expert resume parser. Your job is to extract structured information from raw resume text that may have been extracted from a PDF (and thus may have garbled spacing, missing characters, or unusual formatting).

Here is the raw resume text:
---
${rawText}
---

Parse this resume and return ONLY a valid JSON object that strictly conforms to the following TypeScript interface. Do not include any explanation or markdown — just the JSON object.

Each SectionItem represents one entry (e.g., one job, one project, one degree):
- "title": the primary heading line (job title + company + date, OR project name + tech stack, OR degree + institution)
- "subtitle": optional secondary line (e.g., company/department line in experience, OR degree description in education)  
- "bullets": array of bullet point description strings for this entry

interface SectionItem {
  title: string;
  subtitle?: string;
  bullets: string[];
}

interface ParsedResume {
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
  skills: string[];         // flat list of individual technical skills
  education: SectionItem[]; // each degree/school is one SectionItem
  experience: SectionItem[]; // each job/internship is one SectionItem
  projects: SectionItem[];   // each project is one SectionItem
  certifications: SectionItem[];
  achievements: SectionItem[];
  languages: SectionItem[];
  rawText: string;           // pass through the original raw text unchanged
}

Important rules:
- Fix garbled text where spaces are missing between words (e.g., "ResearchedFeFETTCAD" → "Researched FeFET TCAD")
- Bullet points in this PDF may use •, –, −, -, or * as markers
- For education: each school/institution = one SectionItem. Title = institution name. Subtitle = degree + year.
- For experience: each job = one SectionItem. Title = job title + date range. Subtitle = company + location.
- For projects: each project = one SectionItem. Title = project name + tech stack. No subtitle needed usually.
- skills must be a flat string[] of individual skills, NOT nested objects
- rawText must be set to exactly the input raw text
`;

      const CANDIDATE_MODELS = [
        "gemini-3.5-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.7-flash",
        "gemini-3.1-flash-lite",
        "gemini-3-flash-preview",
        "gemini-3.6-flash",
        "gemini-flash-latest",
        "gemini-pro-latest",
      ];

      for (const model of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          const text = response.text || "{}";
          const result = JSON.parse(text) as ParsedResume;

          if (
            result &&
            result.contact &&
            typeof result.contact.name === "string" &&
            Array.isArray(result.skills) &&
            Array.isArray(result.education) &&
            Array.isArray(result.experience) &&
            Array.isArray(result.projects)
          ) {
            result.rawText = rawText;
            console.log(`[AI Parser] Model ${model} successfully parsed resume!`);
            return result;
          }
        } catch (error: any) {
          console.warn(`[AI Parser] Model ${model} failed (${error?.message?.substring(0, 100) || error}), trying fallback...`);
        }
      }

      console.warn("[AI Parser] All Gemini candidate models failed, falling back to regex parser.");
    } catch (error) {
      console.error("[AI Parser] Gemini client initialization failed, falling back to regex:", error);
    }
  }

  // Fallback: regex-based parser
  console.log("[AI Parser] No API key or AI failed — using regex parser.");
  return regexParseResumeText(rawText);
}
