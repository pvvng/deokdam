import db from "@/lib/db";
import { upsertUser } from "@/lib/actions";
import { isObjectId } from "@/lib/objectId";
import { isUUIDv4 } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

/** token save api route */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const messageId = url.searchParams.get("id");
  const accessToken = url.searchParams.get("token");

  // 메시지 아이디 검증
  if (!messageId || !isObjectId(messageId)) {
    return notFound();
  }

  // 유저 생성 혹은 호출
  const userId = await upsertUser();

  if (accessToken) {
    if (!isUUIDv4(accessToken)) {
      return notFound();
    }
  }

  return redirect(`/d/${messageId}`);
}
