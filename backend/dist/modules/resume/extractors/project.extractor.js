"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractProjects = extractProjects;
function extractProjects(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
