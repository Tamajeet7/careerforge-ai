import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--primary-dark)] px-6 py-16">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--primary)]/20 blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[160px]" />

      </div>

      {/* Grid Pattern */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}

      <div className="relative z-10 w-full max-w-lg">

        {children}

      </div>

    </div>
  );
}