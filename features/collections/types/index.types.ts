import {
  PaginatedQueryParamsDto,
  PaginatedResultDto,
} from "@/types/common/paginated/index.type";

//todo: re-work type naming, crude implementation rn
export type CollectionProductsPaginatedDto = PaginatedResultDto<CollectionItem>;

export type CollectionItem = {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  images: string[];
  gender: string;
};

export type CollectionDetail = {
  slug: string;
  name: string;
  description?: string;
  previewImageUrl?: string;
};

export type CollectionsQueryParamsDto = {
  size?: string[];
  color?: string[];
  sort?: string;
} & PaginatedQueryParamsDto;
