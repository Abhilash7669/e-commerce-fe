import { handleApiRequest } from "@/lib/api/api-wrapper";
import { cartService } from "@/services/cart/cart.service";
import { TCartStore } from "@/store/cart/cart.types";
import { create } from "zustand";

export const useCart = create<TCartStore>((set, get) => ({
  cartId: null,
  cartItems: null,
  cartItemCount: null,
  isCartLoading: false,
  getCartId() {
    if (typeof window !== "undefined") {
      const _cartId = localStorage.getItem("lilly_cartId");
      if (_cartId) {
        set(() => ({ cartId: JSON.parse(_cartId) }));
        return JSON.parse(_cartId);
      }
    }
  },
  async getCart() {
    const cartId = get().getCartId();

    if (!cartId) return;
    const res = await handleApiRequest(cartService.getCart(cartId));
    if (!res.success) {
      console.log(`Error: ${res.message}`);
      if (typeof window !== "undefined") {
        localStorage.removeItem("lilly_cartId");
      }
      return;
    }

    // set value for neighbour methods
    if (res.data) {
      set((state) => ({
        ...state,
        cartItemCount: res.data?.totalQuantity,
        cartItems: res.data,
      }));
    }
  },
  async updateCart({ quantity, sku }) {
    const cartId = get().getCartId();

    set((state) => ({ ...state, isCartLoading: true }));
    const res = await handleApiRequest(
      cartService.updateCart({
        cartId: cartId || undefined,
        quantity,
        sku,
        userId: undefined,
      }),
    );

    // todo: handle errors better, wherever required
    if (!res.success) {
      console.log(`Error: ${res.message}`);
      set((state) => ({ ...state, isCartLoading: false }));
    }

    if (res.data) {
      if (!cartId && typeof window !== "undefined") {
        localStorage.setItem("lilly_cartId", JSON.stringify(res.data._id));
      }
      set((state) => ({
        ...state,
        cartItemCount: res.data?.totalQuantity || 0,
        cartItems: !res.data ? undefined : res.data,
        isCartLoading: false,
      }));
    }
  },
}));
