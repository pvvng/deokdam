import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: string;
}

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
  path: "/",
};

const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD!;

export async function getSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "deokdam",
    password: COOKIE_PASSWORD,
    ttl: 0, // 무제한 세션
    cookieOptions,
  });
}

/** 사용자 로그인 시키는 함수
 * @param id 로그인 할 유저의 id
 */
export async function login(id: string) {
  const session = await getSession();
  session.id = id;
  await session.save();
}

/** 사용자 로그아웃 시키는 함수 */
export async function logout() {
  const session = await getSession();
  await session.destroy();
}
