"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { unstable_cache } from "next/cache";

interface IProps {
  userId: string | undefined;
}

async function _getUserDeokdam({ userId }: IProps) {
  const deokdams = await db.post.findMany({
    where: { userId: getObjectId(userId) },
    orderBy: { openAt: "asc" }, // 오름차순
  });

  return deokdams;
}

/** session userId 기반으로 현재 사용자가 작성한 덕담 불러오기 */
export const getUserDeokdam = async ({ userId }: IProps) => {
  return unstable_cache(
    () => _getUserDeokdam({ userId }),
    [`user-${userId}-deokdam`],
    { tags: [`user-${userId}-deokdam`] }
  )();
};

export async function _getReceivedDeokdam({ userId }: IProps) {
  const userdata = await db.user.findUnique({
    where: { id: getObjectId(userId) },
    select: { postAccessTokens: true },
  });

  if (!userdata) return [];

  const tokens = userdata.postAccessTokens;
  // token 일치하는 post 찾기
  const received = await db.post.findMany({
    where: {
      token: { in: tokens },
    },
    orderBy: {
      openAt: "asc", // 오름차순
    },
  });

  return received;
}

/** session userId 기반으로 현재 사용자가 저장한 accessToken에 대한 덕담 불러오기 */
export const getReceivedDeokdam = async ({ userId }: IProps) => {
  return unstable_cache(
    () => _getReceivedDeokdam({ userId }),
    [`user-${userId}-received`],
    { tags: [`user-${userId}-received`] }
  )();
};
