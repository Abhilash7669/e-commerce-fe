import FadeBottomOverlay from "@/components/overlay/fade-bottom.overlay";
import HeroTextBox from "@/features/home/components/hero-text-box";
import Image from "next/image";

type Props = object;

export default async function Hero({}: Props) {
  return (
    <main className="min-h-[86vh] bg-gradient-dark relative flex items-center justify-start px-12 py-6">
      <Image
        src="/hero/testing.webp"
        alt="hero-image"
        fill
        loading="eager"
        quality={80}
        priority
        className="absolute inset-0 -z-10 object-cover"
      />
      <FadeBottomOverlay />
      <HeroTextBox />
    </main>
  );
}
