import { cn } from "../../lib/cn";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  icon,
  onClick,
  disabled,
  className,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-xl border border-slate-700 bg-slate-900 p-2 transition-all duration-300",
        "hover:border-blue-500 hover:bg-slate-800",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {icon}
    </button>
  );
}