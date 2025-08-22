import { CommentsLoading } from "./loading";
import { KakaoShareButton } from "@/components/Kakao";
import { CommentForm } from "@/components/Form";
import { CommentCard, DeokdamCard } from "@/components/Card";
import { findUser, getComments, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { Suspense } from "react";
import { notFound, unauthorized } from "next/navigation";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DeokdamDetailPageProps) {
  const id = (await params).id;
  const deokdam = await getDeokdam({ id });

  return {
    title: deokdam?.nickname
      ? `${deokdam.nickname}님의 따뜻한 덕담`
      : "덕담을 확인해보세요!",
  };
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
    <div className="space-y-15">
      <DeokdamCard
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
      </DeokdamCard>

      <Suspense fallback={<CommentsLoading />}>
        <Comments deokdamId={deokdam.id} deokdamUserId={deokdam.userId} />
      </Suspense>

      <CommentForm deokdamId={deokdam.id} />
    </div>
  );
}

interface CommentsProps {
  deokdamId: string;
  deokdamUserId: string;
}

async function Comments({ deokdamId, deokdamUserId }: CommentsProps) {
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
            isAuthor={deokdamUserId === comment.userId}
          />
        ))
      )}
    </section>
  );
}
