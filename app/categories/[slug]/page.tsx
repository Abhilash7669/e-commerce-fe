import CardDetailed from "@/components/card/variants/detailed/card-detailed";
import ListingssHero from "@/components/hero/listing-hero";
import { categoriesServices } from "@/features/categories/services/index.services";
import { handleApiRequest } from "@/lib/api/api-wrapper";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// todo: crude error handling info
export default async function page({ params }: Props) {
  const { slug } = await params;

  const [categories, category] = await Promise.all([
    handleApiRequest(categoriesServices.getCategoriesProduct(slug)),
    handleApiRequest(categoriesServices.getCategory(slug)),
  ]);

  const hasCategoryProducts =
    categories.data && categories.data.items.length > 0;

  return (
    <main>
      {category.success ? (
        <ListingssHero
          title={category.data?.name}
          description={category.data?.description}
          image={category.data?.previewImageUrl}
        />
      ) : (
        <p>{`${categories?.message}` || "Return something here incase"}</p>
      )}
      {categories.success && categories.data && (
        <>
          {hasCategoryProducts && (
            <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 px-12 py-6">
              {categories.data.items.map((item) => (
                <li key={item.slug}>
                  <CardDetailed
                    basePrice={item.basePrice}
                    image={item.images?.[0]}
                    name={item.name}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
