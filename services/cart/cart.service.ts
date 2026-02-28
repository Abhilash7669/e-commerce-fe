import { api } from "@/lib/api";
import { TCart, TUpdateCart } from "@/types/cart/cart.types";

export const cartService = {
  async getCart(cartId: string) {
    return await api.get<TCart>({
      endpoint: `/carts/${cartId}`,
    });
  },
  async cartLogic(cartData: {
    cartId?: string;
    userId?: string;
    productId: string;
    productVariantId: string;
    quantity: number;
  }) {
    const { productId, productVariantId, quantity, cartId, userId } = cartData;
    return await api.put<
      TCart,
      {
        cartId?: string;
        userId?: string;
        productId: string;
        productVariantId: string;
        quantity: number;
      }
    >({
      endpoint: "/carts",
      data: {
        productId,
        productVariantId,
        quantity,
        cartId,
        userId,
      },
    });
  },
  // todo: need to remove this, depricated
  async updateCart(data: TUpdateCart) {
    return await api.put<TCart, TUpdateCart>({
      endpoint: `/carts/`,
      data: {
        quantity: data.quantity,
        sku: data.sku,
        cartId: data.cartId || undefined,
        userId: data.userId || undefined,
      },
    });
  },
};
