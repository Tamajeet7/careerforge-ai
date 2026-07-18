"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateEducation = evaluateEducation;
function evaluateEducation(resume) {
    const education = resume.education.length;
    return {
        score: education ? 12 : 0,
        suggestions: education
            ? []
            : ["Add your education details."],
    };
}
