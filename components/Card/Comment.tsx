import {
  DashedHorizon,
  ExpandablePayload,
  Nickname,
  TimeStamp,
} from "../CardItems";

interface CommentCardProps {
  nickname: string;
  createdAt: string;
  payload: string;
  isAuthor: boolean;
}

export default function CommentCard({
  nickname,
  createdAt,
  payload,
  isAuthor,
}: CommentCardProps) {
  return (
    <div className="w-full space-y-3 min-h-30 p-5 rounded-2xl border border-neutral-100 shadow">
      <div className="flex gap-1 items-center">
        <Nickname nickname={nickname} />
        {isAuthor && <span className="text-xs text-blue-600">덕담 주인</span>}
      </div>
      <TimeStamp timeColor="gray" highlight time={createdAt} label="작성" />
      <DashedHorizon />
      <ExpandablePayload canShow payload={payload} />
    </div>
  );
}
