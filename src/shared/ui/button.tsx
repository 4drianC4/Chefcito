import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/src/shared/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary"
          ? "bg-emerald-700 text-white shadow-lg shadow-emerald-950/20 hover:bg-emerald-600 dark:bg-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400"
          : "border border-stone-300 bg-white text-stone-800 hover:border-emerald-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-emerald-400",
        className,
      )}
      {...props}
    />
  );
}