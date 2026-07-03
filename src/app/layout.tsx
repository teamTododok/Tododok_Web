import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suit = localFont({
  src: [
    { path: "../../public/fonts/SUIT-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/SUIT-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/SUIT-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-suit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "토도독 바우처 등록",
  description: "토도독 앱 바우처 등록 페이지",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${suit.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
