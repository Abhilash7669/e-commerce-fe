import { collectionsServices } from "@/features/collections/services/index.services";
import { api } from "@/lib/api";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageParams) {
  const { slug } = await params;

  const data = await collectionsServices.getCollectionProducts(slug);

  return (
    <main>
      {data && (
        <>
          <p>
            Title: <span>{data.meta.title}</span>
          </p>
          <p>
            Description: <span>{data.meta.description}</span>
          </p>
          <div>Products for collection: {slug}</div>
          {data.items.map((item) => (
            <p key={item.slug}>{item.name}</p>
          ))}
        </>
      )}
    </main>
  );
}
