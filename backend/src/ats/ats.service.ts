import {
  ATSResult,
  ResumeATSData,
} from "./ats.types";

import {
  scoreContact,
  scoreSkills,
} from "./ats.rules";

export function calculateATS(
  resume: ResumeATSData
): ATSResult {

  const contact = scoreContact(resume);

  const skills = scoreSkills(resume);

  const projects = 10;
  const education = 10;
  const experience = 10;
  const sections = 5;
  const formatting = 5;

  const overallScore =
    contact +
    skills +
    projects +
    education +
    experience +
    sections +
    formatting;

  const suggestions: string[] = [];

  if (skills < 15) {
    suggestions.push(
      "Add more technical skills."
    );
  }

  if (!resume.rawText.includes("github")) {
    suggestions.push(
      "Include your GitHub profile."
    );
  }

  if (!resume.rawText.includes("linkedin")) {
    suggestions.push(
      "Include your LinkedIn profile."
    );
  }

  return {
    overallScore,

    breakdown: {
      contact,
      skills,
      projects,
      education,
      experience,
      sections,
      formatting,
    },

    suggestions,
  };
}