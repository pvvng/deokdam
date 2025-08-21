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

export function Card(props: CardProps) {
  const canShow = props.isOwner || props.isPublic || props.isOpen;

  return (
    <div className="p-5 w-full min-h-30 border border-neutral-100 shadow rounded-2xl space-y-3">
      <Heading canShow={canShow} {...props} />
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow={canShow} payload={props.payload} />
      <div className="w-full flex justify-end">
        <KakaoShareButton
          type="small"
          id={props.id}
          accessToken={props.accessToken}
          isPublic={props.isPublic}
        />
      </div>
    </div>
  );
}
