import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  FileText,
  Bot,
} from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="relative py-32">

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <span className="rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-300">
            AI Powered Workflow
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Everything you need
            <br />
            to land your dream job.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            CareerForge combines resume optimization,
            ATS analysis, interview preparation and
            intelligent job matching into a single
            modern platform.
          </p>

          <div className="mt-10 space-y-5">

            <Feature text="Real-time ATS Score" />

            <Feature text="AI Resume Suggestions" />

            <Feature text="Interview Preparation" />

            <Feature text="Smart Job Matching" />

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-2xl">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

              <h3 className="text-2xl font-bold text-white">
                Resume Intelligence
              </h3>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
                Live Analysis
              </span>

            </div>

            {/* ATS */}

            <div className="rounded-2xl bg-white/5 p-6">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <TrendingUp className="text-blue-400" />

                  ATS Score

                </div>

                <span className="text-3xl font-bold text-green-400">
                  91%
                </span>

              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "91%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                />

              </div>

            </div>

            {/* Resume */}

            <div className="mt-8 rounded-2xl bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <FileText className="text-blue-400" />

                Resume Sections

              </div>

              <div className="mt-5 space-y-3">

                <Row
                  title="Projects"
                  score="Excellent"
                />

                <Row
                  title="Skills"
                  score="Strong"
                />

                <Row
                  title="Experience"
                  score="Excellent"
                />

                <Row
                  title="Education"
                  score="Good"
                />

              </div>

            </div>

            {/* AI */}

            <div className="mt-8 rounded-2xl bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <Bot className="text-blue-400" />

                AI Suggestions

              </div>

              <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">

                <li>✓ Add GitHub profile</li>

                <li>✓ Quantify project impact</li>

                <li>✓ Improve action verbs</li>

              </ul>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <CheckCircle2 className="text-green-400" />

      <span className="text-lg text-white">
        {text}
      </span>

    </div>
  );
}

function Row({
  title,
  score,
}: {
  title: string;
  score: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[var(--text-secondary)]">
        {title}
      </span>

      <span className="font-semibold text-white">
        {score}
      </span>

    </div>
  );
}