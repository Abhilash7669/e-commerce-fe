import Header from "@/components/layouts/header/header";
import CartProvider from "@/providers/cart.providers";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <CartProvider>{children}</CartProvider>
    </div>
  );
}
