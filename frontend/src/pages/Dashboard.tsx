import DashboardLayout from "../components/layout/DashboardLayout";

import {
  PageContainer,
  PageHeader,
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

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageContainer>

        <PageHeader
          
          title="Dashboard"
          subtitle="Welcome back 👋 Here's an overview of your career progress."
        />

        <AIOverview />

        {/* Statistics */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <StatsCard
            title="Resume Score"
            value="82%"
            icon={<FileText />}
          />

          <StatsCard
            title="ATS Score"
            value="78%"
            icon={<Target />}
          />

          <StatsCard
            title="Applications"
            value="12"
            icon={<Briefcase />}
          />

        </section>

        {/* Quick Actions */}

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
              to="/resume"
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

          <CareerInsights />

        </section>

      </PageContainer>
    </DashboardLayout>
  );
}