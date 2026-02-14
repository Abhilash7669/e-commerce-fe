import { PaginatedResultDto } from "@/types/common/paginated/index.type";

export type CollectionProductsPaginatedDto = {
  meta: {
    title: string;
    description: string;
  };
} & PaginatedResultDto<CollectionItem>;

export type CollectionItem = {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  images: string[];
  gender: string;
};
