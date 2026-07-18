export function extractEducation(
  section: string
): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}