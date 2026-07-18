import type { LabelHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export default function Label({
  children,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-slate-300",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}