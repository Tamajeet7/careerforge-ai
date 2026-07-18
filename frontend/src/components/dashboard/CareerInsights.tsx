import {
  TrendingUp,
  Target,
  Briefcase,
} from "lucide-react";

export default function CareerInsights() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Career Insights
      </h2>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <TrendingUp
              className="text-green-400"
              size={20}
            />

            <span className="text-slate-300">
              Resume Score
            </span>

          </div>

          <span className="font-semibold text-white">
            +8%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target
              className="text-blue-400"
              size={20}
            />

            <span className="text-slate-300">
              ATS Match
            </span>

          </div>

          <span className="font-semibold text-white">
            78%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Briefcase
              className="text-violet-400"
              size={20}
            />

            <span className="text-slate-300">
              Applications
            </span>

          </div>

          <span className="font-semibold text-white">
            12
          </span>

        </div>

      </div>

    </div>
  );
}