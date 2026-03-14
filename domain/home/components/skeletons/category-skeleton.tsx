import CardDefaultSkeleton from "@/components/card/variants/default/skeleton/card-default-skeleton";

export default function CategoryShowcaseSkeleton() {
  return (
    <section className="py-24 px-12 space-y-12">
      <div className="space-y-4 place-self-center">
        <div className="h-8 w-64 mx-auto shimmer rounded-md" />
        <div className="h-4 w-80 mx-auto shimmer rounded-md" />
      </div>

      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <CardDefaultSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
}
