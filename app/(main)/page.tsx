import Chats from "@/components/Main/Chats";
import RotateLandScape from "@/components/Main/RotateLandScape";
import Stars from "@/components/Main/Stars";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="text-center">
        <h1 className="text-6xl font-bold mb-3">덕담</h1>
        <p className="text-neutral-500">추석엔 마음을 나누는 덕담 한 마디.</p>
        <p className="text-neutral-500">
          덕담에서 가족·친구·연인에게 당신의 따뜻한 말을 전하세요.
        </p>
      </section>

      <section className="w-full max-w-96 h-96 mx-auto relative rounded-2xl overflow-hidden">
        <Chats />
        <RotateLandScape>
          <Stars />
        </RotateLandScape>
        <Image
          src="/덕담_토끼.webp"
          alt="덕담"
          priority
          fill
          sizes="400px"
          className="object-cover"
        />
      </section>
    </>
  );
}
