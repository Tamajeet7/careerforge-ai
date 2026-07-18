/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/

export const EMAIL_REGEX =
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

export const PHONE_REGEX =
  /(\+?\d[\d\s().-]{8,}\d)/;

/*
|--------------------------------------------------------------------------
| Links
|--------------------------------------------------------------------------
*/

export const GITHUB_REGEX =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i;

export const LINKEDIN_REGEX =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i;

/*
|--------------------------------------------------------------------------
| Section Headers
|--------------------------------------------------------------------------
*/

export const SECTION_HEADERS = {
  summary: [
    "summary",
    "professional summary",
    "profile",
    "objective",
  ],

  education: [
    "education",
    "academic background",
    "qualification",
  ],

  experience: [
    "experience",
    "work experience",
    "employment",
    "professional experience",
  ],

  projects: [
    "projects",
    "academic projects",
    "personal projects",
  ],

  skills: [
    "skills",
    "technical skills",
    "core competencies",
  ],

  certifications: [
    "certifications",
    "licenses",
  ],

  achievements: [
    "achievements",
    "awards",
    "honors",
  ],

  languages: [
    "languages",
  ],
};