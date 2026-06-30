import type { Metadata } from "next";
import localFont from "next/font/local";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
  display: "swap",
});

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
      <body className={`${suit.variable} min-h-full flex flex-col antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
