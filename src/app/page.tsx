"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const APP_STORE_URL = "https://apps.apple.com/kr/app/토도독/id6737494058";

function NewUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: "28px 24px 20px",
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
        onClick={e => e.stopPropagation()}
      >
        <Image src="/logo-orange.svg" alt="토도독" width={46} height={18} style={{ marginBottom: 8 }} />
        <p style={{ fontFamily: "SUIT, sans-serif", fontWeight: 700, fontSize: 17, lineHeight: "140%", letterSpacing: "-0.02em", color: "#1A1A1A", textAlign: "center" }}>
          앱에서 회원가입 후<br />이용해 주세요
        </p>
        <p style={{ fontFamily: "SUIT, sans-serif", fontWeight: 500, fontSize: 13, lineHeight: "150%", letterSpacing: "-0.02em", color: "#6E6E6E", textAlign: "center", marginBottom: 8 }}>
          토도독 서비스는 앱에서<br />회원가입 후 이용 가능합니다.
        </p>
        <a
          href={APP_STORE_URL}
          style={{
            width: "100%", height: 48,
            backgroundColor: "#FF532C",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15,
            letterSpacing: "-0.02em", color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          앱 다운로드
        </a>
        <button
          onClick={onClose}
          style={{
            width: "100%", height: 48,
            backgroundColor: "transparent", border: "none",
            fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15,
            letterSpacing: "-0.02em", color: "#A3A3A3",
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function useBgColor(color: string) {
  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => { document.body.style.backgroundColor = ""; };
  }, [color]);
}

function NewUserDetector({ onDetect }: { onDetect: () => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("new_user") === "true") onDetect();
  }, [searchParams, onDetect]);
  return null;
}

export default function LoginPage() {
  useBgColor("#FF532C");
  const router = useRouter();
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => {
      if (r.ok) router.replace("/voucher");
    });
  }, [router]);

  return (
    <>
    <Suspense><NewUserDetector onDetect={() => setShowNewUserModal(true)} /></Suspense>
    {showNewUserModal && <NewUserModal onClose={() => setShowNewUserModal(false)} />}
    <main
      className="flex flex-col bg-[#FF532C] px-5"
      style={{
        minHeight: "100dvh",
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 79px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 44px)`,
      }}
    >
      <div className="flex flex-col" style={{ gap: 14 }}>
        <Image src="/logo-white.svg" alt="토도독" width={82} height={32} priority />
        <p className="text-white" style={{ fontFamily: "SUIT, sans-serif", fontWeight: 700, fontSize: 22, lineHeight: "140%", letterSpacing: "-0.02em" }}>
          쿠폰번호를 입력하고<br />토도독 클럽을 시작해 보세요!
        </p>
      </div>

      <div className="flex flex-col gap-[14px] mt-auto">
        <a
          href="/api/auth/kakao/start"
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#FFDE00", color: "#3B1E1E", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", textDecoration: "none" }}
        >
          <Image src="/kakao-logo.svg" alt="kakao" width={15} height={14} />
          카카오로 로그인
        </a>

        <a
          href="/api/auth/naver/start"
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#00C300", color: "#FFFFFF", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", textDecoration: "none" }}
        >
          <Image src="/naver-logo.svg" alt="naver" width={14} height={14} />
          네이버로 로그인
        </a>

        <a
          href="/api/auth/apple/start"
          className="flex items-center justify-center gap-[6px] w-full h-12"
          style={{ backgroundColor: "#000000", color: "#FFFFFF", borderRadius: 4, fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", textDecoration: "none" }}
        >
          <Image src="/apple-logo.svg" alt="apple" width={16} height={18} />
          Apple로 로그인
        </a>
      </div>
    </main>
    </>
  );
}
