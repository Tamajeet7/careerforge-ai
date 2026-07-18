import {
  ResumeSections,
} from "../parser/parser.types";

import {
  SECTION_HEADERS,
} from "../parser/regex";

function normalize(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ");
}

function findHeader(
  line: string
): keyof typeof SECTION_HEADERS | null {
  const value = line.trim().toLowerCase();

  for (const [section, aliases] of Object.entries(
    SECTION_HEADERS
  )) {
    if (
      aliases.some(
        (alias) => alias === value
      )
    ) {
      return section as keyof typeof SECTION_HEADERS;
    }
  }

  return null;
}

export function extractSections(
  rawText: string
): ResumeSections {
  const text = normalize(rawText);

  const lines = text
    .split("\n")
    .map((line) => line.trim());

  const sections: ResumeSections = {
    header: "",
    summary: "",
    education: "",
    experience: "",
    projects: "",
    skills: "",
    certifications: "",
    achievements: "",
    languages: "",
  };

  let current: keyof ResumeSections = "header";

  for (const line of lines) {
    if (!line) continue;

    const header = findHeader(line);

    if (header) {
      current = header;
      continue;
    }

    sections[current] +=
      line + "\n";
  }

  for (const key in sections) {
    sections[key as keyof ResumeSections] =
      sections[
        key as keyof ResumeSections
      ].trim();
  }

  return sections;
}