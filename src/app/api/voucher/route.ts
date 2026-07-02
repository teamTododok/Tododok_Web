import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL ?? "https://dev-api.tododok.kr";

const ERROR_MESSAGES: Record<string, string> = {
  EXPIRED_COUPON: "사용 기간이 만료된 프로모션 코드입니다.",
  USED_COUPON: "이미 등록된 프로모션 코드입니다.",
  ALREADY_USED_COUPON: "이미 등록된 프로모션 코드입니다.",
  NOT_FOUND_COUPON: "잘못된 프로모션 코드입니다. 다시 확인해주세요.",
  NOT_FOUND_USER: "잘못된 프로모션 코드입니다. 다시 확인해주세요.",
  ALREADY_HAS_MEMBERSHIP: "현재 이용 중인 멤버십 만료 후 등록 가능합니다.",
  INVALID_COUPON: "올바른 프로모션 코드가 아닙니다.",
  EXPIRED_TOKEN: "세션이 만료되었습니다. 다시 로그인해 주세요.",
  INVALID_TOKEN: "세션이 만료되었습니다. 다시 로그인해 주세요.",
};

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tododok_access_token")?.value;
  if (!token) return NextResponse.json({ error: "세션이 만료되었습니다. 다시 로그인해 주세요.", redirect: "/" }, { status: 401 });

  let body: { couponCode: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "올바른 요청이 아닙니다." }, { status: 400 });
  }

  const { couponCode } = body;
  if (!couponCode) return NextResponse.json({ error: "쿠폰 코드를 입력해 주세요." }, { status: 400 });

  try {
    const res = await fetch(`${API_BASE}/api/mypage/membership/coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ couponCode }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    const data = await res.json().catch(() => ({}));
    const code = data?.code as string;

    // 토큰 만료 시 redirect 신호
    if (res.status === 401) {
      return NextResponse.json({ error: ERROR_MESSAGES[code] ?? "세션이 만료되었습니다. 다시 로그인해 주세요.", redirect: "/" }, { status: 401 });
    }

    const message = ERROR_MESSAGES[code] ?? "올바른 프로모션 코드가 아닙니다.";
    return NextResponse.json({ error: message }, { status: res.status });
  } catch {
    return NextResponse.json({ error: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
