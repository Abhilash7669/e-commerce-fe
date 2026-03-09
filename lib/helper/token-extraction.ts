"use server";
import { ENV } from "@/lib/config/env.config";
import { cookies } from "next/headers";

// todo: refine cookies helper later
export async function getCookie(value?: string): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(
    value || ENV.AUTH_ACCESS_TOKEN_COOKIE_NAME,
  )?.value;
  if (!cookieValue) return null;
  return cookieValue;
}

export async function removeCookie(value: string) {
  (await cookies()).delete(value);
}

export async function setCookieValue({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<boolean> {
  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60,
  });

  return true;
}
