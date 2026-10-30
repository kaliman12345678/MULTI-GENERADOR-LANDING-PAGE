import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "bg-orange-600 text-white hover:bg-orange-700 shadow-sm": variant === "default",
            "border border-slate-300 bg-white hover:bg-slate-50 text-slate-800": variant === "outline",
            "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
            "hover:bg-slate-100 text-slate-800": variant === "ghost",
            "h-10 px-4 py-2 text-sm rounded-xl": size === "default",
            "h-8 px-3 text-xs rounded-lg": size === "sm",
            "h-12 px-6 text-base rounded-2xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
