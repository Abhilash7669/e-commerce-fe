/* eslint-disable @next/next/no-img-element */
"use client";
import CountControl from "@/components/controls/count-control";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useCartSheetToggle,
  useIsCartSheetOpen,
} from "@/store/cart-ui/index.cart-ui";
import {
  useGetCartItems,
  useIsCartLoading,
  useUpdateCart,
} from "@/store/cart/index.cart";

export default function CartSheet() {
  const isCartSheetOpen = useIsCartSheetOpen();
  const toggleCartSheet = useCartSheetToggle();

  const cartItems = useGetCartItems();
  console.log(cartItems, "CART ITEM");
  const updateCart = useUpdateCart();

  // const isCartLoading = useIsCartLoading();

  return (
    <Sheet open={isCartSheetOpen} onOpenChange={toggleCartSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Cart description</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          {cartItems && cartItems !== undefined ? (
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <ul className="space-y-4 overflow-y-auto">
                {cartItems?.items.map((item) => (
                  <li key={item.productVariantId._id}>
                    <div className="flex items-start gap-4">
                      <img
                        className="h-36 w-28 aspect-3/4 object-cover"
                        src={
                          item.productId.previewImageUrl ||
                          "/hero/testing-d.jpg"
                        }
                        alt="image"
                      />
                      <div className="space-y-2">
                        <div className="space-y-2">
                          <p className="font-light uppercase">
                            {item.productId.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.productVariantId.price}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.productVariantId.attribute.size}
                        </p>
                        <CountControl
                          onDecrement={async (count) =>
                            await updateCart({
                              sku: item.productVariantId.sku,
                              quantity: count,
                            })
                          }
                          onIncrement={async (count) => {
                            await updateCart({
                              sku: item.productVariantId.sku,
                              quantity: count,
                            });
                          }}
                          count={item.quantity}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            "No Items"
          )}
        </div>
        <SheetFooter className="pt-0">
          <Button className="h-10 text-base flex items-center gap-4">
            <span className="uppercase font-playfair-display">Checkout</span>
            <span className="h-1 w-1 rounded-full bg-muted"></span>
            <span>₹ {cartItems?.totalPrice}</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
