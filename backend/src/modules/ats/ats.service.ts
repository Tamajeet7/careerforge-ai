import type {
  ParsedResume,
} from "../resume/parser";

import type {
  ATSBreakdown,
  ATSResult,
} from "./ats.types";

import {
  evaluateContact,
  evaluateSkills,
  evaluateProjects,
  evaluateExperience,
  evaluateEducation,
  evaluateFormatting,
} from "./rules";

import {
  calculateScore,
  calculateConfidence,
  calculateMetrics,
  calculateReadiness,
  mergeSuggestions,
} from "./calculators";

export function calculateATS(
  resume: ParsedResume
): ATSResult {
  /*
  |--------------------------------------------------------------------------
  | Rules
  |--------------------------------------------------------------------------
  */

  const contact =
    evaluateContact(resume);

  const skills =
    evaluateSkills(resume);

  const projects =
    evaluateProjects(resume);

  const experience =
    evaluateExperience(resume);

  const education =
    evaluateEducation(resume);

  const formatting =
    evaluateFormatting(resume);

  /*
  |--------------------------------------------------------------------------
  | Breakdown
  |--------------------------------------------------------------------------
  */

  const breakdown: ATSBreakdown = {
    contact: contact.score,
    skills: skills.score,
    projects: projects.score,
    experience: experience.score,
    education: education.score,
    formatting: formatting.score,
  };

  /*
  |--------------------------------------------------------------------------
  | Calculators
  |--------------------------------------------------------------------------
  */

  const score =
    calculateScore(breakdown);

  const metrics =
    calculateMetrics(
      breakdown
    );

  return {
    score,

    resumeQuality:
      metrics.resumeQuality,

    skillsMatch:
      metrics.skillsMatch,

    aiConfidence:
      calculateConfidence(score),

    recruiterReadiness:
      calculateReadiness(score),

    breakdown,

    suggestions:
      mergeSuggestions(
        contact.suggestions,
        skills.suggestions,
        projects.suggestions,
        experience.suggestions,
        education.suggestions,
        formatting.suggestions
      ),
  };
}