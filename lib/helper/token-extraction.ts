"use server";
import { cookies } from "next/headers";

// todo: refine cookies helper later
export async function getCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("lilly_Token")?.value;
  if (!cookieValue) return null;
  return cookieValue;
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
