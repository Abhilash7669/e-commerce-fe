import { api } from "@/lib/api";

export const authService = {
  async login(data: { email: string; password: string }) {
    return api.post<
      { access_token: string },
      { email: string; password: string }
    >({
      endpoint: "/auth/sign-in",
      data,
    });
  },
};
