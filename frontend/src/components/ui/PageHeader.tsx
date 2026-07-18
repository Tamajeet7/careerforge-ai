import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-10 flex items-start justify-between">

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-lg text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div>
          {action}
        </div>
      )}

    </div>
  );
}