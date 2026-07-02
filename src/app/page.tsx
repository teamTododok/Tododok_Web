"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const APP_STORE_URL = "http://apple.co/4rWnNRz";

function NewUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          width: "100%",
          paddingTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 타이틀 */}
        <p style={{ fontFamily: "SUIT, sans-serif", fontWeight: 700, fontSize: 20, lineHeight: "140%", letterSpacing: "-0.02em", color: "#1A1A1A", textAlign: "center", margin: 0 }}>
          프로모션 코드 등록 전<br />
          <span style={{ color: "#FF532C" }}>회원가입이 필요</span>해요
        </p>

        {/* 서브타이틀 */}
        <p style={{ fontFamily: "SUIT, sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "150%", letterSpacing: "-0.02em", color: "#1A1A1A", textAlign: "center", margin: "26px 0 0" }}>
          프로모션 코드 등록을 위해<br />먼저 토도독 앱에서 회원가입을 완료해 주세요
        </p>

        {/* 구분선 */}
        <div style={{ width: "100%", height: 0.7, backgroundColor: "#F6F6F6", marginTop: 26 }} />

        {/* 버튼 영역 */}
        <div style={{ width: "100%", padding: "14px 20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a
            href={APP_STORE_URL}
            style={{
              width: "100%", height: 48,
              backgroundColor: "#FF532C",
              borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "SUIT, sans-serif", fontWeight: 600, fontSize: 15,
              letterSpacing: "-0.02em", color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            토도독으로 이동
          </a>
          <button
            onClick={onClose}
            style={{
              width: "100%", height: 48,
              backgroundColor: "transparent", border: "none",
              fontFamily: "SUIT, sans-serif", fontWeight: 500, fontSize: 15,
              letterSpacing: "-0.02em", color: "#A3A3A3",
              cursor: "pointer", marginTop: 12,
            }}
          >
            닫기
          </button>
        </div>

        {/* 세이프 에어리어 */}
        <div style={{ height: "calc(env(safe-area-inset-bottom, 0px) + 9px)" }} />
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
  const detected = searchParams.get("new_user") === "true";
  useEffect(() => {
    if (detected) onDetect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detected]);
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

  function handleCloseModal() {
    setShowNewUserModal(false);
    window.history.replaceState({}, "", "/");
  }

  return (
    <>
    <Suspense><NewUserDetector onDetect={() => setShowNewUserModal(true)} /></Suspense>
    {showNewUserModal && <NewUserModal onClose={handleCloseModal} />}
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
