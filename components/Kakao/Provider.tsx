import Script from "next/script";

export default function KakaoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
            console.log("Kakao SDK initialized");
          }
        }}
      />
      {children}
    </>
  );
}
