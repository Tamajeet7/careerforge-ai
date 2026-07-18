import ATSScoreCard from "./ATSScoreCard";
import MetricCard from "../../ui/MetricCard";

import {
  TrendingUp,
  Brain,
  ShieldCheck,
} from "lucide-react";

import type {
  ATSResult,
} from "../../../types/ats.types";

interface Props {
  ats: ATSResult;
}

export default function AnalyticsGrid({
  ats,
}: Props) {
  return (
    <section className="grid gap-6 xl:grid-cols-2">

      <ATSScoreCard
        score={ats.score}
      />

      <div className="grid gap-6 sm:grid-cols-2">

        <MetricCard
          title="Resume Quality"
          value={`${ats.resumeQuality}%`}
          icon={<TrendingUp size={28} />}
        />

        <MetricCard
          title="Skills Match"
          value={`${ats.skillsMatch}%`}
          icon={<Brain size={28} />}
        />

        <MetricCard
          title="AI Confidence"
          value={ats.aiConfidence}
          icon={<ShieldCheck size={28} />}
        />

        <MetricCard
          title="Recruiter Readiness"
          value={ats.recruiterReadiness}
          icon={<TrendingUp size={28} />}
        />

      </div>

    </section>
  );
}