import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxListItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const CheckboxListItem = React.forwardRef<
  HTMLLabelElement,
  CheckboxListItemProps
>(({ id, label, checked, onChange, className }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={id}
      className={cn(
        "relative flex items-center w-full px-6 py-4 cursor-pointer transition-all duration-200",
        "border-b border-neutral-200",
        "hover:bg-primary-50",
        "active:bg-primary-100",
        "group",
        className
      )}
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Custom checkbox visual */}
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded border-2 transition-all duration-200 mr-4",
          "flex items-center justify-center",
          checked
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-neutral-300 group-hover:border-primary-400"
        )}
      >
        {/* Checkmark */}
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Label with strikethrough */}
      <span
        className={cn(
          "relative text-base font-medium transition-all duration-200 select-none",
          checked
            ? "text-neutral-400"
            : "text-neutral-900 group-hover:text-primary-600"
        )}
      >
        {label}

        {/* Strikethrough line */}
        {checked && (
          <span
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <span className="w-full border-t-2 border-neutral-400" />
          </span>
        )}
      </span>

      {/* Ripple effect on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
          "bg-gradient-to-r from-transparent via-primary-100/30 to-transparent"
        )}
      />
    </label>
  );
});

CheckboxListItem.displayName = "CheckboxListItem";

export { CheckboxListItem };
