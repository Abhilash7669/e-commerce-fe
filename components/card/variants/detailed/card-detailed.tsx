import CardIndex from "@/components/card/card-index";
import FadeBottomOverlay from "@/components/overlay/fade-bottom.overlay";
import Pill from "@/components/pills/pill";
import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

// todo: crude type implementation
type Props = {
  className?: string;
  name: string;
  basePrice: number;
  image?: string;
  type?: string;
};

// todo: later implement other features

export default function CardDetailed({
  className = "",
  basePrice,
  image,
  name,
  type,
}: Props) {
  return (
    <div className="space-y-2 h-auto">
      <CardIndex className={cn("h-114 peer", className)}>
        {type && (
          <CardHeader>
            <Pill className="uppercase">{type}</Pill>
          </CardHeader>
        )}
        <Image
          loading="lazy"
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 ease-in-out -z-20"
          fill
          src={image || "/hero/testing-c.jpg"}
          alt="product"
        />
        <FadeBottomOverlay />
      </CardIndex>
      <div className="peer-hover:[&>p:first-of-type]:text-primary">
        <p className="text-base transition-colors duration-300 ease-in-out text-foreground font-playfair-display">
          {name}
        </p>
        <p className="text-sm font-medium text-muted-foreground">{basePrice}</p>
      </div>
    </div>
  );
}
