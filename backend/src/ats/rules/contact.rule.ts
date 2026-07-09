import { ResumeATSData } from "../ats.types";

export function scoreProfessionalLinks(
  resume: ResumeATSData
) {
  let score = 0;

  const suggestions: string[] = [];

  if (resume.github) {
    score += 2;
  } else {
    suggestions.push("Add your GitHub profile.");
  }

  if (resume.linkedin) {
    score += 2;
  } else {
    suggestions.push("Add your LinkedIn profile.");
  }

  if (resume.portfolio) {
    score += 1;
  } else {
    suggestions.push(
      "Consider adding a portfolio website."
    );
  }

  return {
    score,
    suggestions,
  };
}