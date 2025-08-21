import { notFound, unauthorized } from "next/navigation";
import { getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { Card } from "@/components/Card";
import db from "@/lib/db";
import { getObjectId } from "@/lib/objectId";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeokdamDetailPage({
  params,
}: DeokdamDetailPageProps) {
  return null;
  // const id = (await params).id;

  // const session = await getSession();
  // const userId = session.id;

  // const userdata = await db.user.findUnique({
  //   where: { id: getObjectId(userId) },
  // });
  // const userAccessToken = userdata?.accessTokens ?? [];

  // const deokdam = await getDeokdam({ id });

  // if (!deokdam) return notFound();

  // const isAuthorized =
  //   deokdam.isPublic ||
  //   deokdam.writerId === userId ||
  //   userAccessToken.includes(deokdam.token || "");

  // if (!isAuthorized) return unauthorized();

  // return (
  //   <Card
  //     key={deokdam.id}
  //     id={deokdam.id}
  //     payload={deokdam.payload}
  //     openAt={formatDateKorean(new Date(deokdam.openAt))}
  //     isOwner={deokdam.writerId === userId}
  //     isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
  //     isPublic={deokdam.isPublic}
  //     accessToken={deokdam.token}
  //   />
  // );
}
