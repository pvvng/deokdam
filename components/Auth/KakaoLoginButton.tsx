"use client";

import { handleKakaoLogin } from "@/app/login/actions";
import Image from "next/image";

export default function KakaoLoginButton() {
  return (
    <button
      onClick={handleKakaoLogin}
      className="shrink-0 w-full max-w-48 bg-[#FEE500] active:scale-95 transition p-2.5 rounded-lg 
      flex gap-2 justify-center items-center cursor-pointer mx-auto shadow"
    >
      <Image
        src="/kakao-icon.svg"
        alt="카카오 아이콘"
        width={20}
        height={20}
        priority
      />
      카카오 로그인
    </button>
  );
}
