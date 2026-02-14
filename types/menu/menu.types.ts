import { ComboList } from "@/types/common/index.type";

export type MenuDto = Array<MenuItem>;

type MenuItem = {
  title: string;
  items: ComboList | null | undefined;
};
