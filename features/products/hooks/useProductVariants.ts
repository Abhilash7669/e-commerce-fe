import {
  TProductDetail,
  TProductVariant,
} from "@/features/products/types/index.types";
import { useState } from "react";

export default function useProductVariants(data: TProductDetail) {
  /**
   * Variants
   * Active Variant - can get colors from these
   * sizes - when we choose size we reset color and selected image and variant
   */

  /**
   * Variants
   * Have Multiple Sizes
   * Each size can have multiple colors
   *    When we choose a size, it resets to it'ss default color
   *    When we choose color, size stays constant and we filter our that variants details
   */

  /**
   * Initial Set
   */
  const [variants, _] = useState<TProductVariant[]>(data.variants);
  const [activeVariant, setActiveVariant] = useState<TProductVariant>(
    data.variants[0],
  );
  const [selectedVariantImage, setSelectedVariantImage] = useState<string>(
    activeVariant?.images?.[0],
  );

  const [variantSizes, __] = useState([
    ...new Set(data.variants.map((item) => item.attribute.size)),
  ]);

  const [variantColors, setVariantColors] = useState(
    handleSetVariantColors(data.variants[0].attribute.size as string),
  );

  /**
   * Helper function to get unique color set
   * Used when we choose a variant size
   * @param variantSize
   * @returns Unique variant color set
   */
  function handleSetVariantColors(variantSize: string) {
    const variantColors = [
      ...new Set(
        data.variants
          .filter((item) => item.attribute.size === variantSize)
          .map((_item) => _item.attribute.color),
      ),
    ];

    return variantColors;
  }

  function handleSelectVariant(variantSize: string) {
    const findVariant = variants.filter(
      (item) => item.attribute.size === variantSize,
    );

    if (findVariant) {
      setActiveVariant(findVariant[0]);
      setSelectedVariantImage(findVariant[0].images[0]);
      setVariantColors(handleSetVariantColors(variantSize));
    }
  }

  function handleSelectColor(variantColor: string, variantSize: string) {
    const _variant = variants.filter(
      (item) =>
        item.attribute.color === variantColor &&
        item.attribute.size === variantSize,
    );
    if (_variant) {
      setActiveVariant(_variant[0]);
      setSelectedVariantImage(_variant[0].images[0]);
    }
  }

  function handleSelectVariantImage(imageUrl: string) {
    setSelectedVariantImage(imageUrl);
  }

  return {
    activeVariant,
    selectedVariantImage,
    variantSizes,
    variantColors,
    handleSelectVariant,
    handleSelectColor,
    handleSelectVariantImage,
  };
}
