import { ComboList } from "@/types/common/index.type";

// todo: these are temporary names and not the full type

type DynamicProductListing = "featured" | "sale";

export type TempCollection = Array<{
  slug: string;
  name: string;
  imageUrl?: string | null;
  description?: string;
}>;

export type TempCategory = ComboList;

export type TempProductPreview = {
  _id: string;
  name: string;
  slug: string;
  basePrice: number;
  images: string[];
};

export type TempProductListingItem = {
  productId: TempProductPreview;
  type: string;
  priority: number;
};

export type TempDynamicProductListings = Record<
  DynamicProductListing,
  TempProductListingItem[]
>;

export type TempHomePageDTO = {
  collections: TempCollection;
  categories: TempCategory;
} & TempDynamicProductListings;
