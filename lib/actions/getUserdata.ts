"use server";

import db from "../db";
import { isObjectId } from "../objectId";
import { getSession } from "../session";
import { createUser } from "./createUser";

export async function getUserdata() {
  const session = await getSession();
  const sessionUserId = session.id;

  const isValidUserId = sessionUserId && isObjectId(sessionUserId);
  // 세션이 제대로 존재하지 않으면 신규 생성
  if (!isValidUserId) {
    return await createUser();
  }

  // 아이디 존재하면 검색
  const findUserRes = await db.user.findUnique({
    where: { id: sessionUserId },
  });

  // 데이터 존재
  if (findUserRes !== null) {
    return findUserRes;
  }

  // 데이터 존재 X
  return await createUser();
}
