import { getAccessTokenSession } from "@/lib/accessToken";
import { redirect } from "next/navigation";

/** token save api route */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const token = url.searchParams.get("token");

  const tokenSession = await getAccessTokenSession();
  const accessTokens = tokenSession.tokens ?? [];
  if (token && !accessTokens.includes(token)) {
    accessTokens.push(token);
  }
  tokenSession.tokens = accessTokens;
  await tokenSession.save();

  return redirect(`/d/${id}`);
}
