"use strict";
/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECTION_HEADERS = exports.LINKEDIN_REGEX = exports.GITHUB_REGEX = exports.PHONE_REGEX = exports.EMAIL_REGEX = void 0;
exports.EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
exports.PHONE_REGEX = /(\+?\d[\d\s().-]{8,}\d)/;
/*
|--------------------------------------------------------------------------
| Links
|--------------------------------------------------------------------------
*/
exports.GITHUB_REGEX = /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i;
exports.LINKEDIN_REGEX = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i;
/*
|--------------------------------------------------------------------------
| Section Headers
|--------------------------------------------------------------------------
*/
exports.SECTION_HEADERS = {
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
