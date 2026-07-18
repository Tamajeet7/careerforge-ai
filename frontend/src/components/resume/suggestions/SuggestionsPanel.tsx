import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

interface SuggestionsPanelProps {
  suggestions: string[];
}

export default function SuggestionsPanel({
  suggestions,
}: SuggestionsPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <Lightbulb
            className="text-yellow-400"
            size={26}
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              AI Resume Coach
            </h2>

            <p className="text-sm text-slate-400">
              Personalized suggestions to improve your resume.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4">

        {suggestions.length === 0 ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">

            <div className="flex gap-4">

              <CheckCircle2
                className="mt-1 text-emerald-400"
                size={24}
              />

              <div>

                <h3 className="font-semibold text-white">
                  Excellent Resume
                </h3>

                <p className="mt-1 text-sm text-slate-300">
                  We couldn't find any major issues.
                  Keep your resume updated as your
                  experience grows.
                </p>

              </div>

            </div>

          </div>
        ) : (
          suggestions.map(
            (suggestion, index) => (
              <SuggestionCard
                key={index}
                suggestion={suggestion}
              />
            )
          )
        )}

      </div>

    </section>
  );
}

function SuggestionCard({
  suggestion,
}: {
  suggestion: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-blue-500">

      <div className="flex gap-4">

        <AlertTriangle
          size={22}
          className="mt-1 text-yellow-400"
        />

        <div>

          <h3 className="font-semibold text-white">
            Recommendation
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {suggestion}
          </p>

        </div>

      </div>

    </div>
  );
}