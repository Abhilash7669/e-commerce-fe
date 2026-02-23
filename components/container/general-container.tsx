import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function GeneralContainer({ className, children }: Props) {
  return (
    <ul className={cn("grid sm:grid-cols-2 xl:grid-cols-4 gap-6", className)}>
      {children}
    </ul>
  );
}
