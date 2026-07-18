import type { ParsedResume } from "./parser.types";

import {
  extractSections,
  extractContact,
  extractLinks,
  extractSkills,
  extractEducation,
  extractExperience,
  extractProjects,
  extractCertifications,
  extractAchievements,
  extractLanguages,
} from "../extractors";

export function parseResumeText(
  rawText: string
): ParsedResume {
  const sections =
    extractSections(rawText);

  return {
    contact: extractContact(
      sections.header
    ),

    links: extractLinks(rawText),

    summary:
      sections.summary || undefined,

    skills: extractSkills(
      sections.skills
    ),

    education:
      extractEducation(
        sections.education
      ),

    experience:
      extractExperience(
        sections.experience
      ),

    projects:
      extractProjects(
        sections.projects
      ),

    certifications:
      extractCertifications(
        sections.certifications
      ),

    achievements:
      extractAchievements(
        sections.achievements
      ),

    languages:
      extractLanguages(
        sections.languages
      ),

    rawText,
  };
}