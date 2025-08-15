"use server";

import db from "@/lib/db";
import { unstable_cache } from "next/cache";

async function _getUserdata({ userId }: { userId: string }) {
  const userdata = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return userdata;
}

export const getUserdata = unstable_cache(_getUserdata, ["userdata"], {
  tags: ["userdata"],
});
