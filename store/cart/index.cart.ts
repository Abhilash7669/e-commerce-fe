import { useCart } from "@/store/cart/cart";

export const useCartId = () => useCart((state) => state.cartId);
export const useCartItemsCount = () => useCart((state) => state.cartItemCount);

export const useGetCartId = () => useCart((state) => state.getCartId);
export const useGetCart = () => useCart((state) => state.getCart);

export const useGetCartItems = () => useCart((state) => state.cartItems);

export const useUpdateCart = () => useCart((state) => state.updateCart);

export const useIsCartLoading = () => useCart((state) => state.isCartLoading);
