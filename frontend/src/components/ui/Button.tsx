import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import Spinner from "./Spinner";

import { cn } from "../../lib/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";

  size?:
    | "sm"
    | "md"
    | "lg";

  loading?: boolean;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/20",

  secondary:
    "border border-slate-700 bg-slate-800 text-white hover:bg-slate-700",

  danger:
    "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20",

  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-800",
};

const sizes = {
  sm: "px-3 py-2 text-sm",

  md: "px-5 py-3",

  lg: "px-6 py-4 text-lg",
};

export default function Button({
  children,
  className,

  variant = "primary",
  size = "md",

  loading = false,
  fullWidth = false,

  leftIcon,
  rightIcon,

  disabled,

  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2",

        "rounded-xl",

        "font-semibold",

        "transition-all duration-300",

        "focus:outline-none",

        "focus:ring-2 focus:ring-blue-500/40",

        "disabled:cursor-not-allowed",

        "disabled:opacity-50",

        "active:scale-95",

        "hover:-translate-y-0.5",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />

          Loading...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </button>
  );
}