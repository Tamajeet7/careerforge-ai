"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateConfidence = calculateConfidence;
function calculateConfidence(score) {
    if (score >= 90)
        return "High";
    if (score >= 75)
        return "Medium";
    return "Low";
}
