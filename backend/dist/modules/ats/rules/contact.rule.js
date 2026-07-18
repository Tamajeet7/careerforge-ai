"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateContact = evaluateContact;
function evaluateContact(resume) {
    let score = 0;
    const suggestions = [];
    const { contact, links } = resume;
    if (contact.name)
        score += 8;
    else
        suggestions.push("Add your full name.");
    if (contact.email)
        score += 6;
    else
        suggestions.push("Include a professional email address.");
    if (contact.phone)
        score += 6;
    else
        suggestions.push("Add your phone number.");
    if (links.linkedin)
        score += 3;
    else
        suggestions.push("Include your LinkedIn profile.");
    if (links.github || links.portfolio)
        score += 2;
    return {
        score,
        suggestions,
    };
}
