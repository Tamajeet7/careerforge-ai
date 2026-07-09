import { ATSResult } from "../types/ats.types";

export function calculateATS(resume: any): ATSResult {
  let score = 0;

  const breakdown = {
    contact: 0,
    skills: 0,
    projects: 0,
    experience: 0,
    education: 0,
    formatting: 0,
  };

  const suggestions: string[] = [];

  // Contact
  if (resume.name) breakdown.contact += 3;
  if (resume.email) breakdown.contact += 3;
  if (resume.phone) breakdown.contact += 4;

  // Skills
  const skillCount = resume.skills?.length || 0;

  if (skillCount >= 10)
    breakdown.skills = 20;
  else
    breakdown.skills = skillCount * 2;

  // Placeholder scores (we'll replace these after improving the parser)
  breakdown.projects = 10;
  breakdown.experience = 10;
  breakdown.education = 10;
  breakdown.formatting = 10;

  score =
    breakdown.contact +
    breakdown.skills +
    breakdown.projects +
    breakdown.experience +
    breakdown.education +
    breakdown.formatting;

  if (!resume.github)
    suggestions.push("Add your GitHub profile.");

  if (!resume.linkedin)
    suggestions.push("Add your LinkedIn profile.");

  if (skillCount < 8)
    suggestions.push("Add more technical skills.");

  if (score < 80)
    suggestions.push("Improve your project descriptions.");

  return {
    score,
    breakdown,
    suggestions,
  };
}