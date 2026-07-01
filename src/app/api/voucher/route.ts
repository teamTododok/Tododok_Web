import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL ?? "https://dev-api.tododok.kr";

const ERROR_MESSAGES: Record<string, string> = {
  EXPIRED_COUPON: "사용 기간이 만료된 프로모션 코드입니다.",
  USED_COUPON: "이미 등록된 프로모션 코드입니다.",
  NOT_FOUND_COUPON: "잘못된 프로모션 코드입니다. 다시 확인해주세요.",
  ALREADY_HAS_MEMBERSHIP: "현재 이용 중인 멤버십 만료 후 등록 가능합니다.",
};

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tododok_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { couponCode } = await req.json();

  const res = await fetch(`${API_BASE}/api/mypage/membership/coupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ couponCode }),
  });

  if (res.ok) return NextResponse.json({ ok: true });

  const data = await res.json();
  const code = data?.code as string;
  const message = ERROR_MESSAGES[code] ?? "올바른 프로모션 코드가 아닙니다.";
  return NextResponse.json({ error: message }, { status: res.status });
}
