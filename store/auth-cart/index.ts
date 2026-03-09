import { useBoundAuthCartStore } from "@/store/auth-cart/auth-cart.store";

export const useTriggerAuthFlow = () =>
  useBoundAuthCartStore((state) => state.triggerAuthFlow);

export const useDummyAuthCount = () =>
  useBoundAuthCartStore((state) => state.dummyAuthCount);

// cart releated
export const useCartItems = () =>
  useBoundAuthCartStore((state) => state.cartItems);

export const useCartTotal = () =>
  useBoundAuthCartStore((state) => state.cartItemCount);

export const useUpdateCart = () =>
  useBoundAuthCartStore((state) => state.updateCart);
