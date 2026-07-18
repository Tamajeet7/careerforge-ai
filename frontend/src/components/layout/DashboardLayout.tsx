import type { ReactNode } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="min-h-screen">
        <Navbar />

        <main className="mx-auto max-w-7xl px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}