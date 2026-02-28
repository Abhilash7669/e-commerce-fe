import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
};

export default function ButtonPickerCompact({
  onClick = undefined,
  isActive = false,
  children,
}: Props) {
  return (
    <li>
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "w-fit justify-start font-inter text-sm font-normal",
          isActive
            ? "text-terracotta font-medium bg-terracotta/10"
            : "text-warm-gray hover:text-foreground hover:bg-muted",
        )}
      >
        {children}
      </Button>
    </li>
  );
}
