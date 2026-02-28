export type TProductDiscounts = "none" | "flat" | "percentage";

export type TProductCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type TProductAttribute = {
  color: string;
  size: string;
};

export type TProductVariant = {
  _id: string;
  productId: string;
  zohoItemId: string;
  name: string;
  sku: string;
  attribute: TProductAttribute;
  price: number;
  stock: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
  discountType: TProductDiscounts;
  value?: number;
};

export type TProduct = {
  _id: string;
  gender: string;
  name: string;
  slug: string;
  description: string;
  category: TProductCategory;
  basePrice: number;
  images: string[];
  previewImageUrl?: string;
  collections: string[];
  createdAt: string;
  updatedAt: string;
};

export type TProductDetail = {
  product: TProduct;
  variants: TProductVariant[];
  totalVariants: number;
};
