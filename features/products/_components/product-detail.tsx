"use client";

import CardIndex from "@/components/card/card-index";
import GeneralContainer from "@/components/container/general-container";
import DiscountDisplay from "@/components/controls/discount-display";
import ButtonPickerCompact from "@/components/pickers/button-picker/button-picker-compact";
import ProductImagePicker from "@/components/pickers/product-image-picker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useProductVariants from "@/features/products/hooks/useProductVariants";
import { TProductDetail } from "@/features/products/types/index.types";
import { useUpdateCart } from "@/store/cart/index.cart";
import Image from "next/image";

type Props = {
  data: TProductDetail;
};

export default function ProductDetail({ data }: Props) {
  const {
    activeVariant,
    selectedVariantImage,
    handleSelectVariantImage,
    handleSelectVariant,
    variantSizes,
    variantColors,
    handleSelectColor,
  } = useProductVariants(data);

  const updateCart = useUpdateCart();

  return (
    <section className="px-12 py-6 flex flex-col md:flex-row md:items-start justify-between gap-12">
      {/* Image Preview */}
      <div className="flex-1">
        <CardIndex className="w-full aspect-3/4 relative h-auto">
          <Image
            src={selectedVariantImage || "/hero/testing-d.jpg"}
            fill
            priority
            loading="eager"
            quality={75}
            className="absolute inset-0 h-full w-full object-cover"
            alt="image"
          />
        </CardIndex>
      </div>
      {/* Info and selectors */}
      <div className="flex-2 h-full sticky top-20 space-y-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1>{data.product.name}</h1>
              {activeVariant.discountType !== "none" && (
                <DiscountDisplay
                  discountType={activeVariant.discountType}
                  value={activeVariant.value!}
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <p>
                {activeVariant.discountType !== "none" ? (
                  <>
                    <s>₹{activeVariant.price}</s>{" "}
                    <span className="text-xs">now for</span>{" "}
                    <span>₹{activeVariant.discountedPrice}</span>
                  </>
                ) : (
                  `₹${activeVariant.price}`
                )}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              rating place-holder here
            </p>
          </div>
          <p className="text-muted-foreground">{data.product.description}</p>
        </div>
        <Separator />
        {/* color-selector */}
        <div className="space-y-1">
          <p className="text-xs">Colors</p>
          <ul className="flex items-center gap-1">
            {variantColors.map((item) => (
              <ButtonPickerCompact
                key={item}
                isActive={item === activeVariant.attribute.color}
                onClick={() =>
                  handleSelectColor(item, activeVariant.attribute.size)
                }
              >
                {item}
              </ButtonPickerCompact>
            ))}
          </ul>
        </div>
        {/* size selector */}
        <div className="space-y-1">
          <p className="text-xs">Sizes</p>
          <ul className="flex items-center gap-1">
            {variantSizes.map((item) => (
              <ButtonPickerCompact
                onClick={() => handleSelectVariant(item)}
                isActive={activeVariant.attribute.size === item}
                key={item}
              >
                {item}
              </ButtonPickerCompact>
            ))}
          </ul>
        </div>
        {/* variant image selector */}
        <GeneralContainer className="flex flex-wrap gap-3 w-full">
          {activeVariant?.images.length > 0 &&
            activeVariant.images.map((imageUrl) => (
              <ProductImagePicker
                key={imageUrl}
                imageUrl={imageUrl}
                isActive={selectedVariantImage === imageUrl}
                onClick={handleSelectVariantImage}
              />
            ))}
        </GeneralContainer>
        <Separator />
        {/* cart controls */}
        <div className="flex items-center gap-2">
          <Button
            onClick={async () =>
              await updateCart({
                quantity: 1,
                sku: activeVariant.sku,
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
