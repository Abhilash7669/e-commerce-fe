import { menusServices } from "@/services/menu";
import { MenuDto } from "@/types/menu.types";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default async function Header() {
  const data = await menusServices.getMainMenu();
  return (
    <header className="bg-gray-400 p-5">
      <nav className="flex items-center gap-2">
        <Link href="/">Home</Link>
        {data && <RenderHeaderLinks menu={data} />}
      </nav>
    </header>
  );
}

function RenderHeaderLinks({ menu }: { menu: MenuDto }) {
  if (!menu) return null;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(menu).map(([section, values]) => (
          <NavigationMenuItem key={section}>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:underline underline-offset-2 data-[state=open]:hover:bg-transparent cursor-pointer">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {values &&
                  values.length > 0 &&
                  values.map((item) => (
                    <NavigationMenuLink asChild key={item.slug}>
                      <Link href={`/${section}/${item.slug}`}>{item.name}</Link>
                    </NavigationMenuLink>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
