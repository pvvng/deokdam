"use server";

import db from "../db";
import { getObjectId, isObjectId } from "../objectId";
import { login, logout } from "../session";

/**
 * db에 저장된 사용자를 검색하거나 없다면 생성하는 액션
 *
 * 서버 컴포넌트에서 사용시 오류 발생하니 서버액션, api route에서만 사용
 */
export async function findOrCreateUser(id: string | undefined) {
  // 아이디가 존재하지 않는 경우엔 생성
  // 아이디는 존재하지만 ObjectId 형식이 아닐 경우 생성
  if (!(id && isObjectId(id))) {
    return await createNewUser();
  }

  const findUserRes = await db.user.findUnique({
    where: { id: getObjectId(id) },
  });

  if (findUserRes) {
    return findUserRes;
  }

  // 존재하지 않는 사용자인 경우
  return await createNewUser();
}

export async function createNewUser() {
  logout();

  const createUserRes = await db.user.create({
    data: {
      id: getObjectId(),
    },
  });

  // 사용자 로그인
  login(createUserRes.id);
  return createUserRes;
}
