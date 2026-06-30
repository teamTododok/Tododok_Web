import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import VoucherForm from "./VoucherForm";

export default async function VoucherPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <VoucherForm />;
}
