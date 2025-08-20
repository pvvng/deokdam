import db from "@/lib/db";
import { isObjectId } from "@/lib/objectId";
import { upsertUser } from "@/lib/upsertUser";
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

    // 해당 유저와 messageId에 대한 엑세스 토큰 생성
    await db.accessToken.create({
      data: {
        token: accessToken,
        userId,
        messageId,
      },
    });
  }

  return redirect(`/d/${messageId}`);
}
