import { CollectionProductsPaginatedDto } from "@/features/collections/types/index.types";
import { api } from "@/lib/api";

export const collectionsServices = {
  async getCollectionProducts(collectionSlug: string) {
    const data = await api.get<CollectionProductsPaginatedDto>({
      endpoint: `/collections/${collectionSlug}/products`,
      options: {
        next: {
          revalidate: 5,
        },
      },
    });
    return data;
  },
};
