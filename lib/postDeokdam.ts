"use server";

import { createActionResult } from "@/lib/createActionResult";
import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { upsertUser } from "@/lib/upsertUser";
import { parseOpenAt } from "@/lib/utils";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import z from "zod";

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
  const writerId = await upsertUser();

  const isPublic = result.data.isPublic === "1";

  const createResult = await db.message.create({
    data: {
      id: getObjectId(),
      payload: result.data.deokdam,
      openAt: parseOpenAt(result.data.openAt),
      writerId,
      isPublic,
      // private 덕담은 accessToken도 함께 생성하기
      accessToken: !isPublic
        ? {
            create: {
              id: getObjectId(),
              userId: writerId, // 토큰 주인
              token: randomUUID(), // 토큰 생성
            },
          }
        : undefined,
    },
    select: {
      id: true,
      isPublic: true,
      accessToken: { select: { token: true } },
    },
  });

  revalidateTag(`user-${writerId}-deokdam`);

  return createActionResult({
    success: true,
    data: createResult,
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
