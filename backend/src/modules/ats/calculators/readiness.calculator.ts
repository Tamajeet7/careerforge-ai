import type { RecruiterReadiness } from "../ats.types";

export function calculateReadiness(
  score: number
): RecruiterReadiness {
  if (score >= 90)
    return "Excellent";

  if (score >= 75)
    return "Good";

  if (score >= 60)
    return "Average";

  return "Poor";
}