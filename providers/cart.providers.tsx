"use client";
import CartSheet from "@/components/sheets/cart-sheet";
import { useGetCart } from "@/store/cart/index.cart";
import { useEffect } from "react";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getCart = useGetCart();
  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <>
      {children}
      <CartSheet />
    </>
  );
}
