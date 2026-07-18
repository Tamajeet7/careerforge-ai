"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResumeText = parseResumeText;
const extractors_1 = require("../extractors");
function parseResumeText(rawText) {
    const sections = (0, extractors_1.extractSections)(rawText);
    return {
        contact: (0, extractors_1.extractContact)(sections.header),
        links: (0, extractors_1.extractLinks)(rawText),
        summary: sections.summary || undefined,
        skills: (0, extractors_1.extractSkills)(sections.skills),
        education: (0, extractors_1.extractEducation)(sections.education),
        experience: (0, extractors_1.extractExperience)(sections.experience),
        projects: (0, extractors_1.extractProjects)(sections.projects),
        certifications: (0, extractors_1.extractCertifications)(sections.certifications),
        achievements: (0, extractors_1.extractAchievements)(sections.achievements),
        languages: (0, extractors_1.extractLanguages)(sections.languages),
        rawText,
    };
}
