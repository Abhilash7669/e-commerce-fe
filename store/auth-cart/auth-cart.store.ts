import { handleApiRequest } from "@/lib/api/api-wrapper";
import { ENV } from "@/lib/config/env.config";
import {
  getCookie,
  removeCookie,
  setCookieValue,
} from "@/lib/helper/token-extraction";
import { authService } from "@/services/auth/auth.services";
import { cartService } from "@/services/cart/cart.service";
import {
  AuthSlice,
  CartSlice,
  SharedAuthCartSlice,
} from "@/store/auth-cart/auth-cart.types";
import { create, StateCreator } from "zustand";

// Planned Logic
/**
 * Verify if authenticated
 *
 * if yes - getCart -> authToken is attached in the request header
 *  -> returns cartItems, cartId
 *  -> save cartId in cookies
 *  -> populate cart and necessary variables
 *
 *  NOTE[07, March 2026]: new flow
 *  sending cartId to backend via cookies
 *  so we check if we are loggedin
 *  if not then nothing
 * if yes, we try to fetch cart from backend.
 */

const createAuthSlice: StateCreator<
  AuthSlice & CartSlice,
  [],
  [],
  AuthSlice
> = (set) => ({
  async isAuthenticated() {
    const res = await handleApiRequest(authService.isAuthenticated());

    if (!res.success) {
      console.log("NOT LOGGED IN");
      set((state) => ({
        ...state,
        isLoggedIn: false,
        errorMessage: res.message as string,
      }));
      return;
    }

    if (res.data && res.data.authenticated) {
      console.log("IS VERIFIED");
      set((state) => ({ ...state, isLoggedIn: true, errorMessage: null }));
    }
  },
  errorMessage: null,
  isLoggedIn: false,
  dummyAuthCount: 2,
});

const createCartSlice: StateCreator<
  AuthSlice & CartSlice,
  [],
  [],
  CartSlice
> = (set, get) => ({
  cartId: null,
  cartItemCount: 0,
  cartItems: null,
  isCartLoading: false,
  async getCartId() {
    const cartId = await getCookie(ENV.AUTH_CART_ID_COOKIE_NAME);
    if (!cartId) await removeCookie(ENV.AUTH_CART_ID_COOKIE_NAME);
    set(() => ({ cartId: cartId || null }));
  },
  async handleGetCart() {
    const res = await handleApiRequest(cartService.getCart());
    if (!res.success) {
      // todo: better error handling
      await removeCookie(ENV.AUTH_CART_ID_COOKIE_NAME);
      console.log(res.message);
      set((state) => ({
        ...state,
        errorMessage: res.message as string,
      }));
    }

    if (res.data && res.success) {
      set((state) => ({
        ...state,
        cartItemCount: res.data?.totalQuantity,
        cartItems: res.data,
      }));
    }
  },
  async getCart(isLoggedIn: boolean) {
    console.log(isLoggedIn, "INSIDE get cart async method");
    await get().handleGetCart();
  },
  // todo: to be re-worked in this new slice pattern
  async updateCart(cartData) {
    set((state) => ({ ...state, isCartLoading: true }));

    // trigger api call to send items
    const res = await handleApiRequest(
      cartService.cartLogic({
        sku: cartData.sku,
        quantity: cartData.quantity,
      }),
    );
    set(() => ({ isCartLoading: false }));
    console.log(res, "RES");
    if (!res.success) {
      // todo: handle error better
      console.log("ERROR", res.message);
    }

    if (res.data) {
      if (res.data.items.length === 0) {
        await removeCookie(ENV.AUTH_CART_ID_COOKIE_NAME);
        set((state) => ({
          ...state,
          cartItemCount: 0,
          cartItems: null,
        }));
        return;
      }
      // set cartId in cookies
      await setCookieValue({
        key: ENV.AUTH_CART_ID_COOKIE_NAME,
        value: res.data._id,
      });
      set((state) => ({
        ...state,
        cartItemCount: res.data?.totalQuantity,
        cartItems: res.data,
      }));
    }
  },
});

const createSharedAuthCartSlice: StateCreator<
  AuthSlice & CartSlice,
  [],
  [],
  SharedAuthCartSlice
> = (_, get) => ({
  async triggerAuthFlow() {
    await get().isAuthenticated();

    const isLoggedIn = get().isLoggedIn;
    console.log(isLoggedIn, "AHDSA");
    await get().getCart(isLoggedIn);
  },
});

export const useBoundAuthCartStore = create<
  AuthSlice & CartSlice & SharedAuthCartSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createSharedAuthCartSlice(...a),
}));
