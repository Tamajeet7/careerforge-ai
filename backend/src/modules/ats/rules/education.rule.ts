import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateEducation(
  resume: ParsedResume
): RuleResult {
  const education =
    resume.education.length;

  return {
    score: education ? 12 : 0,

    suggestions: education
      ? []
      : ["Add your education details."],
  };
}