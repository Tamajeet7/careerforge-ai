import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateExperience(
  resume: ParsedResume
): RuleResult {
  const experiences =
    resume.experience.length;

  let score = 0;

  const suggestions: string[] = [];

  if (experiences >= 3)
    score = 20;
  else if (experiences >= 2)
    score = 16;
  else if (experiences >= 1)
    score = 12;

  if (!experiences)
    suggestions.push(
      "Add internship or work experience."
    );

  return {
    score,
    suggestions,
  };
}