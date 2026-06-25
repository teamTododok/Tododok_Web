import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import VoucherForm from "./VoucherForm";

export default async function VoucherPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">바우처 등록</h1>
      <p className="text-sm text-gray-500">{session.user?.email}</p>
      <VoucherForm />
    </main>
  );
}
