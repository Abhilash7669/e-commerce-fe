import {
  CategoriesProductsPaginatedDto,
  CategoryDetail,
} from "@/features/categories/types/index.types";
import { api } from "@/lib/api";

const CATEGORIES_BASE_URL = "categories";

export const categoriesServices = {
  async getCategory(categorySlug: string) {
    return await api.get<CategoryDetail>({
      endpoint: `/${CATEGORIES_BASE_URL}/${categorySlug}`,
    });
  },

  async getCategoriesProduct(categoriesSlug: string) {
    return await api.get<CategoriesProductsPaginatedDto>({
      endpoint: `/${CATEGORIES_BASE_URL}/${categoriesSlug}/products`,
    });
  },
};
