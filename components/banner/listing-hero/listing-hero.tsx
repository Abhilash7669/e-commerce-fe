import FadeBottomOverlay from "@/components/overlay/fade-bottom.overlay";
import Image from "next/image";

type Props = {
  image?: string;
  title?: string;
  description?: string;
};

export default function ListingsHero({ description, image, title }: Props) {
  return (
    <section className="py-6 h-[70vh] relative flex items-center justify-center">
      <FadeBottomOverlay className="h-full" />
      <Image
        fill
        className="absolute inset-0 h-full w-full object-cover -z-20"
        alt="collections-hero"
        src={image || "/hero/testing-d.jpg"}
      />
      <div className="space-y-2">
        <h1 className="text-center text-background">{title}</h1>
        <p className="text-center text-background/50">{description}</p>
      </div>
    </section>
  );
}
