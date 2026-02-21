import CardDetailed from "@/components/card/variants/detailed/card-detailed";
import ListingssHero from "@/components/hero/listing-hero";
import { collectionsServices } from "@/features/collections/services/index.services";
import { handleApiRequest } from "@/lib/api/api-wrapper";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageParams) {
  const { slug } = await params;

  const [collections, collection] = await Promise.all([
    handleApiRequest(collectionsServices.getCollectionProducts(slug)),
    handleApiRequest(collectionsServices.getCollection(slug)),
  ]);

  const hasCollections = collections.data && collections.data.items.length > 0;

  return (
    <main>
      {collection.success ? (
        <ListingssHero
          title={collection.data?.name}
          description={collection.data?.description}
          image={collection.data?.previewImageUrl}
        />
      ) : (
        "Return something here incase"
      )}
      {collections.success && collections.data && (
        <>
          {hasCollections && (
            <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 px-12 py-6">
              {collections.data.items.map((item) => (
                <li key={item.slug}>
                  <CardDetailed
                    basePrice={item.basePrice}
                    image={item.images[0]}
                    name={item.name}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {collections.data?.items.length === 0 && (
        <p className="h-screen text-center flex flex-col items-center justify-center gap-2 text-6xl">
          Coming soon
          <span className="text-xs"> (Can bring better component later)</span>
        </p>
      )}
    </main>
  );
}
