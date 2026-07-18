"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateReadiness = calculateReadiness;
function calculateReadiness(score) {
    if (score >= 90)
        return "Excellent";
    if (score >= 75)
        return "Good";
    if (score >= 60)
        return "Average";
    return "Poor";
}
