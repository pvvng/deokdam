import { notFound, unauthorized } from "next/navigation";
import { getUserDeokdam } from "./actions";
import KakaoShareButton from "@/components/KakaoShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import ExpandablePayload from "@/components/ExpandablePayload";
import { getSession } from "@/lib/session";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeokdamDetailPage({
  params,
}: DeokdamDetailPageProps) {
  const id = (await params).id;

  const session = await getSession();
  const userId = session.id;

  const deokdam = await getUserDeokdam({ id });

  if (!deokdam) return notFound();

  const isOwner = deokdam.writerId === userId;

  const isOpen = isDeokdamOpen(new Date(deokdam.openAt));
  const openDate = formatDateKorean(new Date(deokdam.openAt));

  // 개봉 불가
  if (!isOpen) {
    return (
      <div
        className="w-full aspect-video rounded-2xl shadow bg-neutral-100 p-5 
        flex flex-col gap-5 justify-center items-center"
      >
        <div className="relative rounded-2xl bg-blue-600 size-12 flex justify-center items-center p-1 shadow mx-auto">
          <FontAwesomeIcon icon={faEnvelope} className="text-lg text-white" />
        </div>
        <p>
          <span className="font-semibold text-xl">{openDate}</span> 이후 열람
          가능
        </p>
        <KakaoShareButton
          id={deokdam.id}
          accessToken={deokdam.token}
          isPublic={deokdam.isPublic}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 border border-neutral-100 rounded-2xl shadow p-5 w-full min-h-30">
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
            <p className="text-xs text-gray-500">{openDate}에 열림</p>
          </div>
        </div>
        <KakaoShareButton
          type="small"
          id={deokdam.id}
          accessToken={deokdam.token}
          isPublic={deokdam.isPublic}
        />
      </div>
      <hr className="border-dashed border-gray-200" />
      <ExpandablePayload payload={deokdam.payload} />
    </div>
  );
}
