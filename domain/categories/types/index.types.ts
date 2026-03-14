import { PaginatedResultDto } from "@/types/common/paginated/index.type";

//todo: re-work type naming, crude implementation rn
export type CategoriesProductsPaginatedDto = PaginatedResultDto<CategoryItem>;

export type CategoryItem = {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  images?: string[]; // todo: need to make this into a single previewUrl
};

export type CategoryDetail = {
  slug: string;
  name: string;
  description: string;
  previewImageUrl?: string;
};
