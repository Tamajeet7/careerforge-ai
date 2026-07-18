import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layout/DashboardLayout";

import {
  PageContainer,
  PageHeader,
  Spinner,
} from "../ui";

import {
  AnalyticsGrid,
  ResumeUploader,
  ResumeWorkspace,
  ReplaceSection,
  SuggestionsPanel,
} from "../../../..";

import {
  getResume,
} from "./resume.service";

import {
  getATS,
} from "../../services/ats.service";

import type {
  Resume,
} from "./resume.types";

import type {
  ATSResult,
} from "../../types/ats.types";

export default function Resume() {
  const [resume, setResume] =
    useState<Resume | null>(null);

  const [ats, setATS] =
    useState<ATSResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadResume() {
    try {
      const [
        resumeData,
        atsData,
      ] = await Promise.all([
        getResume(),
        getATS(),
      ]);

      setResume(resumeData);

      setATS(atsData);
    } catch (error) {
      console.error(error);

      setResume(null);
      setATS(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResume();
  }, []);

  return (
    <DashboardLayout>

      <PageContainer>

        <PageHeader
          title="Resume Intelligence"
          subtitle={
            resume
              ? "Analyze, optimize and manage your resume with AI."
              : "Upload your resume to unlock AI-powered analysis."
          }
        />

        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">

            <Spinner />

          </div>
        ) : !resume ? (
          <ResumeUploader
            onUploadSuccess={loadResume}
          />
        ) : (
          <div className="space-y-8">

            {ats && (
              <AnalyticsGrid
                ats={ats}
              />
            )}

            {ats && (
              <ResumeWorkspace
                resume={resume}
                ats={ats}
              />
            )}

            {ats && (
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Score Breakdown
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(ats.breakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4">
                      <span className="text-sm font-medium text-slate-300 capitalize">{key}</span>
                      <span className="text-lg font-bold text-white">{value}/{key === "contact" ? 25 : key === "skills" ? 25 : key === "projects" ? 20 : key === "experience" ? 20 : key === "education" ? 12 : 10}</span>
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

            <ReplaceSection
              onUploadSuccess={loadResume}
            />

          </div>
        )}

      </PageContainer>

    </DashboardLayout>
  );
}