import CommentCard from "../CommentCard";
import { getComments } from "@/app/d/[id]/actions";
import { formatDateKorean } from "@/lib/utils";

interface CommentsProps {
  deokdamId: string;
}

export default async function Comments({ deokdamId }: CommentsProps) {
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
