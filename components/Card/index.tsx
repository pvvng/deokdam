import Heading from "./Heading";
import ExpandablePayload from "../ExpandablePayload";
import Link from "next/link";

interface CardProps {
  id: string;
  payload: string;
  openAt: string;
  accessToken: string | null;
  isOpen: boolean;
  isPublic: boolean;
  isOwner: boolean;
  useLink?: boolean;
}

export function Card(props: CardProps) {
  const canShow = props.isOwner || props.isPublic || props.isOpen;

  if (props.useLink) {
    return (
      <Link
        href={`/d/${props.id}`}
        className="hover:bg-neutral-100 rounded-2xl transition-all"
      >
        <Card {...props} useLink={false} />
      </Link>
    );
  }

  return (
    <div className="p-5 w-full min-h-30 border border-neutral-100 shadow rounded-2xl space-y-3">
      <Heading canShow={canShow} {...props} />
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload canShow={canShow} payload={props.payload} />
    </div>
  );
}
