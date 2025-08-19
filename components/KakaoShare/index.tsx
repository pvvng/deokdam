"use client";

import Image from "next/image";
import KakaoProvider from "../KakaoProvider";
import { redirect } from "next/navigation";

interface KakaoShareButtonProps {
  id: string | null;
  accessToken: string | null;
  isPublic: boolean | null;
}

export default function KakaoShareButton({
  id,
  accessToken,
  isPublic,
}: KakaoShareButtonProps) {
  const handleShare = () => {
    if (!window.Kakao || !id) return;

    // path 생성 로직
    const buildSharePath = () => {
      return isPublic ? id : `${id}?token=${accessToken}`;
    };

    // 공유 데이터 구성
    const shareContent = (path: string) => ({
      objectType: "feed",
      content: {
        title: "덕담이 도착했어요!",
        description: "내게 도착한 덕담 확인하기",
        imageUrl:
          "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          mobileWebUrl: `${window.location.origin}/d/${path}`,
          webUrl: `${window.location.origin}/d/${path}`,
        },
      },
    });

    const path = buildSharePath();
    window.Kakao.Share.sendDefault(shareContent(path));

    // 덕담 페이지로 리디렉트
    return redirect(`/d/${id}`);
  };

  return (
    <KakaoProvider>
      <button
        onClick={handleShare}
        className="bg-[#FEE500] px-4 py-2 rounded-2xl cursor-pointer mx-auto shadow
        flex gap-2 justify-center items-center active:scale-95 transition text-black"
      >
        <Image
          src="/kakao-icon.svg"
          alt="카카오 아이콘"
          width={20}
          height={20}
          priority
          draggable={false}
        />
        <span>카카오톡 공유</span>
      </button>
    </KakaoProvider>
  );
}
