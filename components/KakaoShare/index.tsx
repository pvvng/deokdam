"use client";

import Image from "next/image";
import KakaoProvider from "../KakaoProvider";
import { redirect } from "next/navigation";

interface KakaoShareButtonProps {
  id: string | null;
  accessToken: string | null;
  isPublic: boolean | null;
  type?: "small" | "normal";
}

export default function KakaoShareButton({
  id,
  accessToken,
  isPublic,
  type = "normal",
}: KakaoShareButtonProps) {
  const handleShare = () => {
    if (!window.Kakao || !id) return;
    console.log(accessToken);

    // path 생성 로직
    const buildSearchParams = () => {
      if (!isPublic && accessToken) {
        const params = {
          id,
          token: accessToken,
        };
        return new URLSearchParams(params).toString();
      }

      return new URLSearchParams({ id }).toString();
    };

    // 공유 데이터 구성
    const shareContent = (params: string) => ({
      objectType: "feed",
      content: {
        title: "덕담이 도착했어요!",
        description: "내게 도착한 덕담 확인하기",
        imageUrl:
          "https://imagedelivery.net/MR01-6_39Z4fkK0Q1BsXww/e07a76d1-da5b-42be-30a7-1f14a1b7c200/public",
        link: {
          mobileWebUrl: `${window.location.origin}/api/share?${params}`,
          webUrl: `${window.location.origin}/api/share?${params}`,
        },
      },
    });

    const path = buildSearchParams();
    window.Kakao.Share.sendDefault(shareContent(path));

    // 덕담 페이지로 리디렉트
    return redirect(`/d/${id}`);
  };

  if (type === "small") {
    return (
      <KakaoProvider>
        <div className="relative group inline-block">
          <button
            onClick={handleShare}
            className="bg-[#FEE500] p-2 rounded cursor-pointer shadow
            flex gap-2 justify-center items-center active:scale-95 transition text-black"
          >
            <Image
              src="/kakao-icon.svg"
              alt="카카오 아이콘"
              width={15}
              height={15}
              priority
              draggable={false}
            />
          </button>

          {/* Hover 시 나타나는 label */}
          <span
            className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-28 rounded-lg
          bg-black text-white text-xs px-2 py-1 text-center
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            카카오톡으로 공유
            {/* 꼬리 삼각형 */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></span>
          </span>
        </div>
      </KakaoProvider>
    );
  }

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
