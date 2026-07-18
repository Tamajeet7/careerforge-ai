"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMetrics = calculateMetrics;
function calculateMetrics(breakdown) {
    return {
        resumeQuality: Math.min(100, breakdown.projects +
            breakdown.experience +
            breakdown.education +
            breakdown.formatting +
            25),
        skillsMatch: Math.min(100, breakdown.skills * 4),
    };
}
