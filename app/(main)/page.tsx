import PhoneContent from "@/components/Phone/MainContent";
import Phone from "@/components/Phone";
import Image from "next/image";
import RotateStarBackground from "@/components/RotateStarBackground";
import Chat from "@/components/Chat";
import DemoChats from "@/components/Chat/Demo";
import { DeokdamFormWithShareModal } from "@/components/Form";
import { AnimatedElement } from "@/components/AnimatedElement";

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center space-y-5">
        <h1 className="text-4xl sm:text-6xl font-bold">덕담</h1>
        <div>
          <p className="text-neutral-600 dark:text-neutral-400 sm:text-base text-sm">
            추석엔 마음을 나누는 덕담 한 마디.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 sm:text-base text-sm">
            덕담에서 가족·친구·연인에게 당신의 따뜻한 말을 전하세요.
          </p>
        </div>
        <section className="w-full max-w-96 h-96 mx-auto relative rounded-2xl overflow-hidden">
          <DemoChats />
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

      <AnimatedElement>
        <div className="space-y-5 text-center">
          <h2 className="sm:text-3xl text-xl font-bold">요즘..</h2>
          <div className="text-neutral-600 dark:text-neutral-400 sm:text-base text-sm">
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
        </div>
      </AnimatedElement>

      <AnimatedElement>
        <div className="space-y-5 text-center">
          <h2 className="sm:text-3xl text-xl font-bold">이번 추석엔</h2>
          <div className="text-neutral-600 dark:text-neutral-400 sm:text-base text-sm">
            <strong className="font-bold text-blue-600 text-lg">덕담</strong>을
            활용해 보세요.
            <p>
              말 한마디로 마음을 전하고, 서로의 하루를 조금 더 특별하게 만들 수
              있어요.
            </p>
          </div>
          <div className="chat chat-end text-center">
            <div className="chat-bubble mx-auto shadow bg-blue-600 text-white">
              <p>잘 지내고 있어?</p>
            </div>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement>
        <div className="space-y-5 text-center">
          <h2 className="sm:text-3xl text-xl font-bold">덕담에선</h2>
          <div className="text-neutral-600 dark:text-neutral-400 sm:text-base text-sm">
            <p>간단하게 안부인사를 보내고 받을 수 있어요.</p>
            <p>
              작은 마음이 모여 큰 행복이 되는 경험, 지금 바로 시작해 보세요.
            </p>
          </div>
          <DeokdamFormWithShareModal />
        </div>
      </AnimatedElement>
    </div>
  );
}
