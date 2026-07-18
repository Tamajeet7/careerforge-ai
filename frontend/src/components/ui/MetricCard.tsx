import SectionCard from "./SectionCard";

interface MetricCardProps {
  title: string;

  value: string | number;

  subtitle?: string;

  icon?: React.ReactNode;

  action?: React.ReactNode;

  align?: "left" | "center";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  action,
  align = "left",
}: MetricCardProps) {
  return (
    <SectionCard>

      <div
        className={`flex items-start justify-between ${
          align === "center"
            ? "text-center"
            : ""
        }`}
      >

        <div
          className={
            align === "center"
              ? "w-full"
              : ""
          }
        >

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {icon && (
          <div className="text-blue-400">
            {icon}
          </div>
        )}

      </div>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}

    </SectionCard>
  );
}