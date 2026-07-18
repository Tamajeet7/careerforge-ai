import type {
  ATSBreakdown,
  ATSMetrics,
} from "../ats.types";

export function calculateMetrics(
  breakdown: ATSBreakdown
): ATSMetrics {
  return {
    resumeQuality: Math.min(
      100,
      breakdown.projects +
        breakdown.experience +
        breakdown.education +
        breakdown.formatting +
        25
    ),

    skillsMatch: Math.min(
      100,
      breakdown.skills * 4
    ),
  };
}