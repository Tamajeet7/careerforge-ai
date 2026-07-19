import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateSkills(
  resume: ParsedResume
): RuleResult {
  const skills =
    resume.skills.length;

  let score = 0;

  const suggestions: string[] = [];

  if (skills >= 18)
    score = 15;
  else if (skills >= 12)
    score = 12;
  else if (skills >= 8)
    score = 9;
  else if (skills >= 5)
    score = 6;
  else if (skills >= 3)
    score = 3;
  else
    score = 1;

  if (skills < 12)
    suggestions.push(
      "Add more relevant technical skills (aim for 12+)."
    );

  return {
    score,
    suggestions,
  };
}