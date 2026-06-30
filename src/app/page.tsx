"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main
      className="flex min-h-screen flex-col bg-[#FF532C] px-5"
      style={{ paddingBottom: "calc(86px + env(safe-area-inset-bottom, 44px))" }}
    >
      <div className="flex flex-col" style={{ marginTop: 177, gap: 44 }}>
        <Image src="/logo-white.svg" alt="토도독" width={82} height={32} priority />
        <p className="text-white font-bold" style={{ fontSize: 22, lineHeight: "140%" }}>
          쿠폰번호를 입력하고<br />토도독 클럽을 시작해 보세요!
        </p>
      </div>

      <div className="flex flex-col gap-[14px] mt-auto">
        <button
          onClick={() => signIn("kakao", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded-xl bg-[#FEE500] text-[#191919] text-sm font-semibold"
        >
          <Image src="/kakao-logo.svg" alt="kakao" width={15} height={14} />
          카카오로 로그인
        </button>

        <button
          onClick={() => signIn("naver", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded-xl bg-[#03C75A] text-white text-sm font-semibold"
        >
          <Image src="/naver-logo.svg" alt="naver" width={14} height={14} />
          네이버로 로그인
        </button>

        <button
          onClick={() => signIn("apple", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded-xl bg-black text-white text-sm font-semibold"
        >
          <Image src="/apple-logo.svg" alt="apple" width={16} height={18} />
          Apple로 로그인
        </button>
      </div>
    </main>
  );
}
