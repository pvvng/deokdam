"use server";

import z from "zod";
import { createActionResult } from "./createActionResult";
import db from "../db";
import { getObjectId, isObjectId } from "../objectId";
import { getSession } from "../session";
import { findOrCreateUser } from "./findOrCreateUser";
import { revalidateTag } from "next/cache";

export async function postComment(_: unknown, formdata: FormData) {
  const data = {
    deokdamId: formdata.get("deokdamId"),
    nickname: formdata.get("nickname"),
    payload: formdata.get("payload"),
  };

  const result = await commentSchema.spa(data);

  if (!result.success) {
    return createActionResult({
      success: false,
      error: result.error.flatten().fieldErrors,
    });
  }

  const session = await getSession();
  const sessionId = session.id;
  const userdata = await findOrCreateUser(sessionId);
  const userId = userdata.id;

  const createCommentRes = await db.comment.create({
    data: {
      userId,
      postId: result.data.deokdamId,
      nickname: result.data.nickname,
      payload: result.data.payload,
    },
  });

  revalidateTag(`comments-${result.data.deokdamId}`);

  return createActionResult({
    success: true,
    data: { ...createCommentRes },
  });
}

const commentSchema = z.object({
  deokdamId: z
    .string()
    .refine(isObjectId, "올바른 형식의 아이디가 아닙니다.")
    .refine(async (id) => {
      const res = await db.post.findUnique({
        where: { id: getObjectId(id) },
        select: { id: true },
      });

      return Boolean(res);
    }, "덕담이 존재하지 않습니다."),
  nickname: z
    .string()
    .min(1, "별명을 입력해주세요.")
    .max(10, "별명은 최대 10자까지 입력 가능합니다.")
    .refine((val) => val.trim().length > 0, "공백만 입력할 수 없습니다."),
  payload: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(200, "내용은 최대 200자까지 입력 가능합니다.")
    .refine((val) => val.trim().length > 0, "공백만 입력할 수 없습니다."),
});
