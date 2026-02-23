import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardListing({ children, className = "" }: Props) {
  return (
    <ul
      className={cn(
        "grid sm:grid-cols-2 xl:grid-cols-4 gap-6",
        className,
      )}
    >
      {children}
    </ul>
  );
}
