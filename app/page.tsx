import Hero from "@/domain/home";
import CategoryShowcase from "@/domain/home/category-showcase";
import CollectionShowcase from "@/domain/home/collection-showcase";
import CategoryShowcaseSkeleton from "@/domain/home/components/skeletons/category-skeleton";
import TrendingShowcase from "@/domain/home/trending-showcase";
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
