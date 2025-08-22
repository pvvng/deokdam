import { notFound, unauthorized } from "next/navigation";
import { findUser, getComments, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { Suspense } from "react";
import { CommentsLoading } from "./loading";
import DeokdamContent from "@/components/Card/DeokdamContent";
import { KakaoShareButton } from "@/components/Kakao";
import { CommentForm } from "@/components/Form";
import CommentCard from "@/components/CommentCard";

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
          <KakaoShareButton type="small" id={id} accessToken={deokdam.token} />
        </div>
      </DeokdamContent>

      <Suspense fallback={<CommentsLoading />}>
        <Comments deokdamId={deokdam.id} />
      </Suspense>

      <CommentForm deokdamId={deokdam.id} />
    </div>
  );
}

interface CommentsProps {
  deokdamId: string;
}

async function Comments({ deokdamId }: CommentsProps) {
  const comments = await getComments({ deokdamId });

  return (
    <section className="space-y-5">
      <p className="text-lg font-semibold">댓글 ({comments.length})</p>
      {comments.length === 0 ? (
        <p>아직 작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            nickname={comment.nickname}
            createdAt={formatDateKorean(new Date(comment.createdAt))}
            payload={comment.payload}
          />
        ))
      )}
    </section>
  );
}
