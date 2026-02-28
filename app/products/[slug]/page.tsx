import ProductDetailSkeleton from "@/features/products/_components/skeletons/product-page.skeleton";
import ProductPage from "@/view/product/product.page";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function page({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductPage slug={slug} />
    </Suspense>
  );
}
