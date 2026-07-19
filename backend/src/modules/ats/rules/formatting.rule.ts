import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateFormatting(
  resume: ParsedResume
): RuleResult {
  let score = 6;

  const suggestions: string[] = [];

  const len = resume.rawText.length;

  if (len < 500) {
    score -= 3;
    suggestions.push("Resume content is too short — aim for 500+ characters.");
  } else if (len > 4000) {
    score -= 2;
    suggestions.push("Consider reducing resume length for better ATS parsing.");
  } else if (len >= 1000 && len <= 3000) {
    score += 2;
  }

  if (len > 0 && len < 200) {
    score = 1;
  }

  return {
    score: Math.max(1, score),
    suggestions,
  };
}