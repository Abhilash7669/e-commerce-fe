"use client";
/* eslint-disable @next/next/no-img-element */
import CardIndex from "@/components/card/card-index";
import { cn } from "@/lib/utils";

type Props = {
  isActive: boolean;
  onClick: (imageUrl: string) => void;
  imageUrl: string;
};

/**
 * Product Image picker class states
 */
const productImagePickerClass = {
  baseClass: "h-20 w-20 p-0 transition-all duration-150 border-2 ease-in-out",
  states: {
    active: "p-0.5 border-primary",
    inactive: undefined,
  },
};

export default function ProductImagePicker({
  imageUrl,
  isActive,
  onClick,
}: Props) {
  return (
    <li onClick={() => onClick(imageUrl)} className="w-fit cursor-pointer">
      <CardIndex
        className={cn(
          productImagePickerClass.baseClass,
          isActive
            ? productImagePickerClass.states.active
            : productImagePickerClass.states.inactive,
        )}
      >
        <img
          className="object-cover h-full w-full transition-all duration-300 ease-in-out rounded-lg"
          src={imageUrl}
          alt="image"
          loading="lazy"
        />
      </CardIndex>
    </li>
  );
}
