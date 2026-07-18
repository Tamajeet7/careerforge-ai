import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateSkills(
  resume: ParsedResume
): RuleResult {
  const skills =
    resume.skills.length;

  let score = 0;

  const suggestions: string[] = [];

  if (skills >= 12)
    score = 25;
  else if (skills >= 8)
    score = 20;
  else if (skills >= 5)
    score = 15;
  else
    score = skills * 3;

  if (skills < 8)
    suggestions.push(
      "Add more relevant technical skills."
    );

  return {
    score,
    suggestions,
  };
}