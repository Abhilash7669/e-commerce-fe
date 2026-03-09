"use client";

import CartSheet from "@/components/sheets/cart-sheet";
import { useTriggerAuthFlow } from "@/store/auth-cart";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const triggerAuthFlow = useTriggerAuthFlow();

  useEffect(() => {
    triggerAuthFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
      <CartSheet />
    </>
  );
}
