"use server";

import db from "@/lib/db";
import { createActionResult } from "@/lib/actions";
import { getObjectId, isObjectId } from "@/lib/objectId";
import { parseOpenAt } from "@/lib/utils";
import { getSession } from "../session";
import { randomUUID } from "crypto";
import z from "zod";
import { revalidateTag } from "next/cache";

export async function postDeokdam(_: unknown, formdata: FormData) {
  const data = {
    deokdam: formdata.get("deokdam"),
    openAt: formdata.get("openAt"),
    isPublic: formdata.get("isPublic"),
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return createActionResult({
      success: false,
      error: result.error.flatten().fieldErrors,
    });
  }

  // 사용자 검색
  const session = await getSession();
  const userId = session.id;

  // 로그인 처리
  if (!(userId && isObjectId(userId))) {
    return createActionResult({
      success: false,
      error: {
        deokdam: ["로그인 후 이용 가능합니다."],
        openAt: undefined,
        isPublic: undefined,
      },
    });
  }

  const isPublic = result.data.isPublic === "1";

  // 아이디 변환
  const postId = getObjectId();
  const writerId = getObjectId(userId);

  const createPostRes = await db.post.create({
    data: {
      id: postId,
      payload: result.data.deokdam,
      openAt: parseOpenAt(result.data.openAt),
      writerId,
      isPublic,
    },
    select: {
      id: true,
      isPublic: true,
    },
  });

  // 엑세스 토큰 생성
  const token: string = randomUUID();
  if (!isPublic) {
    await db.accessToken.create({
      data: {
        postId,
        userId: writerId,
        token,
      },
      select: {},
    });
  }

  // revalidate
  revalidateTag(`user-${userId}-deokdam`);

  return createActionResult({
    success: true,
    data: {
      ...createPostRes,
      token: !isPublic ? token : null,
    },
  });
}

const openAtOptionsValues = [
  "chuseok",
  "0day",
  "1day",
  "3day",
  "7day",
] as const;

const openAtRegex = /^\d{4}\.\s\d{1,2}\.\s\d{1,2}\.$/;

const postSchema = z.object({
  deokdam: z
    .string()
    .min(1, "덕담을 입력해주세요.")
    .max(3000, "덕담은 최대 3000자까지 입력 가능합니다.")
    .refine((val) => val.trim().length > 0, "공백만 입력할 수 없습니다."),
  openAt: z.union(
    [
      z.enum(openAtOptionsValues, "허용되지 않은 형식입니다."), // 기존 옵션
      z.string().regex(openAtRegex, "허용되지 않은 형식입니다."), // YYYY. MM. DD. 형식
    ],
    "허용되지 않은 형식입니다."
  ),
  isPublic: z.enum(["0", "1"], "허용되지 않은 형식입니다."), // 0 또는 1만 허용
});
