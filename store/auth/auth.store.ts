import { handleApiRequest } from "@/lib/api/api-wrapper";
import { setCookieValue } from "@/lib/helper/token-extraction";
import { authService } from "@/services/auth/auth.services";
import { TAuthStore } from "@/store/auth/auth.store.types";
import { create } from "zustand";

export const useAuthStore = create<TAuthStore>((set) => ({
  isLoggedIn: false,
  errorMessage: null,
  async isAuthenticated() {
    const res = await handleApiRequest(authService.isAuthenticated());

    if (!res.success) {
      set((state) => ({ ...state, errorMessage: res.message as string }));
      return;
    }

    if (res.data && res.data.access_token) {
      setCookieValue({ key: "lilly_Token", value: res.data.access_token });
      set((state) => ({ ...state, isLoggedIn: true, errorMessage: null }));
    }
  },
}));


