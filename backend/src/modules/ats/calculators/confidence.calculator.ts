import type { AIConfidence } from "../../resume";

export function calculateConfidence(
  score: number
): AIConfidence {
  if (score >= 90)
    return "High";

  if (score >= 75)
    return "Medium";

  return "Low";
}