"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateExperience = evaluateExperience;
function evaluateExperience(resume) {
    const experiences = resume.experience.length;
    let score = 0;
    const suggestions = [];
    if (experiences >= 3)
        score = 20;
    else if (experiences >= 2)
        score = 16;
    else if (experiences >= 1)
        score = 12;
    if (!experiences)
        suggestions.push("Add internship or work experience.");
    return {
        score,
        suggestions,
    };
}
