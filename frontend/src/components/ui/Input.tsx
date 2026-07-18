import {
  forwardRef,
  useState,
} from "react";

import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { cn } from "../../lib/cn";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      type,
      leftIcon,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword =
      type === "password";

    return (
      <div className="w-full">

        <div
          className={cn(
            "flex items-center",

            "rounded-xl",

            "border",

            "bg-slate-900/80",

            "backdrop-blur-xl",

            "transition-all duration-300",

            error
              ? "border-red-500"
              : "border-slate-700 hover:border-slate-500 focus-within:border-blue-500",

            "focus-within:ring-2 focus-within:ring-blue-500/20"
          )}
        >

          {leftIcon && (
            <div className="pl-4 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={cn(
              "w-full",

              "bg-transparent",

              "px-4 py-3",

              "text-white",

              "placeholder:text-slate-500",

              "outline-none",

              className
            )}
            {...props}
          />

          {isPassword && (

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="px-4 text-slate-400 transition hover:text-white"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          )}

        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;