import { findOrCreateUser } from "@/lib/actions";
import db from "@/lib/db";
import { getObjectId, isObjectId } from "@/lib/objectId";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("id");
    const accessToken = url.searchParams.get("token");

    if (!postId || !isObjectId(postId)) {
      return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    const session = await getSession();
    const sessionId = session.id;
    const userdata = await findOrCreateUser(sessionId);

    // find post
    const deokdam = await db.post.findUnique({
      where: { id: getObjectId(postId) },
      select: { isPublic: true, token: true, userId: true },
    });

    if (!deokdam) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (deokdam.isPublic) {
      return NextResponse.redirect(new URL(`/d/${postId}`, req.url));
    }

    // 작성자면 바로 리디렉트
    if (deokdam.userId === userdata.id) {
      return NextResponse.redirect(new URL(`/d/${postId}`, req.url));
    }

    const isValidToken = accessToken && deokdam.token === accessToken;
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Invalid or missing token" },
        { status: 401 }
      );
    }

    // save accessToken
    await db.user.update({
      where: { id: getObjectId(userdata.id) },
      data: { postAccessTokens: { push: accessToken } },
    });

    // accessToken 저장할때마다 received 덕담 revalidate
    revalidateTag(`user-${userdata.id}-received`);

    return NextResponse.redirect(new URL(`/d/${postId}`, req.url));
  } catch (error) {
    console.error("Token save error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
