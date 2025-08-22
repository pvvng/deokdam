import Heading from "./Heading";
import ExpandablePayload from "../ExpandablePayload";

interface CardProps {
  nickname: string;
  payload: string;
  openAt: string;
  isOpen: boolean;
  isOwner: boolean;
  children?: React.ReactNode;
}

export default function Card({
  nickname,
  payload,
  openAt,
  isOpen,
  isOwner,
  children,
}: CardProps) {
  const canShow = isOwner || isOpen;

  return (
    <div className="p-5 w-full min-h-30 border border-neutral-100 shadow rounded-2xl space-y-3">
      <Heading nickname={nickname} isOpen={isOpen} openAt={openAt} />
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow={canShow} payload={payload} />
      {children}
    </div>
  );
}
