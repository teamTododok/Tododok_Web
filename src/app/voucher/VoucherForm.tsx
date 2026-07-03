"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ToastType = "success" | "error";

function Toast({ message, type, onHide }: { message: string; type: ToastType; onHide: () => void }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 30px)",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(18,18,18,0.80)",
        borderRadius: 48,
        padding: "14px 20px",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      {type === "error" && (
        <Image src="/warning-icon.svg" alt="warning" width={18} height={18} style={{ flexShrink: 0, marginRight: 10 }} />
      )}
      <span
        style={{
          fontFamily: "SUIT, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: "140%",
          letterSpacing: "-0.02em",
          color: type === "error" ? "#FFCF58" : "#FFFFFF",
        }}
      >
        {message}
      </span>
    </div>
    </div>
  );
}

const NOTICES = [
  "프로모션 쿠폰 등록 시 멤버십이 즉시 시작됩니다.",
  "등록기간 이후에는 사용할 수 없습니다.",
  "등록된 쿠폰은 삭제가 불가능합니다.",
  "각 쿠폰은 1회만 등록할 수 있으며,\n이미 사용된 쿠폰은 다시 사용할 수 없습니다.",
  "쿠폰이 정상적으로 등록되지 않는 경우,\n설정 내 문의하기를 통해 문의해 주세요.",
];

const suit = { fontFamily: "SUIT, sans-serif" };

export default function VoucherForm() {
  const [voucherCode, setVoucherCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [hasActiveMembership, setHasActiveMembership] = useState(false);

  const showToast = (message: string, type: ToastType) => setToast({ message, type });

  useEffect(() => {
    const membership = document.cookie.split("; ").find(r => r.startsWith("tododok_membership="))?.split("=")[1];
    if (membership && membership !== "BASIC") {
      setHasActiveMembership(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const raw = voucherCode.replace(/-/g, "");
    if (raw.length !== 12) {
      showToast("올바른 프로모션 코드가 아닙니다.", "error");
      return;
    }
    if (hasActiveMembership) {
      showToast("현재 이용 중인 멤버십 만료 후 등록 가능합니다.", "error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponCode: voucherCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        // 세션 만료 시 로그인 페이지로
        if (res.status === 401) {
          showToast("세션이 만료되었습니다. 다시 로그인해 주세요.", "error");
          setTimeout(() => { window.location.href = "/"; }, 2000);
          setStatus("error");
          return;
        }
        showToast(data.error ?? "오류가 발생했습니다.", "error");
        setStatus("error");
        return;
      }
      setStatus("success");
      showToast("멤버십이 등록되었으니, 앱에서 확인해 주세요.", "success");
    } catch {
      setStatus("error");
      showToast("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", "error");
    }
  }

  return (
    <main className="flex flex-col" style={{ minHeight: "100dvh", backgroundColor: "#F6F6F6", paddingLeft: 30, paddingRight: 30, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {/* 로고 */}
      <div style={{ marginTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}>
        <Image src="/logo-orange.svg" alt="토도독" width={46} height={18} />
      </div>

      {/* 타이틀 */}
      <h1
        style={{
          ...suit,
          fontWeight: 700,
          fontSize: 24,
          lineHeight: "140%",
          letterSpacing: "-0.02em",
          color: "#1A1A1A",
          marginTop: 60,
        }}
      >
        토도독 클럽을 시작해 보세요!
      </h1>

      {/* 서브텍스트 */}
      <p
        style={{
          ...suit,
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "150%",
          letterSpacing: "-0.02em",
          color: "#505050",
          marginTop: 4,
        }}
      >
        토도독 클럽의 다양한 혜택과 함께<br />
        더 몰입감 있는 독서 시간을 경험해 보세요.
      </p>

      {/* 코드 입력 카드 */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          height: 171,
          marginTop: 24,
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 14,
          paddingBottom: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* 쿠폰 아이콘 + 라벨 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Image
            src="/coupon-icon.svg"
            alt="coupon"
            width={22}
            height={22}
            style={{ filter: "invert(42%) sepia(80%) saturate(800%) hue-rotate(340deg) brightness(100%) contrast(100%)" }}
          />
          <span
            style={{
              ...suit,
              fontWeight: 600,
              fontSize: 15,
              lineHeight: "150%",
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
            }}
          >
            프로모션 코드 입력
          </span>
        </div>

        {/* 입력 필드 */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="프로모션 코드를 입력해 주세요"
            value={voucherCode}
            onChange={(e) => {
              const raw = e.target.value.replace(/-/g, "").toUpperCase().slice(0, 12);
              const formatted = raw.match(/.{1,4}/g)?.join("-") ?? raw;
              setVoucherCode(formatted);
            }}
            required
            style={{
              ...suit,
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "150%",
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
              width: "100%",
              height: 48,
              border: "1px solid #E8E8E8",
              borderRadius: 8,
              paddingLeft: 14,
              paddingRight: 36,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {voucherCode && (
            <button
              type="button"
              onClick={() => setVoucherCode("")}
              style={{ position: "absolute", right: 10.35, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
            >
              <Image src="/clear.svg" alt="clear" width={22} height={22} />
            </button>
          )}
        </div>

        {/* 등록하기 버튼 */}
        <button
          type="button"
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          style={{
            ...suit,
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            backgroundColor: "#FF532C",
            height: 48,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            opacity: 1,
          }}
        >
          등록하기
        </button>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onHide={() => setToast(null)} />
      )}

      {/* 안내사항 */}
      <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 4 }}>
        {NOTICES.map((text, i) => (
          <li
            key={i}
            style={{
              ...suit,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "160%",
              letterSpacing: "-0.02em",
              color: "#6E6E6E",
              display: "flex",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <span style={{ flexShrink: 0 }}>•</span>
            <span style={{ whiteSpace: "pre-line" }}>{text}</span>
          </li>
        ))}
      </ul>

      {/* 푸터 */}
      <div style={{ marginTop: "auto", paddingTop: 40, paddingBottom: 24, textAlign: "center" }}>
        <div
          style={{
            ...suit,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "-0.02em",
            color: "#6E6E6E",
            marginBottom: 4,
          }}
        >
          <span>개인정보처리방침</span>
          <span>|</span>
          <span>이용약관</span>
        </div>
        <p
          style={{
            ...suit,
            fontWeight: 500,
            fontSize: 11,
            lineHeight: "160%",
            letterSpacing: "-0.02em",
            color: "#6E6E6E",
          }}
        >
          © 2026 Tododok. All rights reserved.
        </p>
      </div>
    </main>
  );
}
