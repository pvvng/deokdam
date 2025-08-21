import Heading from "./Heading";
import ExpandablePayload from "../ExpandablePayload";
import KakaoShareButton from "../KakaoShare";

interface CardProps {
  id: string;
  payload: string;
  openAt: string;
  accessToken: string | null;
  isOpen: boolean;
  isOwner: boolean;
  isPublic: boolean;
}

export default function Card({
  id,
  payload,
  openAt,
  accessToken,
  isOpen,
  isOwner,
  isPublic,
}: CardProps) {
  const canShow = isOwner || isPublic || isOpen;

  return (
    <div className="p-5 w-full min-h-30 border border-neutral-100 shadow rounded-2xl space-y-3">
      <Heading
        canShow={canShow}
        isPublic={isPublic}
        isOpen={isOpen}
        openAt={openAt}
      />
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow={canShow} payload={payload} />
      <div className="w-full flex justify-end">
        <KakaoShareButton
          type="small"
          id={id}
          accessToken={accessToken}
          isPublic={isPublic}
        />
      </div>
    </div>
  );
}
