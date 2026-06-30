import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "토도독 바우처 등록",
  description: "토도독 앱 바우처 등록 페이지",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT@1.0.4/fonts/static/woff2/SUIT.css"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "'SUIT', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
