import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import {
  DashedHorizon,
  ExpandablePayload,
  IconBadge,
  Nickname,
  TimeStamp,
} from "../CardItems";

interface CardProps {
  nickname: string;
  payload: string;
  openAt: string;
  isOpen: boolean;
  isOwner: boolean;
  children?: React.ReactNode;
}

export default function DeokdamCard({
  nickname,
  payload,
  openAt,
  isOpen,
  isOwner,
  children,
}: CardProps) {
  return (
    <div className="w-full space-y-3 min-h-30 p-5 rounded-2xl border border-neutral-100 shadow">
      <div className="flex gap-3 items-center">
        <IconBadge
          isActive={isOpen}
          activeIcon={faEnvelopeOpenText}
          inActiveIcon={faEnvelope}
        />
        <div>
          <Nickname nickname={nickname} />
          <TimeStamp
            timeColor={isOpen ? "gray" : "blue"}
            highlight
            time={openAt}
            label="열림"
          />
        </div>
      </div>
      <DashedHorizon />
      <ExpandablePayload canShow={isOwner || isOpen} payload={payload} />
      {children}
    </div>
  );
}
