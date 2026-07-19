import type { RecruiterReadiness } from "../ats.types";

export function calculateReadiness(
  score: number
): RecruiterReadiness {
  if (score >= 80)
    return "Excellent";

  if (score >= 65)
    return "Good";

  if (score >= 50)
    return "Average";

  return "Poor";
}