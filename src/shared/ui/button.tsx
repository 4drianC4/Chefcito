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
          ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/20 hover:bg-amber-300"
          : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500",
        className,
      )}
      {...props}
    />
  );
}