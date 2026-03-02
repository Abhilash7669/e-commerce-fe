export type TAuthStore = {
  isAuthenticated: () => Promise<unknown>;
  isLoggedIn: boolean;
  errorMessage: string | null;
};
