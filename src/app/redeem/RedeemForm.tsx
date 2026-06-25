"use client";

import { useState } from "react";

export default function RedeemForm() {
  const [supportId, setSupportId] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supportId, redeemCode }),
      });

      if (!res.ok) throw new Error("등록에 실패했습니다.");

      setStatus("success");
      setMessage("쿠폰이 성공적으로 등록되었습니다!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "오류가 발생했습니다.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-xs flex-col gap-3">
      <input
        type="text"
        placeholder="회원번호 (앱에서 복사)"
        value={supportId}
        onChange={(e) => setSupportId(e.target.value)}
        required
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={redeemCode}
        onChange={(e) => setRedeemCode(e.target.value)}
        required
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {status === "loading" ? "등록 중..." : "쿠폰 등록"}
      </button>
      {message && (
        <p className={`text-center text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
