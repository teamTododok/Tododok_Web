import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET() {
  const state = randomBytes(16).toString("hex");
  const params = new URLSearchParams({
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/naver`,
    response_type: "code",
    state,
  });
  const res = NextResponse.redirect(`https://nid.naver.com/oauth2.0/authorize?${params}`);
  res.cookies.set("naver_oauth_state", state, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 300 });
  return res;
}
