import {
  EMAIL_REGEX,
  PHONE_REGEX,
  GITHUB_REGEX,
  LINKEDIN_REGEX,
} from "../parser/regex";

import {
  ContactInfo,
  ResumeLinks,
} from "../parser";

export function extractContact(
  header: string
): ContactInfo {
  const lines = header
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let name = lines[0] ?? "";
  
  // Clean up if the parser squashed contact info onto the first line
  name = name.split(/(Phone|Email|Mobile|Ph|Tel|[\+\d])/i)[0].trim();

  const email =
    header.match(EMAIL_REGEX)?.[0] ?? "";

  const phone =
    header.match(PHONE_REGEX)?.[0] ?? "";

  return {
    name,
    email,
    phone,
  };
}

export function extractLinks(
  text: string
): ResumeLinks {
  return {
    github:
      text.match(GITHUB_REGEX)?.[0],

    linkedin:
      text.match(LINKEDIN_REGEX)?.[0],
  };
}