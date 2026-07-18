import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-8 py-16 text-center">

      {icon && (
        <div className="mb-6 rounded-2xl bg-blue-500/10 p-5 text-blue-400">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}

    </div>
  );
}