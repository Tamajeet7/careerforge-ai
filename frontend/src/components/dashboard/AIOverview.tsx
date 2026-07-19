import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AIOverview() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 p-8">

      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-4 flex w-fit items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">

            <Sparkles size={16} />

            AI Insight

          </div>

          <h2 className="text-3xl font-bold text-white">

            Your resume is performing well.

          </h2>

          <p className="mt-3 max-w-2xl text-slate-300">

            AI found 5 improvements that could increase your ATS
            score and improve your chances of getting shortlisted.

          </p>

        </div>

        <Link
          to="/ats-analyzer"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-500
          "
        >
          Optimize Resume

          <ArrowRight size={18} />

        </Link>

      </div>

    </section>
  );
}