import { TCart, TUpdateCart } from "@/types/cart/cart.types";

export type AuthSlice = {
  isAuthenticated: () => Promise<unknown>;
  isLoggedIn: boolean;
  errorMessage: string | null;
  dummyAuthCount: number;
};

export type CartSlice = {
  cartId: string | null;
  cartItems: TCart | null;
  cartItemCount: number | null;
  isCartLoading: boolean;
  getCartId: () => Promise<void>;
  getCart: (isLoggedIn: boolean) => Promise<void>;
  updateCart: (cartData: TUpdateCart) => Promise<void>;

  // todo: re-think about this architecture
  // solves: duplication logic for getCart
  handleGetCart: () => Promise<void>;
};

export type SharedAuthCartSlice = {
  triggerAuthFlow: () => Promise<void>;
};
