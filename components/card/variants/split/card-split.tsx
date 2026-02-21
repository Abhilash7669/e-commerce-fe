import CardIndex from "@/components/card/card-index";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  className?: string;
  data: {
    previewImageUrl?: string;
    name: string;
    description?: string;
  };
  linkText?: string;
};

export default function CardSplit({
  className = "",
  data,
  linkText = "",
}: Props) {
  return (
    <CardIndex
      className={cn(
        "p-0 hover:shadow-xl transition-shadow duration-300",
        className,
      )}
    >
      <div className="h-3/4 overflow-hidden">
        <Image
          src={`${data.previewImageUrl || "/hero/scenery.jpg"}`}
          alt="category-image"
          height={200}
          width={200}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 ease-in-out -z-10"
          loading="lazy"
        />
      </div>
      <div className="bg-white/80 space-y-4 p-4 flex flex-col items-start justify-end">
        <div className="space-y-1">
          <h4 className="font-semibold text-xl group-hover:text-primary transition-colors duration-300">
            {data.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {data.description || "Description here"}
          </p>
        </div>
        <p className="text-primary text-sm flex items-center gap-2">
          {linkText || "View more"}
          <FaArrowRight className="group-hover:translate-x-1 h-3! w-3! relative transition-transform duration-200 ease-in-out" />
        </p>
      </div>
    </CardIndex>
  );
}
