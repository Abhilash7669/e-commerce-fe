export type TAuthLoginDto = {
  email: string;
  password: string;
};

export type TAuthSignInResDto = {
  access_token: string;
};

export type TIsAuthenticated = {
  authenticated: boolean;
  user: string;
};
