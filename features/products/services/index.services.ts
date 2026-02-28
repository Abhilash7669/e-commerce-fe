import { TProductDetail } from "@/features/products/types/index.types";
import { api } from "@/lib/api";

const PRODUCTS_BASE_URL = "/products";

export const productsServices = {
  async getProductDetail(productSlug: string) {
    return await api.get<TProductDetail, undefined>({
      endpoint: `${PRODUCTS_BASE_URL}/${productSlug}`,
    });
  },
};
