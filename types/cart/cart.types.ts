//todo: temp type, crude implementation. Unify later

// ---------- Product ----------

export type TCartProduct = {
  _id: string;
  name: string;
  previewImageUrl?: string;
};

// ---------- Variant Attribute ----------

export type TCartVariantAttribute = {
  color: string;
  size: string;
};

// ---------- Product Variant ----------

export type TCartProductVariant = {
  _id: string;
  name: string;
  sku: string;
  attribute: TCartVariantAttribute;
  price: number;
  images: string[];
};

// ---------- Cart Item ----------

export type TCartItem = {
  productId: TCartProduct;
  productVariantId: TCartProductVariant;
  quantity: number;
};

// ---------- Cart ----------

export type TCart = {
  _id: string;
  userId: string | null;
  items: TCartItem[];
  totalPrice: number;
  totalQuantity: number;
};

export type TUpdateCart = {
  quantity: number;
  cartId?: string;
  userId?: string;
  sku: string;
  // productVariantId: string;
  // productId: string;
};
