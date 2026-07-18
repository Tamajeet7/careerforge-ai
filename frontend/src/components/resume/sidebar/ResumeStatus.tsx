import {
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import {
  SectionCard,
  DetailRow,
  StatusBadge,
} from "../../ui";

import type {
  ATSResult,
} from "../resume.types";

interface Props {
  ats: ATSResult;
  updatedAt: string;
}

export default function ResumeStatus({
  ats,
  updatedAt,
}: Props) {
  const good =
    ats.score >= 85;

  return (
    <SectionCard
      title="Resume Status"
      subtitle="Latest AI analysis"
    >
      <div className="flex items-center gap-4">

        {good ? (
          <CheckCircle2
            className="text-emerald-400"
            size={34}
          />
        ) : (
          <AlertTriangle
            className="text-yellow-400"
            size={34}
          />
        )}

        <div>

          <h3 className="text-lg font-semibold text-white">
            {ats.recruiterReadiness}
          </h3>

          <p className="text-slate-400">
            ATS Score {ats.score}/100
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        <DetailRow
          icon={<Clock3 size={16} />}
          label="Last Analysis"
          value={new Date(
            updatedAt
          ).toLocaleString()}
        />

        <DetailRow
          label="Confidence"
          value={
            <StatusBadge
              variant={
                ats.aiConfidence ===
                "High"
                  ? "success"
                  : ats.aiConfidence ===
                    "Medium"
                  ? "warning"
                  : "danger"
              }
            >
              {ats.aiConfidence}
            </StatusBadge>
          }
        />

      </div>

    </SectionCard>
  );
}