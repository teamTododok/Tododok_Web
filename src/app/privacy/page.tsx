import Link from "next/link";

const suit = { fontFamily: "SUIT, sans-serif" };
const base = { ...suit, fontSize: 14, lineHeight: "160%", color: "#1A1A1A" } as const;

type Line =
  | { type: "body"; text: string; spacingBefore?: boolean }
  | { type: "h1"; text: string; spacingBefore?: boolean }
  | { type: "num1"; text: string; spacingBefore?: boolean }   // "1.  항목"
  | { type: "num2"; text: string; spacingBefore?: boolean }   // "(1) 항목"
  | { type: "bullet"; text: string; spacingBefore?: boolean } // "• 항목"
  | { type: "note"; text: string; spacingBefore?: boolean }   // "※ 항목"

function Article({ lines }: { lines: Line[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {lines.map((line, i) => {
        const mt = line.spacingBefore ? 10 : 2;
        if (line.type === "h1") {
          return (
            <p key={i} style={{ ...base, fontWeight: 700, margin: 0, marginTop: i === 0 ? 0 : mt }}>
              {line.text}
            </p>
          );
        }
        if (line.type === "num1") {
          const [label, ...rest] = line.text.split(/(?<=^\d+\.\s{2})/);
          const content = rest.join("") || line.text.replace(/^\d+\.\s+/, "");
          const prefix = line.text.match(/^\d+\.\s+/)?.[0] ?? "";
          return (
            <div key={i} style={{ display: "flex", marginTop: mt }}>
              <span style={{ ...base, fontWeight: 400, flexShrink: 0, minWidth: 24 }}>{prefix.trim().replace(/\s+$/, "")}</span>
              <p style={{ ...base, fontWeight: 400, margin: 0, marginLeft: 6 }}>{content}</p>
            </div>
          );
        }
        if (line.type === "num2") {
          const prefix = line.text.match(/^\(\d+\)\s*/)?.[0] ?? "";
          const content = line.text.slice(prefix.length);
          return (
            <div key={i} style={{ display: "flex", marginTop: mt, paddingLeft: 18 }}>
              <span style={{ ...base, fontWeight: 400, flexShrink: 0, minWidth: 28 }}>{prefix.trim()}</span>
              <p style={{ ...base, fontWeight: 400, margin: 0, marginLeft: 4 }}>{content}</p>
            </div>
          );
        }
        if (line.type === "bullet") {
          const content = line.text.replace(/^•\s*/, "");
          return (
            <div key={i} style={{ display: "flex", marginTop: mt, paddingLeft: 4 }}>
              <span style={{ ...base, fontWeight: 400, flexShrink: 0, marginRight: 6 }}>•</span>
              <p style={{ ...base, fontWeight: 400, margin: 0 }}>{content}</p>
            </div>
          );
        }
        if (line.type === "note") {
          return (
            <p key={i} style={{ ...base, fontWeight: 400, margin: 0, marginTop: mt }}>
              {line.text}
            </p>
          );
        }
        // body
        return (
          <p key={i} style={{ ...base, fontWeight: 400, margin: 0, marginTop: mt }}>
            {line.text}
          </p>
        );
      })}
    </div>
  );
}

const sections: Line[][] = [
  // 서문
  [
    { type: "h1", text: "개인정보 처리 방침" },
    { type: "body", text: '토도독(이하 "회사")은 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보가 안전하게 보호될 수 있도록 최선을 다하고 있습니다. 회사는 「개인정보 보호법」 제30조에 따라 개인정보 처리에 관한 절차 및 기준을 안내하고, 이용자와 관련된 고충을 신속하고 원활하게 처리하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다. 본 개인정보처리방침은 관련 법령, 서비스 정책 또는 내부 운영 기준의 변경에 따라 사전 고지 후 변경될 수 있습니다.' },
  ],
  // 제1조
  [
    { type: "h1", text: "제1조 [개인정보의 수집 및 이용 목적]" },
    { type: "body", text: "회사는 서비스 제공을 위하여 필요한 최소한의 개인정보만을 수집·이용하며, 수집한 개인정보는 아래의 목적 범위 내에서만 처리됩니다. 이용 목적이 변경되는 경우에는 관련 법령에 따라 필요한 조치를 이행합니다." },
    { type: "num1", text: "1.  회원 가입 및 관리", spacingBefore: true },
    { type: "num2", text: "(1) 회원 가입 의사 확인" },
    { type: "num2", text: "(2) 회원 식별 및 본인 확인" },
    { type: "num2", text: "(3) 회원 자격 유지·관리" },
    { type: "num2", text: "(4) 만 14세 미만 아동의 경우 법정대리인 동의 여부 확인" },
    { type: "num1", text: "2.  서비스 제공 및 계약 이행" },
    { type: "num2", text: "(1) 콘텐츠 제공 및 서비스 기능 제공" },
    { type: "num2", text: "(2) 유료 서비스 결제, 정산 및 환불 처리" },
    { type: "num2", text: "(3) 고객 문의 및 민원 처리" },
    { type: "num1", text: "3.  서비스 운영 및 이용 안내" },
    { type: "num2", text: "(1) 서비스 이용 알림, 기능 안내 및 운영 공지 제공" },
    { type: "num2", text: "(2) 서비스 이용 통계 분석" },
    { type: "num2", text: "(3) 서비스 품질 개선 및 신규 서비스 개발" },
    { type: "num1", text: "4.  법적 의무 이행" },
    { type: "num2", text: "(1) 관련 법령에 따른 기록 보관, 보고 및 의무 이행" },
    { type: "num2", text: "(2) 서비스 이용 알림, 기능 안내 및 운영 공지 제공" },
  ],
  // 제2조
  [
    { type: "h1", text: "제2조 [개인정보의 처리 및 보유 기간]" },
    { type: "body", text: "회사는 개인정보를 수집 시 이용자로부터 동의받은 보유·이용 기간 내에서 처리하며, 보유 기간이 경과하거나 개인정보의 처리 목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다. 다만, 관계 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 법령에서 정한 기간 동안 개인정보를 보관합니다." },
    { type: "num1", text: "1.  회원 가입 및 관리", spacingBefore: true },
    { type: "bullet", text: "• 보유 기간: 회원 탈퇴 시까지" },
    { type: "bullet", text: "• 보유 근거: 정보통신망 이용촉진 및 정보보호 등에 관한 법률" },
    { type: "num1", text: "2.  서비스 제공 및 유료 서비스 이용" },
    { type: "bullet", text: "• 보유 기간: 목적 달성 시까지" },
    { type: "bullet", text: "• 보유 근거: 전자상거래 등에서의 소비자 보호에 관한 법률" },
    { type: "body", text: "다만, 전항에도 불구하고 관계 법령에 따라 다음 각 호의 기간 동안 개인정보를 보관합니다.", spacingBefore: true },
    { type: "num2", text: "(1) 계약 또는 청약철회 등에 관한 기록" },
    { type: "body", text: "      보관 기간: 5년" },
    { type: "body", text: "      근거 법령: 전자상거래 등에서의 소비자 보호에 관한 법률" },
    { type: "num2", text: "(2) 대금결제 및 재화 등의 공급에 관한 기록" },
    { type: "body", text: "      보관 기간: 5년" },
    { type: "body", text: "      근거 법령: 전자상거래 등에서의 소비자 보호에 관한 법률" },
    { type: "num2", text: "(3) 소비자의 불만 또는 분쟁 처리에 관한 기록" },
    { type: "body", text: "      보관 기간: 3년" },
    { type: "body", text: "      근거 법령: 전자상거래 등에서의 소비자 보호에 관한 법률" },
  ],
  // 제3조
  [
    { type: "h1", text: "제3조 [처리하는 개인정보의 항목]" },
    { type: "body", text: "회사는 다음과 같은 개인정보를 수집·처리합니다." },
    { type: "num1", text: "1.  회원 가입 및 서비스 이용 시", spacingBefore: true },
    { type: "num2", text: "(1) 소셜 로그인 식별자 (카카오, 네이버, 애플 등에서 제공하는 고유 식별값)" },
    { type: "num2", text: "(2) 프로필 이름 (회원이 설정한 경우)" },
    { type: "num2", text: "(3) 프로필 이미지 (회원이 직접 업로드하거나 설정한 경우)" },
    { type: "num2", text: "(4) 별명 (회원이 서비스 내에서 설정한 경우)" },
    { type: "num1", text: "2.  서비스 이용 과정에서 자동으로 수집되는 정보" },
    { type: "num2", text: "(1) 기기 정보 (기기 종류, 운영체제 버전)" },
    { type: "num2", text: "(2) 서비스 이용 기록 (접속 일시, 이용 기능, 오류 로그)" },
    { type: "num1", text: "3.  유료 서비스 이용 시" },
    { type: "num2", text: "(1) 오픈마켓 사업자(애플 앱스토어, 구글 플레이스토어)가 제공하는 결제 및 구독 내역 정보 (결제 여부, 결제 일시, 상품 유형 등)" },
    { type: "note", text: "※ 회사는 신용카드 번호 등 결제수단의 상세 정보는 직접 수집·저장하지 않습니다." },
    { type: "num1", text: "4.  고객 문의 및 고충 처리 시" },
    { type: "bullet", text: "• 문의 내용 및 처리 과정에서 이용자가 자발적으로 제공한 정보" },
    { type: "note", text: "※ 이용자가 서비스 이용 과정에서 작성한 기록, 문장, 이미지 생성 결과물 등은 서비스 제공을 위한 이용 데이터에 해당하며, 해당 정보가 개인정보보호법상 개인정보에 해당하지 않는 경우 본 방침의 개인정보 수집·처리 항목에 포함되지 않습니다.", spacingBefore: true },
  ],
  // 제4조
  [
    { type: "h1", text: "제4조 [만 14세 미만 아동의 개인정보 처리]" },
    { type: "body", text: "회사는 만 14세 미만 아동의 개인정보를 수집하는 경우, 법정대리인의 동의를 받은 후 최소한의 개인정보만을 수집·이용합니다." },
    { type: "bullet", text: "• 법정대리인의 동의 여부는 관련 법령에 따라 적법한 방법으로 확인합니다.", spacingBefore: true },
  ],
  // 제5조
  [
    { type: "h1", text: "제5조 [개인정보의 파기]" },
    { type: "num1", text: "1.  회사는 개인정보의 수집·이용 목적이 달성되거나 회원 탈퇴 시 지체 없이 해당 개인정보를 파기합니다. 개인정보의 파기 방법은 다음과 같습니다." },
    { type: "num2", text: "(1) 전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법으로 삭제" },
    { type: "num2", text: "(2) 종이에 출력된 개인정보: 분쇄 또는 소각" },
    { type: "num1", text: "2.  개인정보 유효기간 제도" },
    { type: "num2", text: "(1) 회사는 5년간 서비스를 이용하지 않은 회원의 개인정보를 관련 법령에 따라 분리 보관하거나 파기합니다." },
  ],
  // 제6조
  [
    { type: "h1", text: "제6조 [개인정보처리의 위탁]" },
    { type: "body", text: "회사는 현재 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다. 향후 위탁이 발생하는 경우, 관련 법령에 따라 본 방침을 통해 공개합니다." },
  ],
  // 제7조
  [
    { type: "h1", text: "제7조 [개인정보의 안전성 확보조치]" },
    { type: "num1", text: "1.  개인정보 접근 권한의 최소화 및 관리" },
    { type: "num1", text: "2.  개인정보의 암호화 저장 및 전송" },
    { type: "num1", text: "3.  내부 관리계획 수립 및 기술적·관리적 보호조치 시행" },
  ],
  // 제8조
  [
    { type: "h1", text: "제8조 [이용자의 권리 및 행사 방법]" },
    { type: "num1", text: "1.  이용자는 회사에 대하여 언제든지 개인정보 열람, 정정, 삭제 및 처리정지를 요청할 수 있습니다." },
    { type: "num1", text: "2.  권리 행사는 개인정보 보호책임자 또는 고객 문의 창구를 통해 요청할 수 있으며, 회사는 관련 법령에 따라 지체 없이 조치합니다." },
    { type: "num1", text: "3.  법정대리인은 만 14세 미만 아동의 개인정보에 대하여 동일한 권리를 행사할 수 있습니다." },
  ],
  // 제9조
  [
    { type: "h1", text: "제9조 [개인정보를 자동으로 수집하는 장치의 설치·운영]" },
    { type: "body", text: "회사는 쿠키(cookie)를 사용하지 않습니다. 다만, 서비스 이용 과정에서 모바일 운영체제(OS) 또는 광고 사업자가 자동으로 생성·수집하는 정보가 있을 수 있으며, 해당 정보의 처리는 각 제공자의 정책에 따릅니다." },
  ],
  // 제10조
  [
    { type: "h1", text: "제10조 [행태정보의 수집 및 이용]" },
    { type: "body", text: "회사는 Google AdMob 등 제3자 광고 사업자를 통해 무료 이용자에게 맞춤형 광고를 제공할 수 있습니다." },
    { type: "num1", text: "1.  광고 제거 또는 광고 제한 기능은 유료 구독 서비스의 혜택으로 제공됩니다.", spacingBefore: true },
    { type: "num1", text: "2.  행태정보는 개인을 직접 식별하지 않습니다." },
    { type: "num1", text: "3.  이용자는 모바일 운영체제(OS) 또는 광고 사업자의 설정을 통해 광고 식별자 재설정 또는 맞춤형 광고 제한을 선택할 수 있습니다." },
  ],
  // 제11조
  [
    { type: "h1", text: "제11조 [개인정보 보호책임자]" },
    { type: "body", text: "회사는 개인정보 보호와 관련한 문의 및 민원 처리를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다." },
    { type: "bullet", text: "• 개인정보 보호책임자: 김민지", spacingBefore: true },
    { type: "bullet", text: "• 문의처: support@tododok.kr" },
    { type: "body", text: "이용자는 개인정보 보호와 관련한 문의, 불만, 피해구제 등에 관하여 위 연락처를 통하여 문의하실 수 있으며, 회사는 이에 대하여 신속하고 성실하게 답변 및 처리하도록 노력합니다.", spacingBefore: true },
  ],
  // 제12조
  [
    { type: "h1", text: "제12조 [정보주체의 권익침해에 대한 구제방법]" },
    { type: "body", text: "정보주체는 개인정보 침해로 인한 구제를 위하여 다음의 기관에 상담 또는 분쟁 조정을 신청할 수 있습니다." },
    { type: "num1", text: "1.  개인정보분쟁조정위원회: 1833-6972", spacingBefore: true },
    { type: "num1", text: "2.  개인정보침해신고센터: 118" },
    { type: "num1", text: "3.  대검찰청: 1301" },
    { type: "num1", text: "4.  경찰청: 182" },
  ],
  // 제13조
  [
    { type: "h1", text: "제13조 [개인정보처리방침의 변경]" },
    { type: "body", text: "회사는 개인정보처리방침을 변경하는 경우, 시행일 이전에 서비스 내 공지사항 또는 기타 적절한 방법을 통하여 안내합니다." },
  ],
  // 부칙
  [
    { type: "h1", text: "부칙" },
    { type: "h1", text: "본 개인정보처리방침은 2026년 2월 1일부터 적용됩니다." },
  ],
];

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100dvh", backgroundColor: "#FFFFFF", ...suit }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 20px" }}>
        <Link href="/voucher" style={{ position: "absolute", left: 20, color: "#1A1A1A", textDecoration: "none", fontSize: 18, lineHeight: 1 }}>‹</Link>
        <span style={{ ...suit, fontWeight: 600, fontSize: 17, color: "#1A1A1A" }}>개인정보처리방침</span>
      </div>

      <div style={{ padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 18 }}>
        {sections.map((lines, i) => (
          <Article key={i} lines={lines} />
        ))}
      </div>
    </main>
  );
}
