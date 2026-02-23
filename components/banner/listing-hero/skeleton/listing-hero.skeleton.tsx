export default function ListingsHeroSkeleton() {
  return (
    <section className="py-6 h-[70vh] relative flex items-center justify-center overflow-hidden">
      {/* Layered background shimmer with depth */}
      <div className="absolute inset-0 bg-linear-to-br from-muted via-muted/80 to-muted/60 -z-30" />
      <div className="absolute inset-0 shimmer -z-20 opacity-60" />

      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.75_0.01_240/0.3)_100%)] -z-25" />

      {/* Animated pulse overlay for life */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-t from-background/5 via-transparent to-background/5 -z-15" />

      {/* Bottom fade overlay (matching your hero) */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 via-black/20 to-transparent -z-10" />

      {/* Content skeleton with shadows for depth */}
      <div className="space-y-6 flex flex-col items-center z-10 px-4">
        {/* Title skeleton with glow effect */}
        <div className="relative">
          <div className="h-16 w-80 md:w-96 shimmer rounded-xl shadow-2xl" />
          <div className="absolute inset-0 h-16 w-80 md:w-96 bg-white/5 rounded-xl blur-xl" />
        </div>

        {/* Description skeleton with subtle elevation */}
        <div className="relative">
          <div className="h-6 w-96 md:w-lg shimmer rounded-lg shadow-lg" />
          <div className="absolute inset-0 h-6 w-96 md:w-lg bg-white/3 rounded-lg blur-lg" />
        </div>

        {/* Secondary description line for realism */}
        <div className="h-5 w-72 md:w-80 shimmer rounded-lg shadow-md opacity-70" />
      </div>

      {/* Decorative blur orbs for atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-28 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-28 animate-pulse [animation-delay:1s]" />
    </section>
  );
}
