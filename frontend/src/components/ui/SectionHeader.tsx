interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between">

      <div>

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}