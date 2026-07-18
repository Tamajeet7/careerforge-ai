"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEducation = extractEducation;
function extractEducation(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
