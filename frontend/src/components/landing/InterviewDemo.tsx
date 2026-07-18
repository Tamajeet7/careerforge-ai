import { motion } from "framer-motion";
import {
  Bot,
  Star,
  ArrowRight,
} from "lucide-react";

export default function InterviewDemo() {
  return (
    <section className="relative py-32">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-20 text-center">

          <span className="rounded-full border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm text-blue-300">
            AI Interview Coach
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Practice interviews.
            <br />
            Build confidence.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            Practice HR and technical interviews with
            AI that provides instant feedback,
            confidence analysis and improvement
            suggestions.
          </p>

        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Chat */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
          >

            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">

                <Bot className="text-white" />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  AI Interviewer
                </h3>

                <p className="text-sm text-green-400">
                  Live Session
                </p>

              </div>

            </div>

            <Bubble
              ai
              text="Tell me about yourself."
            />

            <Bubble
              text="I'm an Electrical Engineering student passionate about software engineering and AI. I've built full-stack projects using React, TypeScript and Express..."
            />

            <Bubble
              ai
              text="Great answer! You explained your background clearly. Try adding measurable achievements."
            />

          </motion.div>

          {/* Analytics */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <ScoreCard
              title="Confidence"
              value="91%"
            />

            <ScoreCard
              title="Communication"
              value="89%"
            />

            <ScoreCard
              title="Technical Accuracy"
              value="94%"
            />

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">

              <h3 className="mb-6 text-xl font-bold text-white">
                AI Feedback
              </h3>

              <ul className="space-y-4 text-[var(--text-secondary)]">

                <li>✓ Excellent confidence</li>

                <li>✓ Good technical clarity</li>

                <li>✓ Maintain eye contact</li>

                <li>✓ Quantify achievements</li>

              </ul>

              <button className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-6 py-3 font-semibold text-white">

                Start Interview

                <ArrowRight size={18} />

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function Bubble({
  text,
  ai = false,
}: {
  text: string;
  ai?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex ${
        ai
          ? "justify-start"
          : "justify-end"
      }`}
    >
      <div
        className={`max-w-sm rounded-2xl px-5 py-4 ${
          ai
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Star className="text-yellow-400" />

          <span className="text-white">
            {title}
          </span>

        </div>

        <span className="text-3xl font-bold text-green-400">
          {value}
        </span>

      </div>

    </div>
  );
}