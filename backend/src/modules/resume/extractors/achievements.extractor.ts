export function extractAchievements(
  section: string
): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}