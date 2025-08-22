"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { getSession } from "@/lib/session";
import { unstable_cache } from "next/cache";

async function _getDeokdam({ id }: { id: string | undefined }) {
  const deokdam = await db.post.findUnique({
    where: { id: getObjectId(id) },
  });

  return deokdam;
}

export const getDeokdam = async ({ id }: { id: string }) => {
  return unstable_cache(() => _getDeokdam({ id }), [`deokdam-${id}`], {
    tags: [`deokdam-${id}`],
  })();
};

export async function _findUser({ userId }: { userId: string | undefined }) {
  const userdata = await db.user.findUnique({
    where: { id: getObjectId(userId) },
  });

  return userdata;
}

export const findUser = async () => {
  const session = await getSession();
  const userId = session.id;

  return unstable_cache(() => _findUser({ userId }), [`user-${userId}`], {
    tags: [`user-${userId}`],
  })();
};

export async function _getComments({ deokdamId }: { deokdamId: string }) {
  const comments = await db.comment.findMany({
    where: { postId: getObjectId(deokdamId) },
  });

  return comments;
}

export const getComments = async ({ deokdamId }: { deokdamId: string }) => {
  return unstable_cache(
    () => _getComments({ deokdamId }),
    [`comments-${deokdamId}`],
    {
      tags: [`comments-${deokdamId}`],
    }
  )();
};
