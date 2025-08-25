# [덕담 (Deokdam)](https://deokdam.vercel.app/)
로그인 없이 추석 덕담을 주고받는 즐거운 웹사이트

## 소개
덕담은 로그인 없이 간편하게 추석 덕담을 주고받을 수 있는 웹사이트입니다.
1. 덕담을 생성하면 accessToken이 발급되며, 이 토큰을 통해 카카오톡으로 덕담을 공유하고 확인할 수 있습니다.
2. `쿠키(iron-session)`를 사용하여 덕담 작성내역, 공유받은 덕담을 확인할 수 있습니다.
3. 덕담을 공유받은 사람이 내용을 확인할 수 있는 시간을 사용자가 직접 설정할 수 있으며, 설정한 시간 이전에는 작성자 이외의 사람에게 내용이 비공개로 처리됩니다.
4. next.js `unstable_cache`를 사용한 데이터 캐싱을 통해 웹사이트 성능을 향상하였습니다.

## 기술 스택
- Frontend: Next.js, TypeScript
- Backend: MongoDB + Prisma
- 스타일링: Tailwind CSS
-	공유/연동: 카카오톡 공유 API, iron-session
