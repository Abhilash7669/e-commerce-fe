import Pill from "@/components/pills/pill";
import { TProductDiscounts } from "@/features/products/types/index.types";

type Props = {
  discountType: TProductDiscounts;
  value: number;
};

export default function DiscountDisplay({ discountType, value }: Props) {
  return (
    <Pill className="py-1 bg-primary text-white">
      {discountType === "flat" && `Flat ₹${value} off`}
      {discountType === "percentage" && `Flat ${value}% off`}
    </Pill>
  );
}
