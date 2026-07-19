import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateExperience(
  resume: ParsedResume
): RuleResult {
  const experiences =
    resume.experience.length;

  let score = 0;

  const suggestions: string[] = [];

  if (experiences >= 4)
    score = 18;
  else if (experiences >= 3)
    score = 14;
  else if (experiences >= 2)
    score = 10;
  else if (experiences >= 1)
    score = 6;

  if (experiences < 2)
    suggestions.push(
      "Add more work or internship experience (aim for 2+ entries)."
    );
  else if (experiences < 3)
    suggestions.push(
      "Consider adding a third experience entry for stronger impact."
    );

  const hasQuantifiableMetrics = /\d+/.test(resume.rawText);
  if (!hasQuantifiableMetrics && experiences > 0) {
    score = Math.max(0, score - 4);
    suggestions.push(
      "Add quantifiable metrics (numbers, percentages, $ amounts) to experience bullet points."
    );
  }

  return {
    score,
    suggestions,
  };
}