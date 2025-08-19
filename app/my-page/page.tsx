import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getUserDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";

export const metadata = {
  title: "내 덕담",
};

export default async function UserPage() {
  const deokdams = await getUserDeokdam();

  if (deokdams.length === 0) {
    return (
      <div className="mt-20 space-y-8 text-center">
        <p className="text-2xl text-center font-semibold">
          아직 작성한 덕담이 없습니다.
        </p>
        <Link
          href="/d/add"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition font-semibold text-white rounded-2xl"
        >
          덕담 작성하기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {deokdams.map((deokdam) => (
        <Card
          key={deokdam.id}
          id={deokdam.id}
          payload={deokdam.payload}
          openAt={formatDateKorean(new Date(deokdam.openAt))}
          isDeokdamOpen={isDeokdamOpen(new Date(deokdam.openAt))}
          isPublic={deokdam.isPublic}
          accessToken={deokdam.accessToken}
        />
      ))}
    </div>
  );
}

interface CardProps {
  id: string;
  payload: string;
  openAt: string;
  isDeokdamOpen: boolean;
  isPublic: boolean;
  accessToken: string | null;
}

function Card({
  id,
  payload,
  isDeokdamOpen,
  openAt,
  isPublic,
  accessToken,
}: CardProps) {
  if (!isDeokdamOpen) {
    return (
      <div
        className="p-5 w-full min-h-34 border border-gray-200 bg-gray-200 shadow rounded-2xl space-y-2 transition 
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
      <div className="p-5 w-full min-h-34 border border-neutral-100 shadow rounded-2xl space-y-3">
        {isDeokdamOpen}
        <div className="flex justify-between items-center">
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
        </div>
        <hr className="border-dashed border-gray-200" />
        <p className="break-words whitespace-pre-wrap">{payload}</p>
      </div>
    </Link>
  );
}
