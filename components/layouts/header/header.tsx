import Menu from "@/components/menu/menu";
import MenuContainer from "@/components/menu/menu-container";
import { menusServices } from "@/services/menu";

export default async function Header() {
  const data = await menusServices.getMainMenu();
  return <Menu>{data && <MenuContainer menu={data} />}</Menu>;
}
