import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => Promise<void> | void;
};

export default function ButtonSecondary({
  children,
  className = "",
  onClick,
}: Props) {
  return (
    // todo: make button accept all html button props
    <Button
      onClick={onClick}
      className={cn("", className)}
      variant={"secondary"}
    >
      {children}
    </Button>
  );
}
