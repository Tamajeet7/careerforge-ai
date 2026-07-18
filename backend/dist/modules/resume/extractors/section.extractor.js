"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSections = extractSections;
const regex_1 = require("../parser/regex");
function normalize(text) {
    return text
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/[ ]{2,}/g, " ");
}
function findHeader(line) {
    const value = line.trim().toLowerCase();
    for (const [section, aliases] of Object.entries(regex_1.SECTION_HEADERS)) {
        if (aliases.some((alias) => alias === value)) {
            return section;
        }
    }
    return null;
}
function extractSections(rawText) {
    const text = normalize(rawText);
    const lines = text
        .split("\n")
        .map((line) => line.trim());
    const sections = {
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
    let current = "header";
    for (const line of lines) {
        if (!line)
            continue;
        const header = findHeader(line);
        if (header) {
            current = header;
            continue;
        }
        sections[current] +=
            line + "\n";
    }
    for (const key in sections) {
        sections[key] =
            sections[key].trim();
    }
    return sections;
}
