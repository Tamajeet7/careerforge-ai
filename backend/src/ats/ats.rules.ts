import { ResumeATSData } from "./ats.types";

export function scoreContact(
  resume: ResumeATSData
) {
  let score = 0;

  if (resume.name) score += 3;

  if (resume.email) score += 3;

  if (resume.phone) score += 4;

  return score;
}

export function scoreSkills(
  resume: ResumeATSData
) {
  const count = resume.skills.length;

  if (count >= 10) return 20;

  if (count >= 8) return 18;

  if (count >= 6) return 15;

  if (count >= 4) return 10;

  return 5;
}