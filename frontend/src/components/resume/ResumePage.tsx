import { useEffect } from "react";

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

import { useResumeContext } from "../../context/ResumeContext";

export default function Resume() {
  const {
    resume,
    parsed,
    loadingResume,
    loadAll,
    fetchResume,
  } = useResumeContext();

  useEffect(() => {
    fetchResume(false);
  }, [fetchResume]);

  const handleUploadSuccess = () => {
    loadAll(true);
  };

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

        {loadingResume && !resume ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Spinner />
          </div>
        ) : !resume ? (
          <ResumeUploader
            onUploadSuccess={handleUploadSuccess}
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
              onUploadSuccess={handleUploadSuccess}
            />
          </div>
        )}
      </PageContainer>
    </DashboardLayout>
  );
}
