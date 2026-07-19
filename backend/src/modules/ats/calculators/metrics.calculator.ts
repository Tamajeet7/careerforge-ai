import type {
  ATSBreakdown,
  ATSMetrics,
} from "../ats.types";

export function calculateMetrics(
  breakdown: ATSBreakdown
): ATSMetrics {
  const contentScore =
    breakdown.projects +
    breakdown.experience +
    breakdown.education +
    breakdown.formatting;

  const resumeQuality = Math.min(
    100,
    Math.round((contentScore / 50) * 100)
  );

  const skillsMatch = Math.min(
    100,
    Math.round((breakdown.skills / 15) * 100)
  );

  return { resumeQuality, skillsMatch };
}