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
  isLinkCard?: boolean;
  children?: React.ReactNode;
}

export default function DeokdamCard({
  nickname,
  payload,
  openAt,
  isOpen,
  isOwner,
  isLinkCard = false,
  children,
}: CardProps) {
  return (
    <div
      className={`${
        isLinkCard && "hover:bg-neutral-200 dark:hover:bg-neutral-900"
      } transition w-full space-y-3 min-h-30 p-5 rounded-2xl shadow dark:bg-neutral-800 dark:border-neutral-800`}
    >
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
