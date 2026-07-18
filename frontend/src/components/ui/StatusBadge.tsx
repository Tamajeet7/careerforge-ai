import { cn } from "../../lib/cn";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

  warning:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

  danger:
    "border-red-500/30 bg-red-500/10 text-red-400",

  info:
    "border-blue-500/30 bg-blue-500/10 text-blue-400",

  neutral:
    "border-slate-700 bg-slate-800 text-slate-300",
};

export default function StatusBadge({
  children,
  variant = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}