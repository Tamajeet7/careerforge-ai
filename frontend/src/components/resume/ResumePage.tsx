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

import ResumePreview from "./preview/ResumePreview";
import ResumeUploader from "./upload/ResumeUploader";
import ReplaceSection from "./upload/ReplaceSection";
import ResumeParserDisplay from "./ResumeParserDisplay";

import {
  getResume,
  getParsedResume,
} from "./resume.service";

import type {
  Resume,
  ParsedResume,
} from "./resume.types";

export default function Resume() {
  const [resume, setResume] =
    useState<Resume | null>(null);

  const [parsed, setParsed] =
    useState<ParsedResume | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadResume() {
    try {
      const resumeData =
        await getResume();

      setResume(resumeData);

      const parsedData =
        await getParsedResume().catch(
          () => null
        );

      setParsed(parsedData);
    } catch (error) {
      console.error(error);
      setResume(null);
      setParsed(null);
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
          title="Resume"
          subtitle={
            resume
              ? "Preview and review the extracted content from your resume."
              : "Upload your resume to preview its contents."
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
            <ResumePreview
              resume={resume}
            />

            {parsed && (
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                  Extracted Content
                </h2>
                <p className="mb-6 text-sm text-slate-400">
                  Everything the AI extracted from your resume,
                  exactly as written.
                </p>
                <ResumeParserDisplay parsed={parsed} />
              </section>
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
