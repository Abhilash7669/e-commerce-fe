import ListingsHero from "@/components/banner/listing-hero/listing-hero";
import { collectionsServices } from "@/features/collections/services/index.services";
import { handleApiRequest } from "@/lib/api/api-wrapper";

type Props = {
  slug: string;
};

export default async function CollectionsHero({ slug }: Props) {
  const { data, success, message } = await handleApiRequest(
    collectionsServices.getCollection(slug),
  );

  if (!success)
    return `error message: ${message}, RENDER AN ERROR COMPONENT HERE OR RETRY`;

  return (
    <ListingsHero
      title={data?.name}
      description={data?.description}
      image={data?.previewImageUrl}
    />
  );
}
