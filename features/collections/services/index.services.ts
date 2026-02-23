import {
  CollectionDetail,
  CollectionProductsPaginatedDto,
  CollectionsQueryParamsDto,
} from "@/features/collections/types/index.types";
import { api } from "@/lib/api";

export const collectionsServices = {
  async getCollection(collectionSlug: string) {
    return await api.get<CollectionDetail, undefined>({
      endpoint: `/collections/${collectionSlug}`,
      options: {
        next: {
          revalidate: 5,
        },
      },
    });
  },

  async getCollectionProducts(
    collectionSlug: string,
    urlParams?: CollectionsQueryParamsDto,
  ) {
    const data = await api.get<
      CollectionProductsPaginatedDto,
      CollectionsQueryParamsDto
    >({
      endpoint: `/collections/${collectionSlug}/products`,
      urlParams: {
        ...(urlParams || {}),
      },
      options: {
        next: {
          revalidate: 20,
        },
      },
    });
    return data;
  },
};
