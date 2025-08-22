"use client";

import { postComment } from "@/lib/actions";
import { useActionState } from "react";
import { Button, Input } from "../FormItems";

export default function CommentForm({ deokdamId }: { deokdamId: string }) {
  const [state, action] = useActionState(postComment, null);

  return (
    <form action={action} className="space-y-5">
      <p className="text-lg font-semibold">댓글 작성하기</p>
      <input
        defaultValue={deokdamId}
        name="deokdamId"
        className="hidden size-0"
        required
      />
      <Input
        name="nickname"
        placeholder="댓글을 볼 사람에게 보여질 별명을 입력하세요."
        required
        errors={state?.error?.nickname}
      />
      <Input
        name="payload"
        placeholder="댓글의 내용을 작성하세요."
        required
        errors={state?.error?.payload || state?.error?.deokdamId}
      />
      <Button text="댓글 작성하기" />
    </form>
  );
}
