"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/getObjectId";
import { getSession } from "@/lib/session";

export async function checkUserId() {
  const session = await getSession();
  const userId = session.id;

  if (userId) {
    return userId;
  }

  const createUserResult = await db.user.create({
    data: { id: getObjectId() },
  });

  session.id = userId;
  await session.save();

  return createUserResult.id;
}
