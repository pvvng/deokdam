import { notFound, unauthorized } from "next/navigation";
import { findUser, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import Card from "@/components/Card";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeokdamDetailPage({
  params,
}: DeokdamDetailPageProps) {
  const id = (await params).id;

  const userdata = await findUser();
  const userId = userdata?.id;
  const userAccessToken = userdata?.postAccessTokens ?? [];

  const deokdam = await getDeokdam({ id });
  if (!deokdam) return notFound();

  // check authorization
  const isPublic = deokdam.isPublic;
  const isOwner = deokdam.userId === userId;
  const hasAccessToken = userAccessToken.includes(deokdam.token ?? "");
  const isAuthorized = isPublic || isOwner || hasAccessToken;
  if (!isAuthorized) return unauthorized();

  return (
    <div>
      <Card
        key={deokdam.id}
        id={deokdam.id}
        payload={deokdam.payload}
        openAt={formatDateKorean(new Date(deokdam.openAt))}
        isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
        accessToken={deokdam.token ?? null}
        isPublic={isPublic}
        isOwner={isOwner}
      />
      {/* TODO: comment form */}
      {/* TODO: comment card */}
      {deokdam.comments.map((comment) => (
        <div key={comment.id}></div>
      ))}
    </div>
  );
}
