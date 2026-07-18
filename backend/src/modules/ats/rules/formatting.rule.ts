import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateFormatting(
  resume: ParsedResume
): RuleResult {
  let score = 10;

  const suggestions: string[] = [];

  if (
    resume.rawText.length < 300
  ) {
    score -= 4;

    suggestions.push(
      "Resume content is too short."
    );
  }

  if (
    resume.rawText.length > 5000
  ) {
    score -= 2;

    suggestions.push(
      "Consider reducing resume length."
    );
  }

  return {
    score,
    suggestions,
  };
}