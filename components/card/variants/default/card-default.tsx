import FadeBottomOverlay from "@/components/overlay/fade-bottom.overlay";
import CardIndex from "@/components/card/card-index";
import { CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";

// TODO:re-work the type, currently crude implementation
type Props = {
  data: {
    name: string;
    description?: string;
    imageUrl?: string;
  };
};

export default function CardDefault({ data }: Props) {
  return (
    <CardIndex className="h-114 flex justify-end">
      <Image
        src={`${data.imageUrl || "/hero/scenery.jpg"}`}
        alt="category-image"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out -z-10"
        loading="lazy"
      />
      <FadeBottomOverlay />
      <CardFooter>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="text-white">
            <h3 className="text-3xl">{data.name}</h3>
            <p className="text-background/70 text-sm w-full">
              {data.description || "Category Description here"}
            </p>
          </div>
          <div className="rounded-full bg-white/40 transition-colors group-hover:bg-white p-2">
            <MdArrowOutward className="text-white group-hover:text-black transition-colors duration-300 ease-out h-6 w-6" />
          </div>
        </div>
      </CardFooter>
    </CardIndex>
  );
}
