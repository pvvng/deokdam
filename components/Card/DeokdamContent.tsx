import ExpandablePayload from "../ExpandablePayload";
import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  nickname: string;
  payload: string;
  openAt: string;
  isOpen: boolean;
  isOwner: boolean;
  children?: React.ReactNode;
}

export default function DeokdamContent({
  nickname,
  payload,
  openAt,
  isOpen,
  isOwner,
  children,
}: CardProps) {
  const canShow = isOwner || isOpen;

  return (
    <>
      <Heading nickname={nickname} isOpen={isOpen} openAt={openAt} />
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow={canShow} payload={payload} />
      {children}
    </>
  );
}

interface HeadingProps {
  nickname: string;
  openAt: string;
  isOpen: boolean;
}

function Heading({ nickname, isOpen, openAt }: HeadingProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="shrink-0 relative rounded-full bg-blue-600 size-10 flex justify-center items-center p-1">
        <FontAwesomeIcon
          icon={isOpen ? faEnvelopeOpenText : faEnvelope}
          className="text-lg text-white"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span
            className={`shrink-0 text-xs font-semibold rounded text-white px-1 bg-blue-6 ${
              isOpen ? "bg-blue-600" : "bg-neutral-500"
            }`}
          >
            {isOpen ? "공개" : "비공개"}
          </span>
          <p className="font-semibold line-clamp-1">{nickname}</p>
        </div>
        <p className="text-xs text-gray-500">
          <span className={`${!isOpen && "text-blue-600"} font-semibold`}>
            {openAt}
          </span>
          에 열림
        </p>
      </div>
    </div>
  );
}
