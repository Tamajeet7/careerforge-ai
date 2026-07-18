export function extractExperience(
  section: string
): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}