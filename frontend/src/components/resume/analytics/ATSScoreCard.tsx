import ScoreGauge from "../../charts/ScoreGauge";

interface ATSScoreCardProps {
  score: number;
}

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

      <h2 className="mb-4 text-2xl font-semibold text-white">
        ATS Score
      </h2>

      <ScoreGauge
        score={score}
        label="ATS Score"
      />

    </div>
  );
}