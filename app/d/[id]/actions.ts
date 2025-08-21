"use server";

import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { unstable_cache } from "next/cache";

async function _getDeokdam({ id }: { id: string | undefined }) {
  const deokdam = await db.message.findUnique({
    where: { id: getObjectId(id) },
  });

  return deokdam;
}

export const getDeokdam = async ({ id }: { id: string }) => {
  return unstable_cache(() => _getDeokdam({ id }), [`deokdam-${id}`], {
    tags: [`deokdam-${id}`],
  })();
};
