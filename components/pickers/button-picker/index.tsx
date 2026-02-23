import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  isActive?: boolean | undefined;
  onClick?: () => void;
  label: string;
};

export default function ButtonPicker({
  onClick = undefined,
  isActive = false,
  label = "Hello there",
}: Props) {
  return (
    <li>
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "w-full justify-start font-inter text-sm font-normal",
          isActive
            ? "text-warm-gray hover:text-foreground hover:bg-muted"
            : "text-terracotta font-medium bg-terracotta/10",
        )}
      >
        {label}
      </Button>
    </li>
  );
}
