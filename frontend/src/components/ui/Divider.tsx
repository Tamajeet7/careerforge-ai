import { cn } from "../../lib/cn";

interface DividerProps {
  className?: string;
  label?: string;
}

export default function Divider({
  className,
  label,
}: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn(
          "border-slate-800",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        className
      )}
    >
      <div className="h-px flex-1 bg-slate-800" />

      <span className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </span>

      <div className="h-px flex-1 bg-slate-800" />
    </div>
  );
}