import HeaderActions from "@/components/layouts/header/header-actions";
import MenuItems from "@/components/menu/menu-items";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuDto } from "@/types/menu/menu.types";
import Link from "next/link";

type Props = {
  menu: MenuDto;
};

export default function MenuContainer({ menu }: Props) {
  if (!menu) return null;
  return (
    <nav className="w-full flex items-center justify-between">
      <Link
        className="text-foreground hover:text-primary transition-colors duration-300 cursor-pointer font-playfair-display text-3xl"
        href={"/"}
      >
        Chic Ecomm
      </Link>
      <NavigationMenu className="flex items-center justify-start">
        <NavigationMenuList className="gap-12">
          <MenuItems menu={menu} />
        </NavigationMenuList>
      </NavigationMenu>
      <HeaderActions />
    </nav>
  );
}
