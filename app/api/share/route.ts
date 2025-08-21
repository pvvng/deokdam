import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/** token save api route */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("id");
  const accessToken = url.searchParams.get("token");

  return redirect(`/d/${postId}`);
}
