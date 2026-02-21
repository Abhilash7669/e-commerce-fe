import { api } from "@/lib/api";
import { MenuDto } from "@/types/menu/menu.types";

export const menusServices = {
  async getMainMenu() {
    return await api.get<MenuDto, undefined>({
      endpoint: "/menus",
      options: {
        next: {
          revalidate: 10
        }
      }
    });
  },
};
