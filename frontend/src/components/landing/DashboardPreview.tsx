import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Bot,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-20 text-center">

          <span className="rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-300">
            Unified Dashboard
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Everything in one place.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--text-secondary)]">
            Track resume quality, interview readiness,
            applications and AI recommendations from a
            single intelligent dashboard.
          </p>

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-10 shadow-2xl"
        >

          {/* Top Cards */}

          <div className="grid gap-6 md:grid-cols-4">

            <StatCard
              icon={<FileText />}
              title="Resume Score"
              value="91%"
            />

            <StatCard
              icon={<Bot />}
              title="Interview Ready"
              value="89%"
            />

            <StatCard
              icon={<Briefcase />}
              title="Applications"
              value="17"
            />

            <StatCard
              icon={<TrendingUp />}
              title="Profile Strength"
              value="94%"
            />

          </div>

          {/* Bottom */}

          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            {/* Activity */}

            <div className="rounded-3xl bg-white/5 p-8">

              <h3 className="mb-6 text-xl font-bold text-white">
                Recent Activity
              </h3>

              <Activity text="Resume uploaded" />

              <Activity text="ATS score increased to 91%" />

              <Activity text="Interview completed" />

              <Activity text="New job recommendation" />

            </div>

            {/* AI */}

            <div className="rounded-3xl bg-white/5 p-8">

              <h3 className="mb-6 text-xl font-bold text-white">
                AI Recommendation
              </h3>

              <div className="rounded-2xl bg-[var(--primary-dark)] p-6">

                <p className="text-sm text-slate-400">
                  Best Match
                </p>

                <h4 className="mt-2 text-2xl font-bold text-white">
                  Software Engineer Intern
                </h4>

                <p className="mt-2 text-blue-400">
                  Google
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-white">
                    Match Score
                  </span>

                  <span className="text-3xl font-bold text-green-400">
                    92%
                  </span>

                </div>

                <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] py-3 font-semibold text-white">
                  View Recommendation
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-6">

      <div className="mb-4 text-blue-400">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">

      <CheckCircle2 className="text-green-400" />

      <span className="text-white">
        {text}
      </span>

    </div>
  );
}