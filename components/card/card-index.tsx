import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardIndex({ children, className = "" }: Props) {
  return (
    <Card
      className={cn(
        "h-80 relative overflow-hidden px-1 py-8 bg-transparent group",
        className,
      )}
    >
      {children}
    </Card>
  );
}
