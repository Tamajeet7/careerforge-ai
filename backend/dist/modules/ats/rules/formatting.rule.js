"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateFormatting = evaluateFormatting;
function evaluateFormatting(resume) {
    let score = 10;
    const suggestions = [];
    if (resume.rawText.length < 300) {
        score -= 4;
        suggestions.push("Resume content is too short.");
    }
    if (resume.rawText.length > 5000) {
        score -= 2;
        suggestions.push("Consider reducing resume length.");
    }
    return {
        score,
        suggestions,
    };
}
