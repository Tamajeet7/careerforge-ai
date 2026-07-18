"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateProjects = evaluateProjects;
function evaluateProjects(resume) {
    const projects = resume.projects.length;
    let score = 0;
    const suggestions = [];
    if (projects >= 4)
        score = 20;
    else if (projects >= 3)
        score = 18;
    else if (projects >= 2)
        score = 14;
    else if (projects >= 1)
        score = 10;
    if (projects < 2)
        suggestions.push("Include more impactful projects.");
    return {
        score,
        suggestions,
    };
}
