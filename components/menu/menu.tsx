import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Menu({ children, className = "" }: Props) {
  return <header className={cn("bg-background p-5", className)}>{children}</header>;
}
