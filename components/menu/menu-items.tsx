import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuDto } from "@/types/menu/menu.types";
import Link from "next/link";

type Props = {
  menu: MenuDto;
};

export default function MenuItems({ menu }: Props) {
  if (!menu) return null;

  const checkObject = menu.map((section) => {
    const capitalizeTitle =
      section.title.charAt(0).toUpperCase() + section.title.slice(1);
    if (section.items && section.items.length > 0) {
      return (
        <NavigationMenuItem key={section.title}>
          <NavigationMenuTrigger className="bg-transparent">
            {capitalizeTitle}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
              {section.items &&
                section.items?.length > 0 &&
                section.items.map((item) => (
                  <NavigationMenuLink className="cursor-pointer" asChild key={item.slug}>
                    <Link className="text-terracotta-light" href={`/${section.title}/${item.slug}`}>
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    } else {
      return (
        <NavigationMenuItem key={section.title}>
          <NavigationMenuLink asChild>
            <Link href={`/${section.title}`}>{capitalizeTitle}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    }
  });

  return <>{checkObject}</>;
}
