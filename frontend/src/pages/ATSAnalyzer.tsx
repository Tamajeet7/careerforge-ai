import {
  useEffect,
  useState,
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

import {
  getResume,
  getParsedResume,
} from "../components/resume/resume.service";

import {
  getATS,
} from "../services/ats.service";

import type {
  Resume,
  ATSResult,
  ParsedResume,
} from "../components/resume/resume.types";

export default function ATSAnalyzer() {
  const [resume, setResume] =
    useState<Resume | null>(null);

  const [parsed, setParsed] =
    useState<ParsedResume | null>(null);

  const [ats, setATS] =
    useState<ATSResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    setLoading(true);

    try {
      const [
        resumeData,
        atsData,
        parsedData,
      ] = await Promise.all([
        getResume(),
        getATS(),
        getParsedResume().catch(() => null),
      ]);

      setResume(resumeData);
      setATS(atsData);
      setParsed(parsedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="ATS Analyzer"
          subtitle="AI-powered analysis of your resume's ATS compatibility and optimization suggestions."
        />

        {loading ? (
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
                leftIcon={<RefreshCw size={16} />}
                onClick={loadData}
              >
                Reanalyze
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(ats.breakdown).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4"
                    >
                      <span className="text-sm font-medium text-slate-300 capitalize">
                        {key}
                      </span>
                      <span className="text-lg font-bold text-white">
                        {value}/{key === "contact" ? 10 : key === "skills" ? 15 : key === "projects" ? 12 : key === "experience" ? 18 : key === "education" ? 10 : 10}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {ats && ats.suggestions.length > 0 && (
              <SuggestionsPanel
                suggestions={ats.suggestions}
              />
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
