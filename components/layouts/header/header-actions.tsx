"use client";

import Pill from "@/components/pills/pill";
import { useCartSheetToggle } from "@/store/cart-ui/index.cart-ui";
import { useCartItemsCount } from "@/store/cart/index.cart";
import { IoMdSearch } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function HeaderActions() {
  const cartCount = useCartItemsCount();
  const toggleCartSheet = useCartSheetToggle();

  return (
    <div className="flex items-center gap-4">
      <IoMdSearch className="text-xl cursor-pointer" />
      <div onClick={toggleCartSheet} className="flex items-center gap-1">
        <PiShoppingCartSimpleBold className="text-xl cursor-pointer" />
        {cartCount && (
          <sup>
            <Pill className="bg-red-500 text-white rounded-full p-2 h-5 w-5">
              {cartCount}
            </Pill>
          </sup>
        )}
      </div>
    </div>
  );
}
