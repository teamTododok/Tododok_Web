import { NextRequest, NextResponse } from "next/server";
import { backendLogin } from "@/lib/backend-auth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const base = process.env.NEXTAUTH_URL!;

  if (!code) return NextResponse.redirect(`${base}/?error=no_code`);

  try {
    const tokens = await backendLogin("KAKAO", code, `${base}/api/auth/callback/kakao`);

    if (!tokens) {
      // 신규 유저
      return NextResponse.redirect(`${base}/?new_user=true`);
    }

    const res = NextResponse.redirect(`${base}/voucher`);
    res.cookies.set("tododok_access_token", tokens.accessToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 3600, path: "/" });
    res.cookies.set("tododok_refresh_token", tokens.refreshToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 2592000, path: "/" });
    return res;
  } catch {
    return NextResponse.redirect(`${base}/?error=login_failed`);
  }
}
