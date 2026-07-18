"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCertifications = extractCertifications;
function extractCertifications(section) {
    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
