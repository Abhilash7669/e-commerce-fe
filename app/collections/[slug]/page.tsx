import ListingsHeroSkeleton from "@/components/banner/listing-hero/skeleton/listing-hero.skeleton";
import CollectionsProductListing from "@/features/collections/_components/collections-product-listing";
import CollectionsHero from "@/features/collections/banner/collections-hero";
import { Suspense } from "react";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageParams) {
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<ListingsHeroSkeleton />}>
        <CollectionsHero slug={slug} />
      </Suspense>
      <CollectionsProductListing slug={slug} />
    </main>
  );
}
