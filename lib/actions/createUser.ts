"use server";

import db from "../db";
import { getObjectId } from "../objectId";
import { getSession } from "../session";

export async function createUser() {
  const session = await getSession();
  // 기존 세션 파괴
  session.destroy();

  // 새 사용자 생성
  const res = await db.user.create({
    data: { id: getObjectId() },
  });

  // 세션 업데이트
  session.id = res.id;
  session.save();

  return res;
}
