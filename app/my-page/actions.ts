"use server";

import db from "@/lib/db";
import { upsertUser } from "@/lib/upsertUser";
import { unstable_cache } from "next/cache";

async function _getUserDeokdam({ userId }: { userId: string | undefined }) {
  const deokdams = await db.message.findMany({
    where: { writerId: userId },
    orderBy: { openAt: "asc" }, // 오름차순
  });

  return deokdams;
}

export const getUserDeokdam = async () => {
  const userId = await upsertUser();

  return unstable_cache(
    () => _getUserDeokdam({ userId }),
    [`user-${userId}-deokdam`],
    {
      tags: [`user-${userId}-deokdam`],
    }
  )();
};
