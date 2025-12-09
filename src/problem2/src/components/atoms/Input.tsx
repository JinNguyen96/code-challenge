import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = "", ...rest }, ref) => {
    const baseClasses = `
      w-full bg-transparent text-xl outline-none text-brand-500
      placeholder:text-brand-500/30 transition-all
    `;
    const errorClasses = error ? "!text-accent-error" : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-brand-500/70 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...rest}
        />
        {error && (
          <p className="text-accent-error text-xs mt-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
