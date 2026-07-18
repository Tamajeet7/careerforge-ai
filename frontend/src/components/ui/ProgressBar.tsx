import { cn } from "../../lib/cn";

interface ProgressBarProps {
  value: number;

  max?: number;

  label?: string;

  showValue?: boolean;

  className?: string;

  gradient?: string;
}

export default function ProgressBar({
  value,
  max = 100,

  label,

  showValue = false,

  className,

  gradient = "from-blue-500 to-cyan-400",
}: ProgressBarProps) {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  return (
    <div className={className}>

      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">

          {label && (
            <span className="text-sm text-slate-400">
              {label}
            </span>
          )}

          {showValue && (
            <span className="text-sm font-medium text-white">
              {Math.round(percentage)}%
            </span>
          )}

        </div>
      )}

      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full bg-slate-800"
        )}
      >

        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            gradient
          )}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}