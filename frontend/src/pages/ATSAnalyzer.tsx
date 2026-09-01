import {
  useEffect,
} from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  PageContainer,
  PageHeader,
  Spinner,
  Button,
} from "../components/ui";

import ATSScoreCard from "../components/resume/analytics/ATSScoreCard";
import SuggestionsPanel from "../components/resume/suggestions/SuggestionsPanel";
import MetricCard from "../components/ui/MetricCard";

import {
  TrendingUp,
  Brain,
  ShieldCheck,
  RefreshCw,
  FileText,
} from "lucide-react";

import { useResumeContext } from "../context/ResumeContext";

export default function ATSAnalyzer() {
  const {
    resume,
    parsed,
    ats,
    loadingATS,
    loadingResume,
    fetchResume,
    fetchATS,
  } = useResumeContext();

  useEffect(() => {
    fetchResume(false);
    fetchATS(false);
  }, [fetchResume, fetchATS]);

  const handleReanalyze = () => {
    fetchATS(true);
  };

  const isLoading = (loadingResume && !resume) || (loadingATS && !ats);

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="ATS Analyzer"
          subtitle="AI-powered analysis of your resume's ATS compatibility and optimization suggestions."
        />

        {isLoading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Spinner />
          </div>
        ) : !resume ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 p-16 text-center">
            <FileText size={64} className="mb-6 text-slate-600" />
            <h2 className="text-2xl font-bold text-white">
              No Resume Uploaded
            </h2>
            <p className="mt-3 mb-8 text-slate-400">
              Upload your resume first to see ATS analysis.
            </p>
            <Button onClick={() => window.location.href = "/resume"}>
              Go to Resume Page
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Analyzing: <span className="font-medium text-slate-200">{resume.fileName}</span>
              </p>
              <Button
                variant="secondary"
                loading={loadingATS}
                leftIcon={<RefreshCw size={16} />}
                onClick={handleReanalyze}
              >
                {loadingATS ? "Analyzing..." : "Reanalyze"}
              </Button>
            </div>

            <section className="grid gap-6 xl:grid-cols-2">
              <ATSScoreCard score={ats?.score ?? 0} />

              <div className="grid gap-6 sm:grid-cols-2">
                <MetricCard
                  title="Resume Quality"
                  value={`${ats?.resumeQuality ?? 0}%`}
                  icon={<TrendingUp size={28} />}
                />
                <MetricCard
                  title="Skills Match"
                  value={`${ats?.skillsMatch ?? 0}%`}
                  icon={<Brain size={28} />}
                />
                <MetricCard
                  title="AI Confidence"
                  value={ats?.aiConfidence ?? "N/A"}
                  icon={<ShieldCheck size={28} />}
                />
                <MetricCard
                  title="Recruiter Readiness"
                  value={ats?.recruiterReadiness ?? "N/A"}
                  icon={<TrendingUp size={28} />}
                />
              </div>
            </section>

            {ats && (
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Score Breakdown
                </h2>
                <div className="space-y-4">
                  {Object.entries(ats.breakdown).map(([key, value]) => {
                    const score = Math.round(value as number);
                    const color =
                      score >= 80 ? "bg-emerald-500" :
                      score >= 60 ? "bg-blue-500" :
                      score >= 40 ? "bg-amber-500" : "bg-red-500";
                    return (
                      <div key={key}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium capitalize text-slate-300">{key}</span>
                          <span className="text-sm font-bold text-white">{score}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${color}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {ats && ats.strengths?.length > 0 && ats.weaknesses?.length > 0 && (
              <section className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-400">
                    <span>✓</span> Strengths
                  </h2>
                  <ul className="space-y-2">
                    {ats.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
                    <span>✗</span> Weaknesses
                  </h2>
                  <ul className="space-y-2">
                    {ats.weaknesses.map((w, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {ats && ats.suggestions?.length > 0 && (
              <SuggestionsPanel suggestions={ats.suggestions} />
            )}

            {parsed && (
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Extracted Resume Data
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Contact
                    </h3>
                    <div className="space-y-1 text-slate-200">
                      <p>{parsed.contact.name}</p>
                      <p>{parsed.contact.email}</p>
                      <p>{parsed.contact.phone}</p>
                      {parsed.contact.location && <p>{parsed.contact.location}</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Links
                    </h3>
                    <div className="space-y-1 text-slate-200">
                      {parsed.links.linkedin && <p>LinkedIn: {parsed.links.linkedin}</p>}
                      {parsed.links.github && <p>GitHub: {parsed.links.github}</p>}
                      {parsed.links.portfolio && <p>Portfolio: {parsed.links.portfolio}</p>}
                      {parsed.links.website && <p>Website: {parsed.links.website}</p>}
                      {!parsed.links.linkedin && !parsed.links.github && !parsed.links.portfolio && !parsed.links.website && (
                        <p className="text-slate-500">No links detected</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </PageContainer>
    </DashboardLayout>
  );
}
