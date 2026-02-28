import { TCart, TUpdateCart } from "@/types/cart/cart.types";

export type TCartStore = {
  cartId?: string | null;
  cartItems: TCart | null;
  cartItemCount: number | null;
  getCartId: () => void | string;
  getCart: () => Promise<void>;
  updateCart: (
    cartData: Omit<TUpdateCart, "cartId" | "userId">,
  ) => Promise<void>;

  isCartLoading: boolean;
};
