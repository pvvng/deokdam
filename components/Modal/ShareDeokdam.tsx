"use client";

import Image from "next/image";
import KakaoShareButton from "../KakaoShare";
import Portal from "./Portal";
import RotateStarBackground from "../RotateStarBackground";
import Overlay from "./Overlay";

interface ShareDeokDamModalProps {
  id: string | null;
  accessToken: string | null;
  isPublic: boolean | null;
  onClose: () => void;
}

export default function ShareDeokDamModal({
  id,
  accessToken,
  isPublic,
  onClose,
}: ShareDeokDamModalProps) {
  return (
    <Portal>
      <Overlay>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative shrink-0 w-full max-w-80 aspect-square rounded-2xl bg-white 
          font-paperlogy text-center overflow-hidden"
        >
          {/* content */}
          <div
            className="w-full absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 space-y-2 z-10 text-white p-5"
          >
            <p className="font-semibold text-2xl">방금 작성한 덕담 공유하기</p>
            <p className="font-semibold text-gray-400 text-center">
              이 덕담을 공유하면, 카톡을 받은 사용자에게 덕담이 전달됩니다.
            </p>
            <KakaoShareButton
              id={id}
              accessToken={accessToken}
              isPublic={isPublic}
            />
            <button
              onClick={onClose}
              className="text-sm underline underline-offset-2 text-blue-400 cursor-pointer"
            >
              공유하지 않고 닫기
            </button>
          </div>

          {/* rotate background */}
          <RotateStarBackground />

          {/* background image */}
          <Image
            src="/덕담_토끼.webp"
            alt="덕담토끼"
            priority
            fill
            sizes="320px"
            className="object-cover z-0 brightness-20"
          />
        </div>
      </Overlay>
    </Portal>
  );
}
