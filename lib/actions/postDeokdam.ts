"use server";

import db from "@/lib/db";
import { createActionResult, findOrCreateUser } from "@/lib/actions";
import { getObjectId } from "@/lib/objectId";
import { parseOpenAt } from "@/lib/utils";
import { getSession } from "../session";
import { randomUUID } from "crypto";
import z from "zod";
import { revalidateTag } from "next/cache";

export async function postDeokdam(_: unknown, formdata: FormData) {
  const data = {
    deokdam: formdata.get("deokdam"),
    openAt: formdata.get("openAt"),
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return createActionResult({
      success: false,
      error: result.error.flatten().fieldErrors,
    });
  }

  const session = await getSession();
  const sessionId = session.id;

  const userdata = await findOrCreateUser(sessionId);
  const userId = getObjectId(userdata.id);

  const postRes = await db.post.create({
    data: {
      openAt: parseOpenAt(result.data.openAt),
      payload: result.data.deokdam,
      userId,
      token: randomUUID(),
    },
    select: {
      id: true,
      token: true,
    },
  });

  // revalidate
  revalidateTag(`user-${userId}-deokdam`);

  return createActionResult({
    success: true,
    data: { ...postRes },
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
});
