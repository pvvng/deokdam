import { redirect } from "next/navigation";

/** token save api route */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const messageId = url.searchParams.get("id");
  const accessToken = url.searchParams.get("token");

  return redirect(`/d/${messageId}`);
}
