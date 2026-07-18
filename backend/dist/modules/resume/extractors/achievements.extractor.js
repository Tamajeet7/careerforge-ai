"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAchievements = extractAchievements;
function extractAchievements(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
