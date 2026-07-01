import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tododok_access_token")?.value;
  return token ? { accessToken: token } : null;
}
