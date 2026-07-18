import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function MetricCard({
  title,
  value,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}