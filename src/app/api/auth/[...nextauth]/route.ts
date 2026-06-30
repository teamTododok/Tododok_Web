import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import AppleProvider from "next-auth/providers/apple";
import jwt from "jsonwebtoken";

function getAppleClientSecret() {
  const privateKey = process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, "\n");
  return jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "1h",
    audience: "https://appleid.apple.com",
    issuer: process.env.APPLE_TEAM_ID,
    subject: process.env.APPLE_ID,
    keyid: process.env.APPLE_KEY_ID,
  });
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: getAppleClientSecret(),
      checks: [],
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    nonce: {
      name: "next-auth.nonce",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/voucher`;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
