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

      setResume(resumeData.data);

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

            <ReplaceSection
              onUploadSuccess={loadResume}
            />

          </div>
        )}

      </PageContainer>

    </DashboardLayout>
  );
}