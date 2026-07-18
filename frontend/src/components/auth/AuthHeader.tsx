import { BriefcaseBusiness } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-10 text-center">

      {/* Logo */}

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20">

        <BriefcaseBusiness
          size={38}
          className="text-white"
        />

      </div>

      {/* Brand */}

      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        CareerForge AI
      </h1>

      <p className="mt-2 text-lg font-medium text-slate-300">
        Your AI Career Copilot
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {subtitle}
      </p>

      {/* Divider */}

      <div className="mx-auto mt-8 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

    </div>
  );
}