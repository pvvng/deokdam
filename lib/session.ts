import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  ids?: string[];
}

export async function getWrittenIdSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "deokdam_w",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function getAllowedIdSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "deokdam_g",
    password: process.env.COOKIE_PASSWORD!,
  });
}
