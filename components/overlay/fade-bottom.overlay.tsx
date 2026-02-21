import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function FadeBottomOverlay({ className = "" }: Props) {
  return <div className={cn("fade-bottom-overlay", className)}></div>;
}
