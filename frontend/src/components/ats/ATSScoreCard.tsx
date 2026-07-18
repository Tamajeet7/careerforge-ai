import "react-circular-progressbar/dist/styles.css";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

interface ATSScoreCardProps {
  score: number;
}

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  let color = "#ef4444";
  let label = "Needs Improvement";

  if (score >= 80) {
    color = "#22c55e";
    label = "Excellent";
  } else if (score >= 60) {
    color = "#facc15";
    label = "Good";
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            ATS Score
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Applicant Tracking System Compatibility
          </p>
        </div>

        <div
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{
            backgroundColor: `${color}20`,
            color,
          }}
        >
          {label}
        </div>
      </div>

      <div className="mx-auto mt-8 w-52">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#1e293b",
            textColor: "#ffffff",
            strokeLinecap: "round",
            pathTransitionDuration: 1.5,
          })}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400">
          Overall Resume Score
        </p>

        <p
          className="mt-2 text-2xl font-bold"
          style={{ color }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}