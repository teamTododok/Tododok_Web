const API_BASE = process.env.BACKEND_API_URL ?? "https://dev-api.tododok.kr";

export interface BackendAuthResult {
  accessToken: string;
  refreshToken: string;
  membershipType: string;
}

export async function backendLogin(
  provider: "KAKAO" | "NAVER" | "APPLE",
  code: string,
  redirectUri: string
): Promise<BackendAuthResult | null> {
  const res = await fetch(`${API_BASE}/api/user/login/oauth/${provider}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, redirectUri }),
  });

  const body = await res.text();
  console.log(`[backend-auth] status=${res.status} body=${body}`);

  if (res.status === 404) return null; // 신규 유저
  if (!res.ok) throw new Error(`Backend auth failed: ${res.status} ${body}`);

  const data = JSON.parse(body);
  return {
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
    membershipType: data.data.membershipType ?? "BASIC",
  };
}

export function setAuthCookies(res: Response, tokens: BackendAuthResult) {
  const opts = "Path=/; HttpOnly; Secure; SameSite=Lax";
  res.headers.append("Set-Cookie", `tododok_access_token=${tokens.accessToken}; ${opts}; Max-Age=3600`);
  res.headers.append("Set-Cookie", `tododok_refresh_token=${tokens.refreshToken}; ${opts}; Max-Age=2592000`);
}
