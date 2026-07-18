import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import InterviewDemo from "../components/landing/InterviewDemo";
import DashboardPreview from "../components/landing/DashboardPreview";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[var(--primary-dark)]">
      <Navbar />

      <Hero />

      <Features />

      <InterviewDemo />

      <DashboardPreview />
    </main>
  );
}