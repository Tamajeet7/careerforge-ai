import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  PageContainer,
  PageHeader,
  Spinner,
} from "../components/ui";

import StatsCard from "../components/dashboard/StatsCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import CareerInsights from "../components/dashboard/CareerInsights";
import AIOverview from "../components/dashboard/AIOverview";

import {
  Upload,
  Bot,
  BriefcaseBusiness,
  Sparkles,
  FileText,
  Target,
  Briefcase,
} from "lucide-react";

import { useResumeContext } from "../context/ResumeContext";

export default function Dashboard() {
  const { resume, ats, loadingResume, loadingATS, fetchResume, fetchATS } =
    useResumeContext();

  useEffect(() => {
    fetchResume(false);
    fetchATS(false);
  }, [fetchResume, fetchATS]);

  const loading = (loadingResume && !resume) || (loadingATS && !ats);

  return (
    <DashboardLayout>
      <PageContainer>

        <PageHeader
          title="Dashboard"
          subtitle="Welcome back 👋 Here's an overview of your career progress."
        />

        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <AIOverview />

            <section className="mt-10 grid gap-6 md:grid-cols-3">

              <StatsCard
                title="Resume Score"
                value={ats ? `${ats.resumeQuality}%` : "N/A"}
                icon={<FileText />}
              />

              <StatsCard
                title="ATS Score"
                value={ats ? `${ats.score}%` : "N/A"}
                icon={<Target />}
              />

              <StatsCard
                title="Skills Found"
                value={resume?.skills ? resume.skills.length.toString() : "0"}
                icon={<Sparkles />}
              />

            </section>

            <section className="mt-12">

              <h2 className="mb-6 text-2xl font-semibold text-white">
                Quick Actions
              </h2>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <QuickActionCard
                  title="Upload Resume"
                  description="Upload your latest resume for AI analysis."
                  icon={<Upload />}
                  to="/resume"
                />

                <QuickActionCard
                  title="ATS Analyzer"
                  description="Check how ATS-friendly your resume is."
                  icon={<Sparkles />}
                  to="/ats-analyzer"
                />

                <QuickActionCard
                  title="AI Interview"
                  description="Practice technical and HR interviews."
                  icon={<Bot />}
                  to="/interview"
                />

                <QuickActionCard
                  title="Find Jobs"
                  description="Discover matching internship opportunities."
                  icon={<BriefcaseBusiness />}
                  to="/jobs"
                />

              </div>

            </section>

            <section className="mt-12 grid gap-6 lg:grid-cols-3">

              <div className="lg:col-span-2">
                <RecentActivity />
              </div>

              <CareerInsights
                ats={ats}
              />

            </section>
          </>
        )}

      </PageContainer>
    </DashboardLayout>
  );
}