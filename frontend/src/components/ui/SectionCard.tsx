import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl backdrop-blur-sm",
        "transition-all duration-300 hover:border-blue-500/40",
        "p-6",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-6 flex items-start justify-between">

          <div>

            {title && (
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-400">
                {subtitle}
              </p>
            )}

          </div>

          {action}

        </div>
      )}

      {children}
    </section>
  );
}