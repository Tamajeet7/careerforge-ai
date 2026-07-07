interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

const skillKeywords = [
  "Java",
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Git",
  "AWS",
  "HTML",
  "CSS",
  "Tailwind",
];

export function extractResumeData(text: string): ResumeData {
  const email =
    text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";

  const phone =
    text.match(/(\+?\d[\d\s-]{8,}\d)/)?.[0] ?? "";

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] ?? "";

  const name = firstLine
    .split(/Phone:|Email:|\+91|Mobile:/i)[0]
    .trim();

  const skills = skillKeywords.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    name,
    email,
    phone,
    skills,
  };
}