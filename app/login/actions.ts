"use server";

import { getAppUrl } from "@/lib/getAppUrl";
import { redirect } from "next/navigation";

/** 카카오 로그인 handler */
export async function handleKakaoLogin() {
  const appUrl = getAppUrl();

  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const clientId = process.env.KAKAO_CLIENT_ID!;
  const redirectURI = `${appUrl}/api/auth/callback/kakao`;

  const params = {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectURI,
  };

  const formattedParams = new URLSearchParams(params).toString();
  const kakaoAuthURL = `${baseURL}?${formattedParams}`;

  return redirect(kakaoAuthURL);
}
