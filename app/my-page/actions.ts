"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { unstable_cache } from "next/cache";

async function _getUserDeokdam({ userId }: { userId: string | undefined }) {
  const deokdams = await db.post.findMany({
    where: { userId: getObjectId(userId) },
    orderBy: { openAt: "asc" }, // 오름차순
  });

  return deokdams;
}

/** session userId 기반으로 현재 사용자가 작성한 덕담 불러오기 */
export const getUserDeokdam = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  return unstable_cache(
    () => _getUserDeokdam({ userId }),
    [`user-${userId}-deokdam`],
    { tags: [`user-${userId}-deokdam`] }
  )();
};
