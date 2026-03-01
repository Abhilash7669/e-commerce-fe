import { ApiClass } from "@/lib/api/api-low-level";
import { getCookie } from "@/lib/helper/token-extraction";

export const api = new ApiClass(
  { baseUrl: "http://localhost:5000" },
  { tokenProvider: getCookie },
);
