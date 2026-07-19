import type { ParsedResume } from "../../resume/parser";
import type { RuleResult } from "../ats.types";

export function evaluateContact(
  resume: ParsedResume
): RuleResult {
  let score = 0;

  const suggestions: string[] = [];

  const { contact, links } = resume;

  if (contact.name)
    score += 3;
  else
    suggestions.push("Add your full name.");

  if (contact.email)
    score += 2;
  else
    suggestions.push("Include a professional email address.");

  if (contact.phone)
    score += 2;
  else
    suggestions.push("Add your phone number.");

  if (links.linkedin)
    score += 2;
  else
    suggestions.push("Include your LinkedIn profile.");

  if (links.github || links.portfolio)
    score += 1;

  return {
    score,
    suggestions,
  };
}