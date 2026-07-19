import type { AIConfidence } from "../../resume";

export function calculateConfidence(
  score: number
): AIConfidence {
  if (score >= 80)
    return "High";

  if (score >= 55)
    return "Medium";

  return "Low";
}