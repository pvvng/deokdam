import Card from "@/components/Card";
import KakaoShareButton from "@/components/KakaoShare";
import { notFound, unauthorized } from "next/navigation";
import { findUser, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";

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
  const isOwner = deokdam.userId === userId;
  const hasAccessToken = userAccessToken.includes(deokdam.token ?? "");
  const isAuthorized = isOwner || hasAccessToken;
  if (!isAuthorized) return unauthorized();

  return (
    <div>
      <Card
        key={deokdam.id}
        payload={deokdam.payload}
        openAt={formatDateKorean(new Date(deokdam.openAt))}
        isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
        isOwner={isOwner}
      >
        <div className="w-full flex justify-end">
          <KakaoShareButton type="small" id={id} accessToken={deokdam.token} />
        </div>
      </Card>
      {/* TODO: comment form */}
      {/* TODO: comment card */}
      {deokdam.comments.map((comment) => (
        <div key={comment.id}></div>
      ))}
    </div>
  );
}
