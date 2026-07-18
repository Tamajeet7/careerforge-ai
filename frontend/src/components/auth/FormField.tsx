import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <div className="mb-6">

      {/* Label */}

      <label className="mb-2 block text-sm font-semibold text-slate-200">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      {/* Input */}

      {children}

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">
          {error}
        </p>
      )}

      {/* Helper */}

      {!error && helperText && (
        <p className="mt-2 text-sm text-slate-500">
          {helperText}
        </p>
      )}

    </div>
  );
}