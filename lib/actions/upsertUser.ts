"use server";

import db from "../db";
import { getObjectId } from "../objectId";
import { getSession } from "../session";

/** 사용자 생성 후 세션 처리 */
export async function upsertUser() {
  const session = await getSession();
  const userId = session.id;

  // 최초 로그인 혹은 세션 삭제된 경우
  if (!userId) {
    const userId = await createUser();

    session.id = userId;
    await session.save();

    return userId;
  }

  const findResult = await db.user.findUnique({
    where: { id: userId },
  });

  // 존재하지 않는 사용자
  if (!findResult) {
    const userId = await createUser();

    session.id = userId;
    await session.save();

    return userId;
  }

  return userId;
}

async function createUser() {
  const createUserResult = await db.user.create({
    data: { id: getObjectId() },
  });

  return createUserResult.id;
}
