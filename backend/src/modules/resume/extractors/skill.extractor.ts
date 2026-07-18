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

export function extractSkills(
  skillsSection: string
): string[] {
  const text =
    skillsSection.toLowerCase();

  return skillKeywords.filter((skill) =>
    text.includes(skill.toLowerCase())
  );
}