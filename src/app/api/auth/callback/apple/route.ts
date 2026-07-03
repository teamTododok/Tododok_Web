import { NextRequest, NextResponse } from "next/server";
import { backendLogin } from "@/lib/backend-auth";

// Apple uses form_post → POST callback
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const code = formData.get("code") as string;
  const base = process.env.NEXTAUTH_URL!;

  if (!code) return NextResponse.redirect(`${base}/?error=no_code`, { status: 303 });

  try {
    const tokens = await backendLogin("APPLE", code, `${base}/api/auth/callback/apple`);

    if (!tokens) {
      return NextResponse.redirect(`${base}/?new_user=true`, { status: 303 });
    }

    const res = NextResponse.redirect(`${base}/voucher`, { status: 303 });
    res.cookies.set("tododok_access_token", tokens.accessToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 1800, path: "/" });
    res.cookies.set("tododok_refresh_token", tokens.refreshToken, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 2592000, path: "/" });
    res.cookies.set("tododok_membership", tokens.membershipType, { secure: true, sameSite: "lax", maxAge: 1800, path: "/" });
    return res;
  } catch {
    return NextResponse.redirect(`${base}/?error=login_failed`, { status: 303 });
  }
}
