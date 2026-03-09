import { handleApiRequest } from "@/lib/api/api-wrapper";
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

    if (res.data && res.data.authenticated) {
      set((state) => ({ ...state, isLoggedIn: true, errorMessage: null }));
    }
  },
}));
