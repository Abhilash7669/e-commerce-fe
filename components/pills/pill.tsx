import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className = "" }: Props) {
  return (
    <div
      className={cn(
        `
        relative overflow-hidden
        rounded-full w-fit px-4 py-1.5
        flex items-center justify-center gap-2

        backdrop-blur-xl

        bg-[color-mix(in_oklch,var(--accent)_35%,white_65%)]/60
        dark:bg-[color-mix(in_oklch,var(--accent)_40%,black_60%)]/60

        border border-white/30 dark:border-white/10
        shadow-[0_6px_24px_rgba(0,0,0,0.12)]

        text-accent-foreground
        text-xs font-medium
        [&_p]:text-xs [&_p]:font-medium
        `,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-red/40 via-white/10 to-transparent opacity-40" />
      {children}
    </div>
  );
}
