import Hero from "@/features/home";
import CategoryShowcase from "@/features/home/category-showcase";
import CollectionShowcase from "@/features/home/collection-showcase";
import CategoryShowcaseSkeleton from "@/features/home/components/skeletons/category-skeleton";
import TrendingShowcase from "@/features/home/trending-showcase";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<CategoryShowcaseSkeleton />}>
        <CategoryShowcase />
      </Suspense>
      <CollectionShowcase />
      <TrendingShowcase />
    </>
  );
}
