import { api } from "@/lib/api";
import { TCart, TUpdateCart } from "@/types/cart/cart.types";

export const cartService = {
  async getCart() {
    return await api.get<TCart>({
      endpoint: `/carts/me`,
      options: {
        credentials: "include",
      },
    });
  },
  async cartLogic(cartData: { sku: string; quantity: number }) {
    const { sku, quantity } = cartData;
    return await api.put<
      TCart,
      {
        sku: string;
        quantity: number;
      }
    >({
      endpoint: "/carts",
      data: {
        sku,
        quantity,
      },
    });
  },
};
