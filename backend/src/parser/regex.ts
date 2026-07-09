export const EMAIL_REGEX =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

export const PHONE_REGEX =
  /(?:\+?\d{1,3}[- ]?)?(?:\d{10}|\d{3}[- ]\d{3}[- ]\d{4})/;

export const GITHUB_REGEX =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_.-]+/i;

export const LINKEDIN_REGEX =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+/i;

export const URL_REGEX =
  /https?:\/\/[^\s]+/i;