import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  tokens?: string[];
}

const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD!;

export async function getAccessTokenSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "deokdam_at",
    password: COOKIE_PASSWORD,
    ttl: 0, // 무제한 세션
  });
}
