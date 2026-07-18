import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

interface DetailRowProps {
  icon?: ReactNode;

  label: string;

  value: ReactNode;

  border?: boolean;

  className?: string;
}

export default function DetailRow({
  icon,
  label,
  value,
  border = false,
  className,
}: DetailRowProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 py-3",

        border &&
          "border-b border-slate-800 last:border-none",

        className
      )}
    >

      {icon && (
        <div className="mt-1 text-blue-500">
          {icon}
        </div>
      )}

      <div className="flex-1">

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <div className="mt-1 break-words text-sm font-medium text-white">
          {value}
        </div>

      </div>

    </div>
  );
}