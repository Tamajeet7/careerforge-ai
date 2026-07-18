import type {
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

interface CardProps {
  children: ReactNode;

  className?: string;

  hover?: boolean;

  padding?: boolean;
}

export default function Card({
  children,

  className,

  hover = true,

  padding = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",

        "border border-slate-800",

        "bg-slate-900/80",

        "backdrop-blur-xl",

        "shadow-xl",

        "transition-all duration-300",

        hover &&
          "hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10",

        padding && "p-6",

        className
      )}
    >
      {children}
    </div>
  );
}