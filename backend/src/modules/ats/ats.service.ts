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

/**
 * Analyzes a parsed resume and returns a comprehensive ATS score result.
 * Uses Gemini AI for intelligent, context-aware analysis when available,
 * with a rule-based fallback for when the API key is not configured.
 */
export async function calculateATS(
  resume: ParsedResume
): Promise<ATSResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const isValidKey = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10;

  if (isValidKey) {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: apiKey! });

      // Build a human-readable summary of the resume for a better prompt
      const resumeSummary = buildResumeSummary(resume);

      const prompt = `
You are a world-class ATS (Applicant Tracking System) and career coach. Analyze the following resume and provide a thorough, honest evaluation.

RESUME CONTENT:
${resumeSummary}

SCORING PHILOSOPHY:
- Be realistic and honest. Most entry-level/junior resumes score 45-65. Mid-level: 60-75. Senior/excellent: 75-90. Perfect is nearly impossible.
- Each breakdown category is scored 0-100 independently.
- Penalize hard for: missing quantifiable metrics (numbers, %, $), weak action verbs, vague descriptions, missing GitHub/LinkedIn.
- Reward: strong action verbs (Architected, Engineered, Developed), quantified impact, clean structure, relevant tech stack.

SCORING CRITERIA:
- contact (0-100): completeness of name, email, phone, location, LinkedIn, GitHub
- skills (0-100): breadth, relevance, organization of technical skills for a software engineering role
- projects (0-100): number of projects, quality of descriptions, tech stack diversity, presence of impact/outcomes, links
- experience (0-100): quality of bullet points, action verbs, quantifiable metrics, relevance
- education (0-100): institution prestige, GPA/percentage, degree relevance
- formatting (0-100): inferred from structure — clear sections, consistent style, good use of bullet points, length

Return ONLY this exact JSON structure with no markdown, no explanation:
{
  "score": <number 0-100, weighted overall ATS score>,
  "resumeQuality": <number 0-100, overall resume quality as a human recruiter would judge it>,
  "skillsMatch": <number 0-100, how well the skills match a typical software engineering role>,
  "aiConfidence": <"High" | "Medium" | "Low", your confidence in this assessment>,
  "recruiterReadiness": <"Poor" | "Average" | "Good" | "Excellent">,
  "breakdown": {
    "contact": <0-100>,
    "skills": <0-100>,
    "projects": <0-100>,
    "experience": <0-100>,
    "education": <0-100>,
    "formatting": <0-100>
  },
  "strengths": [<3-5 specific things this resume does WELL>],
  "weaknesses": [<3-5 specific things that need IMPROVEMENT>],
  "suggestions": [<5-8 concrete, actionable suggestions to improve the resume — be specific, reference actual content>]
}
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
          const result = JSON.parse(text) as ATSResult;

          if (
            result &&
            typeof result.score === "number" &&
            result.breakdown &&
            Array.isArray(result.suggestions)
          ) {
            result.strengths = result.strengths ?? [];
            result.weaknesses = result.weaknesses ?? [];
            console.log(`[ATS AI] Model ${model} succeeded! Score: ${result.score}, Confidence: ${result.aiConfidence}`);
            return result;
          }
        } catch (error: any) {
          console.warn(`[ATS AI] Model ${model} failed (${error?.message?.substring(0, 100) || error}), trying fallback...`);
        }
      }

      console.warn("[ATS AI] All Gemini candidate models failed, falling back to rule-based analysis.");
    } catch (error) {
      console.error("[ATS AI] Gemini client failed, using rule-based fallback:", error);
    }
  } else {
    console.log("[ATS AI] No valid API key — using rule-based fallback.");
  }

  // ── Fallback: rule-based scoring ──────────────────────────────────────
  const contact = evaluateContact(resume);
  const skills = evaluateSkills(resume);
  const projects = evaluateProjects(resume);
  const experience = evaluateExperience(resume);
  const education = evaluateEducation(resume);
  const formatting = evaluateFormatting(resume);

  // Convert raw rule scores to 0-100 scale for consistency with AI output
  const breakdown = {
    contact: Math.round((contact.score / 10) * 100),
    skills: Math.round((skills.score / 15) * 100),
    projects: Math.round((projects.score / 12) * 100),
    experience: Math.round((experience.score / 18) * 100),
    education: Math.round((education.score / 10) * 100),
    formatting: Math.round((formatting.score / 10) * 100),
  };

  const rawScore = calculateScore({
    contact: contact.score,
    skills: skills.score,
    projects: projects.score,
    experience: experience.score,
    education: education.score,
    formatting: formatting.score,
  });
  const metrics = calculateMetrics({
    contact: contact.score,
    skills: skills.score,
    projects: projects.score,
    experience: experience.score,
    education: education.score,
    formatting: formatting.score,
  });

  return {
    score: rawScore,
    resumeQuality: metrics.resumeQuality,
    skillsMatch: metrics.skillsMatch,
    aiConfidence: calculateConfidence(rawScore),
    recruiterReadiness: calculateReadiness(rawScore),
    breakdown,
    strengths: [],
    weaknesses: [],
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

/**
 * Builds a readable plain-text summary of the parsed resume for the AI prompt.
 * This is more readable than raw JSON and produces better AI output.
 */
function buildResumeSummary(resume: ParsedResume): string {
  const lines: string[] = [];

  // Contact
  lines.push(`== CONTACT ==`);
  lines.push(`Name: ${resume.contact.name}`);
  lines.push(`Email: ${resume.contact.email}`);
  lines.push(`Phone: ${resume.contact.phone}`);
  if (resume.contact.location) lines.push(`Location: ${resume.contact.location}`);
  if (resume.links.github) lines.push(`GitHub: ${resume.links.github}`);
  if (resume.links.linkedin) lines.push(`LinkedIn: ${resume.links.linkedin}`);
  if (resume.links.portfolio) lines.push(`Portfolio: ${resume.links.portfolio}`);

  // Skills
  lines.push(`\n== SKILLS ==`);
  lines.push(resume.skills.join(", ") || "None");

  // Education
  lines.push(`\n== EDUCATION (${resume.education.length} entries) ==`);
  for (const edu of resume.education) {
    lines.push(`• ${edu.title}${edu.subtitle ? ` — ${edu.subtitle}` : ""}`);
  }

  // Experience
  lines.push(`\n== EXPERIENCE (${resume.experience.length} entries) ==`);
  for (const exp of resume.experience) {
    lines.push(`\n${exp.title}${exp.subtitle ? `\n  ${exp.subtitle}` : ""}`);
    for (const bullet of exp.bullets) lines.push(`  - ${bullet}`);
  }

  // Projects
  lines.push(`\n== PROJECTS (${resume.projects.length} entries) ==`);
  for (const proj of resume.projects) {
    lines.push(`\n${proj.title}${proj.subtitle ? `\n  ${proj.subtitle}` : ""}`);
    for (const bullet of proj.bullets) lines.push(`  - ${bullet}`);
  }

  // Certifications & Achievements
  if (resume.certifications.length > 0) {
    lines.push(`\n== CERTIFICATIONS ==`);
    for (const c of resume.certifications) lines.push(`• ${c.title}`);
  }
  if (resume.achievements.length > 0) {
    lines.push(`\n== ACHIEVEMENTS ==`);
    for (const a of resume.achievements) lines.push(`• ${a.title}`);
  }

  return lines.join("\n");
}
