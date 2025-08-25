import { CommentsLoading } from "./loading";
import { KakaoShareButton } from "@/components/Kakao";
import { CommentForm } from "@/components/Form";
import { CommentCard, DeokdamCard } from "@/components/Card";
import { findUser, getComments, getDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { Suspense } from "react";
import { notFound, unauthorized } from "next/navigation";
import { AnimatedElement } from "@/components/AnimatedElement";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DeokdamDetailPageProps) {
  const id = (await params).id;
  const deokdam = await getDeokdam({ id });

  return {
    title: deokdam?.nickname
      ? `${deokdam.nickname}님이 작성한 덕담`
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

  const isOpen = isDeokdamOpen(new Date(deokdam.openAt));
  return (
    <div className="space-y-10">
      <AnimatedElement>
        <DeokdamCard
          isOpen={isOpen}
          isOwner={isOwner}
          nickname={deokdam.nickname}
          payload={deokdam.payload}
          openAt={formatDateKorean(new Date(deokdam.openAt))}
        >
          <div className="w-full flex justify-end">
            <KakaoShareButton
              type="small"
              id={deokdam.id}
              accessToken={deokdam.token}
            />
          </div>
        </DeokdamCard>
      </AnimatedElement>

      <Suspense fallback={<CommentsLoading />}>
        <AnimatedElement>
          <Comments deokdamId={deokdam.id} deokdamUserId={deokdam.userId} />
        </AnimatedElement>
      </Suspense>

      <AnimatedElement>
        <CommentForm deokdamId={deokdam.id} />
      </AnimatedElement>
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
