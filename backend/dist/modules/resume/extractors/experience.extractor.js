"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractExperience = extractExperience;
function extractExperience(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
