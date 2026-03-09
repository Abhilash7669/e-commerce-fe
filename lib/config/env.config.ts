export const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/",
  NODE_ENV: process.env.NODE_ENV || "development",

  AUTH_ACCESS_TOKEN_COOKIE_NAME:
    process.env.NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME || "lilly_TokenTest",
  AUTH_CART_ID_COOKIE_NAME:
    process.env.NEXT_PUBLIC_AUTH_CART_ID_COOKIE_NAME || "lilly_CartIdTest",
};
