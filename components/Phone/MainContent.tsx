"use client";

export default function PhoneContent() {
  return (
    <div className="relative w-full h-full bg-blue-200 py-8 px-5 space-y-3">
      <div className="chat chat-end">
        <div className="chat-bubble bg-blue-600 text-white shadow sm:text-base text-sm">
          <p>다음에 밥 한 번 먹자!</p>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble bg-neutral-50 text-black shadow sm:text-base text-sm">
          <p>응 시간 될 때 말해줘.</p>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble bg-blue-600 text-white shadow sm:text-base text-sm">
          <p>응 연락할게~</p>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center">
        <hr className="w-full border-neutral-400 h-[2px]" />
        <span className="bg-neutral-400 text-xs w-fit py-0.5 px-2 rounded-full text-white mx-auto">
          1년전
        </span>
        <hr className="w-full border-neutral-400 h-[2px]" />
      </div>

      <div className="w-full absolute left-0 bottom-0 p-3 pb-5 bg-neutral-50 flex gap-3 items-center">
        <div className="shrink-0 font-black size-6 rounded-full bg-neutral-300">
          +
        </div>
        <div className="w-full h-6 bg-neutral-300 rounded-2xl" />
        <div className="shrink-0 font-black size-6 rounded-full bg-neutral-300">
          #
        </div>
      </div>
    </div>
  );
}
