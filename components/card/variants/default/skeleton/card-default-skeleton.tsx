import CardIndex from "@/components/card/card-index";
import { CardFooter } from "@/components/ui/card";

export default function CardDefaultSkeleton() {
  return (
    <CardIndex className="h-120 flex justify-end shimmer">
      <CardFooter className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-3">
            <div className="h-7 w-40 rounded-md shimmer" />
            <div className="h-4 w-60 rounded-md shimmer" />
          </div>

          <div className="h-10 w-10 rounded-full shimmer" />
        </div>
      </CardFooter>
    </CardIndex>
  );
}
