import {
  faEnvelope,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KakaoShareButton from "../KakaoShare";

interface HeadingProps {
  canShow: boolean;
  isPublic: boolean;
  openAt: string;
  id: string;
  accessToken: string | null;
}

export default function Heading({
  canShow,
  isPublic,
  openAt,
  id,
  accessToken,
}: HeadingProps) {
  return (
    <section className="flex justify-between items-start">
      <div className="flex gap-3 items-center">
        <div className="relative rounded-full bg-blue-600 size-10 flex justify-center items-center p-1">
          <FontAwesomeIcon
            icon={canShow ? faEnvelopeOpenText : faEnvelope}
            className="text-lg text-white"
          />
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <span className="text-xs font-semibold rounded text-white bg-neutral-500 px-1 bg-blue-6">
              {isPublic ? "공개" : "비공개"}
            </span>
            <p className="font-semibold">덕담</p>
          </div>
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-blue-600">{openAt}</span>에 열림
          </p>
        </div>
      </div>

      <div>
        <KakaoShareButton
          type="small"
          id={id}
          accessToken={accessToken}
          isPublic={isPublic}
        />
      </div>
    </section>
  );
}
