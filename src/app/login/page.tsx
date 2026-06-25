"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-900">토도독 로그인</h1>
      <p className="text-sm text-gray-500">쿠폰 등록을 위해 로그인해 주세요</p>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={() => signIn("kakao", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3 text-sm font-semibold text-[#191919]"
        >
          카카오로 로그인
        </button>

        <button
          onClick={() => signIn("naver", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#03C75A] py-3 text-sm font-semibold text-white"
        >
          네이버로 로그인
        </button>

        <button
          onClick={() => signIn("apple", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white"
        >
          Apple로 로그인
        </button>
      </div>
    </main>
  );
}
