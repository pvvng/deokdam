import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, unauthorized } from "next/navigation";
import { getUserdata } from "./actions";

export const metadata = {
  title: "내 덕담",
};

export default async function UserPage() {
  const session = await getSession();
  const userId = session.id;

  if (!userId) return unauthorized();

  const userdata = await getUserdata({ userId });

  if (!userdata) {
    await session.destroy();
    return notFound();
  }

  return <></>;
}
