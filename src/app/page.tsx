"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#FF532C] px-5 pt-[90px] pb-[70px]">
      <div className="flex flex-col gap-3">
        <Image src="/logo-white.svg" alt="토도독" width={140} height={55} priority />
        <p className="text-white text-lg font-semibold">조금씩, 꾸준히, 토도독.</p>
      </div>

      <div className="flex flex-col gap-[14px]">
        <button
          onClick={() => signIn("kakao", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded bg-[#FEE500] text-[#191919] text-sm font-semibold"
        >
          <Image src="/kakao-logo.svg" alt="kakao" width={15} height={14} />
          카카오로 시작하기
        </button>

        <button
          onClick={() => signIn("naver", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded bg-[#03C75A] text-white text-sm font-semibold"
        >
          <Image src="/naver-logo.svg" alt="naver" width={14} height={14} />
          네이버로 시작하기
        </button>

        <button
          onClick={() => signIn("apple", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12 rounded bg-black text-white text-sm font-semibold"
        >
          <Image src="/apple-logo.svg" alt="apple" width={16} height={18} />
          Apple로 시작하기
        </button>
      </div>
    </main>
  );
}
