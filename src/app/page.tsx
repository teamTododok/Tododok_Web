"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/voucher");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") return null;

  return (
    <main
      className="flex flex-col bg-[#FF532C] px-5"
      style={{
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "calc(86px + env(safe-area-inset-bottom, 44px))",
      }}
    >
      <div className="flex flex-col" style={{ marginTop: 177, gap: 14 }}>
        <Image src="/logo-white.svg" alt="토도독" width={82} height={32} priority />
        <p className="text-white" style={{ fontFamily: "SUIT, sans-serif", fontWeight: 700, fontSize: 22, lineHeight: "140%", letterSpacing: "-0.02em" }}>
          쿠폰번호를 입력하고<br />토도독 클럽을 시작해 보세요!
        </p>
      </div>

      <div className="flex flex-col gap-[14px] mt-auto">
        <button
          onClick={() => signIn("kakao", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#FFDE00", color: "#3B1E1E", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}
        >
          <Image src="/kakao-logo.svg" alt="kakao" width={15} height={14} />
          카카오로 로그인
        </button>

        <button
          onClick={() => signIn("naver", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#00C300", color: "#FFFFFF", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}
        >
          <Image src="/naver-logo.svg" alt="naver" width={14} height={14} />
          네이버로 로그인
        </button>

        <button
          onClick={() => signIn("apple", { callbackUrl: "/voucher" })}
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#000000", color: "#FFFFFF", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}
        >
          <Image src="/apple-logo.svg" alt="apple" width={16} height={18} />
          Apple로 로그인
        </button>
      </div>
    </main>
  );
}
