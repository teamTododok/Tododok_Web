"use client";

import { useEffect } from "react";

export default function VoucherLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.backgroundColor = "#F6F6F6";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  return <>{children}</>;
}
