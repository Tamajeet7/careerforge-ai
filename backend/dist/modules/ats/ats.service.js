"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateATS = calculateATS;
const rules_1 = require("./rules");
const calculators_1 = require("./calculators");
function calculateATS(resume) {
    /*
    |--------------------------------------------------------------------------
    | Rules
    |--------------------------------------------------------------------------
    */
    const contact = (0, rules_1.evaluateContact)(resume);
    const skills = (0, rules_1.evaluateSkills)(resume);
    const projects = (0, rules_1.evaluateProjects)(resume);
    const experience = (0, rules_1.evaluateExperience)(resume);
    const education = (0, rules_1.evaluateEducation)(resume);
    const formatting = (0, rules_1.evaluateFormatting)(resume);
    /*
    |--------------------------------------------------------------------------
    | Breakdown
    |--------------------------------------------------------------------------
    */
    const breakdown = {
        contact: contact.score,
        skills: skills.score,
        projects: projects.score,
        experience: experience.score,
        education: education.score,
        formatting: formatting.score,
    };
    /*
    |--------------------------------------------------------------------------
    | Calculators
    |--------------------------------------------------------------------------
    */
    const score = (0, calculators_1.calculateScore)(breakdown);
    return {
        score,
        confidence: (0, calculators_1.calculateConfidence)(score),
        readiness: (0, calculators_1.calculateReadiness)(score),
        metrics: (0, calculators_1.calculateMetrics)(breakdown),
        breakdown,
        suggestions: (0, calculators_1.mergeSuggestions)(contact.suggestions, skills.suggestions, projects.suggestions, experience.suggestions, education.suggestions, formatting.suggestions),
    };
}
