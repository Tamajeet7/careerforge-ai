import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateProjects(
  resume: ParsedResume
): RuleResult {
  const projects =
    resume.projects.length;

  let score = 0;

  const suggestions: string[] = [];

  if (projects >= 5)
    score = 12;
  else if (projects >= 3)
    score = 9;
  else if (projects >= 2)
    score = 6;
  else if (projects >= 1)
    score = 3;

  if (projects < 3)
    suggestions.push(
      "Include more impactful projects (aim for 3+)."
    );

  return {
    score,
    suggestions,
  };
}