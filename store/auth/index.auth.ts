import { useAuthStore } from "@/store/auth/auth.store";

// function
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

// state
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);

// message
export const useHasError = () => useAuthStore((state) => state.errorMessage);
