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
    <main className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <div className="px-5 pt-12 pb-6">
        <Image src="/logo-orange.svg" alt="토도독" width={60} height={24} />
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-col flex-1 px-5">
        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: "SUIT, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "140%",
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
          }}
        >
          토도독 클럽을<br />시작해 보세요!
        </h1>

        {/* 서브텍스트 */}
        <p
          className="mt-2"
          style={{
            fontFamily: "SUIT, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            lineHeight: "150%",
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
          }}
        >
          토도독 클럽의 다양한 혜택과 함께<br />
          더 몰입감 있는 독서 시간을 경험해 보세요.
        </p>

        {/* 코드 입력 카드 */}
        <div className="mt-8 border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📖</span>
            <span
              style={{
                fontFamily: "SUIT, sans-serif",
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="프로모션 코드를 입력해 주세요"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                required
                style={{
                  fontFamily: "SUIT, sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: "150%",
                  letterSpacing: "-0.02em",
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-400 pr-10 placeholder:text-[#6E6E6E]"
              />
              {voucherCode && (
                <button
                  type="button"
                  onClick={() => setVoucherCode("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !voucherCode}
              style={{
                fontFamily: "SUIT, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.02em",
              }}
              className="w-full h-12 rounded-xl bg-[#FF532C] text-white disabled:opacity-50"
            >
              {status === "loading" ? "등록 중..." : "등록하기"}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-center text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>

        {/* 안내사항 */}
        <ul className="mt-4 flex flex-col gap-1">
          {NOTICES.map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: "SUIT, sans-serif",
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
      </div>

      {/* 푸터 */}
      <div className="px-5 py-6 text-center">
        <div
          className="flex justify-center items-center gap-4 mb-1"
          style={{
            fontFamily: "SUIT, sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "-0.02em",
            color: "#A3A3A3",
          }}
        >
          <span>개인정보처리방침</span>
          <span>|</span>
          <span>이용약관</span>
        </div>
        <p
          style={{
            fontFamily: "SUIT, sans-serif",
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
