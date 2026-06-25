import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RedeemForm from "./RedeemForm";

export default async function RedeemPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-900">쿠폰 등록</h1>
      <p className="text-sm text-gray-500">{session.user?.email}</p>
      <RedeemForm />
    </main>
  );
}
