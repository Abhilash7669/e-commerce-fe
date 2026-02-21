import ButtonGhost from "@/components/buttons/button-ghost";
import ButtonSecondary from "@/components/buttons/button-secondary";
import Pill from "@/components/pills/pill";
import { Star } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";

export default function HeroTextBox() {
  return (
    <div className="space-y-3 bg-black/40 p-4 rounded-xl">
      <Pill>
        <Star className="fill-current w-3 h-3" />
        <p>New Season 2026</p>
      </Pill>
      <h1 className="text-white leading-[120%] text-balance font-semibold text-6xl">
        Effortless Style,
        <br /> Timeless Pieces
      </h1>
      <p className="text-white/80 max-w-[42ch]">
        Curated essentials designed to elevate your everyday wardrobe with
        sustainable materials.
      </p>
      <div className="flex items-center gap-4">
        <ButtonSecondary className="rounded-full flex items-center gap-2 py-6! px-7!">
          <p className="text-sm">Shop Collection</p>{" "}
          <FaArrowRight className="text-2xl" />
        </ButtonSecondary>
        <ButtonGhost className="rounded-full flex items-center gap-2 py-6! px-7!">
          <p className="text-white text-sm">View Sale</p>
        </ButtonGhost>
      </div>
    </div>
  );
}
