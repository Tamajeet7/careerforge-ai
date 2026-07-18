import { cn } from "../../lib/cn";

interface StatItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export default function StatItem({
  label,
  value,
  className,
}: StatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-slate-800 py-3 last:border-none",
        className
      )}
    >
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-right font-medium text-white">
        {value}
      </span>
    </div>
  );
}