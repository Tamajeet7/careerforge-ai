"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSkills = evaluateSkills;
function evaluateSkills(resume) {
    const skills = resume.skills.length;
    let score = 0;
    const suggestions = [];
    if (skills >= 12)
        score = 25;
    else if (skills >= 8)
        score = 20;
    else if (skills >= 5)
        score = 15;
    else
        score = skills * 3;
    if (skills < 8)
        suggestions.push("Add more relevant technical skills.");
    return {
        score,
        suggestions,
    };
}
