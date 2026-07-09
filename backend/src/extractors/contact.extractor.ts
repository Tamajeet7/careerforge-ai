import {
  EMAIL_REGEX,
  PHONE_REGEX,
  GITHUB_REGEX,
  LINKEDIN_REGEX,
  URL_REGEX,
} from "../parser/regex";

export function extractContact(rawText: string) {
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
        !url.includes("github") &&
        !url.includes("linkedin")
    );

  return {
    email,
    phone,
    github,
    linkedin,
    portfolio,
  };
}