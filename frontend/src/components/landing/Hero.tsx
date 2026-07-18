import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  FileText,
  Briefcase,
  Bot,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--primary-dark)] pt-36 pb-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[160px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-700/40 bg-blue-700/10 px-4 py-2 text-sm text-blue-300">
            <Sparkles size={16} />
            AI Career Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
            Land Your
            <br />

            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Dream Career
            </span>

            <br />

            with AI.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
            CareerForge helps students optimize resumes,
            discover internships and prepare for interviews
            using AI-powered career intelligence.
          </p>

          <div className="mt-6 flex flex-wrap gap-5">

            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-8 py-6 font-semibold text-white shadow-xl shadow-blue-900/30 transition hover:-translate-y-1">
              Get Started Free
              <ArrowRight size={18} />
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-8 py-6 font-semibold text-white transition hover:bg-white/5">
              <Play size={18} />
              Watch Demo
            </button>

          </div>

          <div className="mt-12 flex gap-10">

            <div>
              <h3 className="text-3xl font-bold text-white">
                10K+
              </h3>

              <p className="text-[var(--text-muted)]">
                Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                95%
              </h3>

              <p className="text-[var(--text-muted)]">
                ATS Accuracy
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                24/7
              </h3>

              <p className="text-[var(--text-muted)]">
                AI Support
              </p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative"
        >

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Career Dashboard
              </h2>

              <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
                Live
              </div>

            </div>

            <div className="grid gap-5">

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-400" />
                  Resume Score
                </div>

                <span className="text-2xl font-bold text-white">
                  91%
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-blue-400" />
                  Applications
                </div>

                <span className="text-2xl font-bold text-white">
                  17
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <Bot className="text-blue-400" />
                  Interview Score
                </div>

                <span className="text-2xl font-bold text-white">
                  89%
                </span>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}