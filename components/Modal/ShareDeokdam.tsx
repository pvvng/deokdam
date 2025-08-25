"use client";

import Image from "next/image";
import Portal from "./Portal";
import Overlay from "./Overlay";
import RotateStarBackground from "../RotateStarBackground";

interface ShareDeokDamModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ShareDeokDamModal({
  children,
  onClose,
}: ShareDeokDamModalProps) {
  return (
    <Portal>
      <Overlay onClose={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative shrink-0 w-full max-w-80 aspect-square rounded-2xl
          font-paperlogy text-center overflow-hidden"
        >
          {/* content */}
          <div
            className="w-full absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2 space-y-2 z-10 text-white p-5"
          >
            <p className="font-semibold sm:text-2xl text-lg">
              방금 작성한 덕담 공유하기
            </p>
            <p className="font-semibold text-gray-400 text-center sm:text-base text-sm">
              이 덕담을 공유하면, 카톡을 받은 사용자에게 덕담이 전달됩니다.
            </p>
            {children}
            <button
              onClick={onClose}
              className="underline underline-offset-2 text-blue-400 hover:text-blue-500 transition cursor-pointer sm:text-base text-sm"
            >
              이 창 닫기
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
