"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSkills = extractSkills;
const skillKeywords = [
    "Java",
    "C",
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "Git",
    "AWS",
    "Linux",
    "HTML",
    "CSS",
    "Tailwind",
    "Redis",
    "Firebase",
];
function extractSkills(skillsSection) {
    const text = skillsSection.toLowerCase();
    return skillKeywords.filter((skill) => text.includes(skill.toLowerCase()));
}
