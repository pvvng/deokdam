import db from "@/lib/db";
import { isObjectId } from "@/lib/objectId";
import { isUUIDv4 } from "@/lib/utils";
import { getUserdata } from "@/lib/actions";
import { redirect } from "next/navigation";

/** token save api route */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const messageId = url.searchParams.get("id");
  const accessToken = url.searchParams.get("token");

  // 메시지 아이디 검증
  const isValidMessageId = messageId && isObjectId(messageId);
  if (!isValidMessageId) {
    console.error("[GET /share] Invalid messageId:", messageId);
    return new Response("Invalid messageId", { status: 400 });
  }

  const messageFindRes = await db.message.findUnique({
    where: { id: messageId },
    select: {
      id: true,
      token: true,
      writerId: true,
      isPublic: true,
    },
  });

  if (messageFindRes === null) {
    console.error("[GET /share] Message not found:", messageId);
    return new Response("Message not found", { status: 404 });
  }

  // 유저 생성 혹은 호출
  const userdata = await getUserdata();
  const userId = userdata.id;
  const userAccessTokens = userdata.accessTokens;

  // 작성자 혹은 공개 덕담이라면 바로 리디렉트
  if (userId === messageFindRes.writerId || messageFindRes.isPublic) {
    return redirect(`/d/${messageId}`);
  }

  // 비공개 덕담인데 토큰이 존재하지 않으면 에러
  if (!accessToken) {
    console.error("[GET /share] Missing access token for message:", messageId);
    return new Response("Access token required", { status: 401 });
  }

  // 토큰 형식 검증
  const isValidToken = isUUIDv4(accessToken);
  if (!isValidToken) {
    console.error("[GET /share] Invalid token format:", accessToken);
    return new Response("Invalid access token format", { status: 400 });
  }

  // 토큰 불일치
  if (accessToken !== messageFindRes.token) {
    console.error(
      "[GET /share] Token mismatch. Provided:",
      accessToken,
      "Expected:",
      messageFindRes.token
    );
    return new Response("Invalid access token", { status: 403 });
  }

  // 이미 저장된 토큰이 아니라면 db에 저장
  if (!userAccessTokens.includes(accessToken)) {
    await db.user.update({
      where: { id: userId },
      data: { accessTokens: { push: accessToken } },
    });
  }

  return redirect(`/d/${messageId}`);
}
