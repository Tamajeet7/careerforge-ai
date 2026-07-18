import type { ATSBreakdown } from "../ats.types";

export function calculateScore(
  breakdown: ATSBreakdown
): number {
  return Math.min(
    100,
    breakdown.contact +
      breakdown.skills +
      breakdown.projects +
      breakdown.experience +
      breakdown.education +
      breakdown.formatting
  );
}