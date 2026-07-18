"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLanguages = extractLanguages;
function extractLanguages(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
