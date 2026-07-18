"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
function calculateScore(breakdown) {
    return Math.min(100, breakdown.contact +
        breakdown.skills +
        breakdown.projects +
        breakdown.experience +
        breakdown.education +
        breakdown.formatting);
}
