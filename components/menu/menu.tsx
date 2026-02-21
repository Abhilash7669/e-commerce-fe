import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Menu({ children, className = "" }: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 shadow-xs w-full py-5 px-12 bg-background/35 backdrop-blur-2xl border-b border-border",
        className,
      )}
    >
      {children}
    </header>
  );
}
