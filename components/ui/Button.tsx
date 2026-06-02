// A minimal, reusable button with Tailwind classes.
// Note: props are typed so you get autocomplete + safety as you code.
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  // Keep styles token-like: base, then variant modifiers.
  const base =
    " bg-[var(--color-primary)] cursor-pointer inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-[transform,opacity,background-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60 focus-visible:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-primary)] text-white active:scale-[0.98] dark:bg-[var(--color-primary)] dark:text-white-900 relative overflow-hidden transition-all duration-300 hover:animate-gradient-wave before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:pointer-events-none",

ghost: "bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] active:scale-[0.98] dark:text-white-900 relative overflow-hidden transition-all duration-300 hover:animate-gradient-wave before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:pointer-events-none",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      // `...props` forwards things like onClick, disabled, etc.
      {...props}
    />
  );
}
