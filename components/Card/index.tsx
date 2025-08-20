import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ExpandablePayload from "../ExpandablePayload";

interface CardProps {
  id: string;
  payload: string;
  openAt: string;
  isDeokdamOpen: boolean;
  isPublic: boolean;
  isOwner: boolean;
  accessToken: string | undefined;
}

export function Card({
  id,
  payload,
  openAt,
  isPublic,
  isDeokdamOpen,
  isOwner,
  accessToken,
}: CardProps) {
  if (!isDeokdamOpen && !isOwner) {
    return (
      <div
        className="p-5 w-full min-h-30 border border-gray-200 bg-gray-200 shadow rounded-2xl space-y-2 transition
        flex flex-col justify-center items-center"
      >
        <div className="relative rounded-full bg-blue-600 size-10 flex justify-center items-center p-1 shadow">
          <FontAwesomeIcon icon={faEnvelope} className="text-lg text-white" />
        </div>
        <p>
          <span className="font-semibold">{openAt}</span> 이후 열람 가능
        </p>
      </div>
    );
  }

  return (
    <Link href={`/d/${id}`}>
      <div className="p-5 w-full min-h-30 border border-neutral-100 shadow rounded-2xl space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="relative rounded-full bg-blue-600 size-10 flex justify-center items-center p-1">
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-lg text-white"
              />
            </div>
            <div>
              <p className="font-semibold">덕담</p>
              <p className="text-xs text-gray-500">{openAt}에 열림</p>
            </div>
          </div>
          {!isPublic && (
            <span className="inline-block text-xs font-semibold bg-neutral-400 rounded text-white px-1">
              비공개
            </span>
          )}
        </div>
        <hr className="border-dashed border-gray-200" />

        <ExpandablePayload payload={payload} />
      </div>
    </Link>
  );
}
