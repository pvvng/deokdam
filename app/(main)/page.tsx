import PhoneContent from "@/components/Phone/MainContent";
import RabbitsChats from "@/components/ChatDemo";
import Phone from "@/components/Phone";
import Image from "next/image";
import RotateStarBackground from "@/components/RotateStarBackground";
import DeokdamFormContainer from "@/components/DeokdamForm/Container";
import Chat from "@/components/Chat";

export default async function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center space-y-5">
        <h1 className="text-6xl font-bold">덕담</h1>
        <div>
          <p className="text-neutral-600">추석엔 마음을 나누는 덕담 한 마디.</p>
          <p className="text-neutral-600">
            덕담에서 가족·친구·연인에게 당신의 따뜻한 말을 전하세요.
          </p>
        </div>
        <section className="w-full max-w-96 h-96 mx-auto relative rounded-2xl overflow-hidden">
          <RabbitsChats />
          <RotateStarBackground />
          <Image
            src="/덕담_토끼.webp"
            alt="덕담"
            priority
            fill
            sizes="400px"
            className="object-cover"
          />
        </section>
      </section>

      <section className="space-y-5 text-center">
        <h2 className="text-3xl font-bold">요즘..</h2>
        <div className="text-neutral-600">
          <p>주변 사람들에게 연락 잘 하고 있나요?</p>
          <p>
            바쁘게 지내다 보면 소중한 사람들에게 마음을 전하는 걸 깜빡할 때도
            있죠.
          </p>
          <p>잠시 멈춰서, 작은 한마디로 마음을 전해보는 건 어떨까요?</p>
        </div>
        <Phone>
          <PhoneContent />
        </Phone>
      </section>

      <section className="space-y-5 text-center">
        <h2 className="text-3xl font-bold">이번 추석엔</h2>
        <div className="text-neutral-600">
          <strong className="font-bold text-blue-600 text-lg">덕담</strong>을
          활용해 보세요.
          <p>
            말 한마디로 마음을 전하고, 서로의 하루를 조금 더 특별하게 만들 수
            있어요.
          </p>
        </div>
        <Chat type="end" text="잘 지내고 있어?" interval={100} />
      </section>

      <section className="space-y-5 text-center">
        <h2 className="text-3xl font-bold">덕담에선</h2>
        <div className="text-neutral-600">
          <p>간단하게 안부인사를 보내고 받을 수 있어요.</p>
          <p>작은 마음이 모여 큰 행복이 되는 경험, 지금 바로 시작해 보세요.</p>
        </div>
        <DeokdamFormContainer />
      </section>
    </div>
  );
}
