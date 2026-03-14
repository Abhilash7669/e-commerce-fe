import { TColorPickerList } from "@/types/color-picker/color-picker.types";
import { ComboLabelValueList } from "@/types/common/index.type";

export const COLOR_PICKER = [
  {
    color: "red",
    colorName: "Red",
  },
  {
    color: "black",
    colorName: "Black",
  },
  {
    color: "yellow",
    colorName: "Yellow",
  },
  {
    color: "green",
    colorName: "Green",
  },
  {
    color: "blue",
    colorName: "Blue",
  },
] satisfies TColorPickerList;

export const SORT_BY = [
  {
    label: "Latest",
    value: "createdAt-dsc",
  },
  {
    label: "Price: Low to High",
    value: "basePrice-asc",
  },
  {
    label: "Price: High to Low",
    value: "basePrice-dsc",
  },
] satisfies ComboLabelValueList;
