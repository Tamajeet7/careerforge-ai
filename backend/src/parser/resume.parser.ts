import {
  EMAIL_REGEX,
  PHONE_REGEX,
  GITHUB_REGEX,
  LINKEDIN_REGEX,
  URL_REGEX,
} from "./regex";

import { ParsedResume } from "./resume.types";

export function parseResume(
  rawText: string
): ParsedResume {

  const email =
    rawText.match(EMAIL_REGEX)?.[0] ?? "";

  const phone =
    rawText.match(PHONE_REGEX)?.[0] ?? "";

  const github =
    rawText.match(GITHUB_REGEX)?.[0];

  const linkedin =
    rawText.match(LINKEDIN_REGEX)?.[0];

  const urls =
    rawText.match(new RegExp(URL_REGEX, "gi")) ?? [];

  const portfolio =
    urls.find(
      (url) =>
        !url.includes("github.com") &&
        !url.includes("linkedin.com")
    );

  return {
    contact: {
      name: "",
      email,
      phone,
    },

    links: {
      github,
      linkedin,
      portfolio,
    },

    summary: "",

    skills: [],

    education: [],

    experience: [],

    projects: [],

    certifications: [],

    achievements: [],

    languages: [],

    rawText,
  };
}