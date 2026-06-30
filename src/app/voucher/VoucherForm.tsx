"use client";

import { useState } from "react";
import Image from "next/image";

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
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          토도독 클럽을<br />시작해 보세요!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          토도독 클럽의 다양한 혜택과 함께<br />더 몰입감 있는 독서 시간을 경험해 보세요.
        </p>

        {/* 코드 입력 카드 */}
        <div className="mt-8 border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📖</span>
            <span className="text-sm font-semibold text-gray-900">프로모션 코드 입력</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="프로모션 코드를 입력해 주세요"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 pr-10"
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
              className="w-full h-12 rounded-xl bg-[#FF532C] text-white text-sm font-semibold disabled:opacity-50"
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
          {[
            "프로모션 쿠폰 등록 시 멤버십이 즉시 시작됩니다.",
            "등록기간 이후에는 사용할 수 없습니다.",
            "등록된 쿠폰은 삭제가 불가합니다.",
            "각 쿠폰은 1회만 등록할 수 있으며,\n이미 사용된 쿠폰은 다시 사용할 수 없습니다.",
            "쿠폰이 정상적으로 등록되지 않는 경우,\n설정 내 문의하기를 통해 문의해 주세요.",
          ].map((text, i) => (
            <li key={i} className="text-xs text-gray-400 leading-relaxed">
              • {text}
            </li>
          ))}
        </ul>
      </div>

      {/* 푸터 */}
      <div className="px-5 py-6 text-center">
        <div className="flex justify-center gap-4 text-xs text-gray-400 mb-1">
          <span>개인정보처리방침</span>
          <span>이용약관</span>
        </div>
        <p className="text-xs text-gray-300">© 2026 Tododok. All rights reserved.</p>
      </div>
    </main>
  );
}
