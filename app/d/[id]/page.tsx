import { notFound, unauthorized } from "next/navigation";
import { findUser, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import Comments from "@/components/Comments";
import { Suspense } from "react";
import { CommentsLoading } from "./loading";
import CommentForm from "@/components/CommentForm";
import DeokdamContent from "@/components/Card/DeokdamContent";
import { KakaoProvider, KakaoShareButton } from "@/components/Kakao";

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
    <div className="space-y-10">
      <DeokdamContent
        key={deokdam.id}
        nickname={deokdam.nickname}
        payload={deokdam.payload}
        openAt={formatDateKorean(new Date(deokdam.openAt))}
        isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
        isOwner={isOwner}
      >
        <div className="w-full flex justify-end">
          <KakaoProvider>
            <KakaoShareButton
              type="small"
              id={id}
              accessToken={deokdam.token}
            />
          </KakaoProvider>
        </div>
      </DeokdamContent>
      <Suspense fallback={<CommentsLoading />}>
        <Comments deokdamId={deokdam.id} />
      </Suspense>
      <CommentForm deokdamId={deokdam.id} />
    </div>
  );
}
