import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ButtonSecondary({ children, className = "" }: Props) {
  return (
    <Button className={cn("", className)} variant={"secondary"}>
      {children}
    </Button>
  );
}
