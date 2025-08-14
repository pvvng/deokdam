import KakaoLoginButton from "@/components/Auth/KakaoLoginButton";
import RotateLandScape from "@/components/Main/RotateLandScape";
import Stars from "@/components/Main/Stars";
import Link from "next/link";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <div className="font-paperlogy w-full h-screen mx-auto relative overflow-hidden">
      <RotateLandScape>
        <Stars />
      </RotateLandScape>
      {/* modal */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center p-5">
        <div className="shrink-0 max-w-screen-sm w-full p-5 rounded-2xl bg-neutral-100/80 shadow">
          <section className="text-center space-y-5">
            <div>
              <h1 className="text-4xl font-bold">덕담</h1>
              <h2 className="font-medium text-neutral-600">간편 로그인</h2>
            </div>
            <KakaoLoginButton />
            <Link
              href="/"
              className="underline underline-offset-2 text-blue-600 hover:text-blue-500 transition"
            >
              홈으로 이동
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
