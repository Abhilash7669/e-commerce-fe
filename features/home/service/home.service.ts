import { TempHomePageDTO } from "@/features/home/types/index.type";
import { api } from "@/lib/api";

export const homeServices = {
  async getHomeData() {
    return await api.get<TempHomePageDTO>({
      endpoint: "/home",
      options: {
        next: {
          revalidate: 10,
        },
      },
    });
  },
};
