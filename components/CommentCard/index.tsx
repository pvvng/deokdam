import ExpandablePayload from "../ExpandablePayload";

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
        <p className="font-semibold">{nickname}</p>
        <p className="text-xs text-gray-500">{createdAt}에 작성</p>
      </div>
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow payload={payload} />
    </div>
  );
}
