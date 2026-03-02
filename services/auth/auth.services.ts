import { api } from "@/lib/api";
import { TAuthLoginDto, TAuthSignInResDto } from "@/types/auth/auth.types";

const AUTH_BASE_URL = "/auth";

export const authService = {
  async login(data: TAuthLoginDto) {
    return api.post<TAuthSignInResDto, TAuthLoginDto>({
      endpoint: `${AUTH_BASE_URL}/sign-in`,
      data,
    });
  },

  async isAuthenticated() {
    return api.get<TAuthSignInResDto>({
      endpoint: `${AUTH_BASE_URL}/verify`,
    });
  },
};
