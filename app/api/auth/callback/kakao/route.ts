// import db from "@/lib/db";
// import { getAppUrl } from "@/lib/getAppUrl";
// import { getObjectId } from "@/lib/objectId";
// import { getSession, login } from "@/lib/session";
// import { NextResponse } from "next/server";

// interface KakaoUser {
//   id: BigInt;
//   kakao_account: {
//     profile: {
//       nickname: string;
//       profile_image_url: string;
//     };
//     email: string;
//   };
// }

// export async function GET(req: Request) {
//   const appUrl = getAppUrl();

//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.json({ error: "No code provided" }, { status: 400 });
//   }

//   let tokenData;
//   try {
//     const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         client_id: process.env.KAKAO_CLIENT_ID!,
//         redirect_uri: `${appUrl}/api/auth/callback/kakao`,
//         code,
//       }),
//     });

//     if (!tokenRes.ok) {
//       const text = await tokenRes.text();
//       console.error("카카오 토큰 요청 실패:", text);
//       return NextResponse.json(
//         { error: "Failed to get token from Kakao" },
//         { status: 502 }
//       );
//     }

//     tokenData = await tokenRes.json();
//   } catch (e) {
//     console.error("카카오 토큰 요청 중 예외 발생:", e);
//     return NextResponse.json(
//       { error: "Exception during token request" },
//       { status: 500 }
//     );
//   }

//   if (tokenData.error) {
//     return NextResponse.json(tokenData, { status: 400 });
//   }

//   const accessToken = tokenData.access_token;

//   let userData: KakaoUser;
//   try {
//     const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if (!userRes.ok) {
//       const text = await userRes.text();
//       console.error("카카오 사용자 정보 요청 실패:", text);
//       return NextResponse.json(
//         { error: "Failed to get user info from Kakao" },
//         { status: 502 }
//       );
//     }

//     userData = await userRes.json();
//   } catch (e) {
//     console.error("카카오 사용자 정보 요청 중 예외 발생:", e);
//     return NextResponse.json(
//       { error: "Exception during user info request" },
//       { status: 500 }
//     );
//   }

//   const providerId = userData.id.toString();
//   const {
//     email,
//     profile: { nickname: name, profile_image_url: avatar },
//   } = userData.kakao_account;

//   // 세션 존재하면 얼리리턴
//   const session = await getSession();
//   if (session.id) {
//     return NextResponse.redirect(new URL(`/my-page`, req.url));
//   }

//   try {
//     const findRes = await db.user.findUnique({
//       where: { providerId },
//       select: { id: true },
//     });
//     if (findRes !== null) {
//       await login(findRes.id);
//       return NextResponse.redirect(new URL(`/my-page`, req.url));
//     }
//   } catch (e) {
//     console.error("사용자 검색 중 에러 발생: ", e);
//     return NextResponse.json(
//       { error: "Error occurred while searching for user" },
//       { status: 500 }
//     );
//   }

//   try {
//     const insertRes = await db.user.create({
//       select: { id: true },
//       data: {
//         id: getObjectId(),
//         name,
//         avatar,
//         email,
//         providerId,
//       },
//     });
//     await login(insertRes.id);
//     return NextResponse.redirect(new URL(`/my-page`, req.url));
//   } catch (e) {
//     console.error("신규 사용자 추가 중 에러 발생: ", e);
//     return NextResponse.json(
//       { error: "Error occurred while adding new user" },
//       { status: 500 }
//     );
//   }
// }
