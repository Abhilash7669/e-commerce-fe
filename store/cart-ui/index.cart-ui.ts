import { useCartUi } from "@/store/cart-ui/cart-ui";

export const useCartSheetToggle = () =>
  useCartUi((state) => state.toggleCartSheet);

export const useIsCartSheetOpen = () =>
  useCartUi((state) => state.isCartSheetOpen);
