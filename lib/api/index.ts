import { ApiClass } from "@/lib/api/api-low-level";
import { ENV } from "@/lib/config/env.config";
import { getCookie } from "@/lib/helper/token-extraction";

export const api = new ApiClass(
  { baseUrl: ENV.BASE_URL },
  { tokenProvider: getCookie },
);
