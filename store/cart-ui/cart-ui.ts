import { TCartUI } from "@/store/cart-ui/cart-ui.types";
import { create } from "zustand";

export const useCartUi = create<TCartUI>((set) => ({
  isCartSheetOpen: false,
  toggleCartSheet() {
    set((state) => ({ isCartSheetOpen: !state.isCartSheetOpen }));
  },
}));
