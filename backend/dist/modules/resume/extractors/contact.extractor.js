"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractContact = extractContact;
exports.extractLinks = extractLinks;
const regex_1 = require("../parser/regex");
function extractContact(header) {
    const lines = header
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    const name = lines[0] ?? "";
    const email = header.match(regex_1.EMAIL_REGEX)?.[0] ?? "";
    const phone = header.match(regex_1.PHONE_REGEX)?.[0] ?? "";
    return {
        name,
        email,
        phone,
    };
}
function extractLinks(text) {
    return {
        github: text.match(regex_1.GITHUB_REGEX)?.[0],
        linkedin: text.match(regex_1.LINKEDIN_REGEX)?.[0],
    };
}
