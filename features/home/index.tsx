"use client";
import FadeBottomOverlay from "@/components/overlay/fade-bottom.overlay";
import AdvancedWaterRipple from "@/components/water-ripple";
import HeroTextBox from "@/features/home/components/hero-text-box";

export default function Hero() {
  return (
    <AdvancedWaterRipple
      dropRadius={25}
      className="relative"
      imageUrl="/hero/scenery.jpg"
      perturbance={0.01}
    >
      <FadeBottomOverlay />
      <HeroTextBox />
    </AdvancedWaterRipple>
  );
}
