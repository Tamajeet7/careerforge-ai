"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSuggestions = mergeSuggestions;
function mergeSuggestions(...lists) {
    return [...new Set(lists.flat())];
}
