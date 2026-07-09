import { ResumeATSData } from "../ats.types";

export function scoreSkills(
  resume: ResumeATSData
) {
  const suggestions: string[] = [];

  const count = resume.skills.length;

  let score = 0;

  if (count >= 10)
    score = 20;
  else if (count >= 8)
    score = 18;
  else if (count >= 6)
    score = 15;
  else if (count >= 4)
    score = 10;
  else {
    score = 5;

    suggestions.push(
      "Add more technical skills."
    );
  }

  return {
    score,
    suggestions,
  };
}