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
}
export default function CommentCard({
  nickname,
  createdAt,
  payload,
}: CommentCardProps) {
  return (
    <div className="w-full space-y-3 min-h-30 p-5 rounded-2xl border border-neutral-100 shadow">
      <div>
        <Nickname nickname={nickname} />
        <TimeStamp timeColor="gray" highlight time={createdAt} label="작성" />
      </div>
      <DashedHorizon />
      <ExpandablePayload canShow payload={payload} />
    </div>
  );
}
