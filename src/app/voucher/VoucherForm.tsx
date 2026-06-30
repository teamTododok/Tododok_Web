"use client";

import { useState } from "react";
import Image from "next/image";

const NOTICES = [
  { text: "프로모션 쿠폰 등록 시 멤버십이 즉시 시작됩니다.", color: "#6E6E6E" },
  { text: "등록기간 이후에는 사용할 수 없습니다.", color: "#6E6E6E" },
  { text: "등록된 쿠폰은 삭제가 불가능합니다.", color: "#6E6E6E" },
  { text: "각 쿠폰은 1회만 등록할 수 있으며,\n이미 사용된 쿠폰은 다시 사용할 수 없습니다.", color: "#A3A3A3" },
  { text: "쿠폰이 정상적으로 등록되지 않는 경우,\n설정 내 문의하기를 통해 문의해 주세요.", color: "#A3A3A3" },
];

const suit = { fontFamily: "SUIT, sans-serif" };

export default function VoucherForm() {
  const [voucherCode, setVoucherCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/voucher`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voucherCode }),
      });
      if (!res.ok) throw new Error("등록에 실패했습니다.");
      setStatus("success");
      setMessage("바우처가 성공적으로 등록되었습니다!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "오류가 발생했습니다.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#F6F6F6", paddingLeft: 30, paddingRight: 30 }}>
      {/* 로고 */}
      <div style={{ marginTop: 110 }}>
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
        토도독 클럽을<br />시작해 보세요!
      </h1>

      {/* 서브텍스트 */}
      <p
        style={{
          ...suit,
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "150%",
          letterSpacing: "-0.02em",
          color: "#1A1A1A",
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
            onChange={(e) => setVoucherCode(e.target.value)}
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
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#A3A3A3", background: "none", border: "none", cursor: "pointer" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* 등록하기 버튼 */}
        <button
          type="button"
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={status === "loading" || !voucherCode}
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
            cursor: voucherCode ? "pointer" : "default",
            opacity: !voucherCode ? 0.5 : 1,
          }}
        >
          {status === "loading" ? "등록 중..." : "등록하기"}
        </button>
      </div>

      {message && (
        <p style={{ marginTop: 8, textAlign: "center", fontSize: 13, color: status === "success" ? "#22c55e" : "#ef4444" }}>
          {message}
        </p>
      )}

      {/* 안내사항 */}
      <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 4 }}>
        {NOTICES.map((item, i) => (
          <li
            key={i}
            style={{
              ...suit,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "160%",
              letterSpacing: "-0.02em",
              color: item.color,
              whiteSpace: "pre-line",
            }}
          >
            • {item.text}
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
            color: "#A3A3A3",
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
