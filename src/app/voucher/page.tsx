import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import VoucherForm from "./VoucherForm";

export default async function VoucherPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <VoucherForm />;
}
