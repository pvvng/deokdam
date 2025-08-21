"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { getSession } from "@/lib/session";
import { unstable_cache } from "next/cache";

async function _getDeokdam({ id }: { id: string | undefined }) {
  const deokdam = await db.post.findUnique({
    where: { id: getObjectId(id) },
    include: { comments: true },
  });

  return deokdam;
}

export const getDeokdam = async ({ id }: { id: string }) => {
  return unstable_cache(() => _getDeokdam({ id }), [`deokdam-${id}`], {
    tags: [`deokdam-${id}`],
  })();
};

export async function findUser() {
  const session = await getSession();
  const userId = session.id;

  const userdata = await db.user.findUnique({
    where: { id: getObjectId(userId) },
  });

  return userdata;
}
