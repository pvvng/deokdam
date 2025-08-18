"use client";

import Button from "./Button";
import TextArea from "./TextArea";
import CapsuleSelector from "./CapsuleSelector";
import DatePicker from "../DatePicker";
import { startTransition, useActionState, useState } from "react";
import { postMessage } from "@/app/(main)/actions";

export default function DeokDamForm() {
  const [state, action] = useActionState(postMessage, null);
  const [openAtOption, setOpenAtOption] = useState<string | null>("chuseok");
  const [customOpenAt, setCustomOpenAt] = useState<Date | null>(null);
  const [publicOption, setPublicOption] = useState("0");

  const handleOpenAtOptionChange = (option: string) => {
    setCustomOpenAt(null); // 커스텀 날짜 초기화
    setOpenAtOption(option); // 날짜 변경
  };

  const handleCustomOpenAtChange = (date: Date) => {
    setOpenAtOption(null); // 기존 날짜 초기화
    setCustomOpenAt(date); // 커스텀 날짜 설정
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const openAt =
      openAtOption ?? customOpenAt?.toLocaleDateString("ko-KR") ?? "";

    formdata.append("openAt", openAt);
    formdata.append("isPublic", publicOption);

    startTransition(() => {
      action(formdata);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <section className="space-y-3 text-start border border-neutral-100 rounded-2xl p-5 shadow">
        <CapsuleSelector
          label="덕담 개봉 가능일"
          options={openAtOptions}
          value={openAtOption}
          onChange={handleOpenAtOptionChange}
          renderSelector={
            <DatePicker
              value={customOpenAt}
              onChange={handleCustomOpenAtChange}
            />
          }
          errors={state?.error?.openAt}
        />
      </section>

      <section className="space-y-3 text-start border border-neutral-100 rounded-2xl p-5 shadow">
        <CapsuleSelector
          label="덕담 공개 여부"
          options={publicOptions}
          value={publicOption}
          onChange={(option: string) => setPublicOption(option)}
          errors={state?.error?.isPublic}
        />
      </section>

      <TextArea
        name="deokdam"
        placeholder="덕담을 입력해보세요!"
        required
        minLength={0}
        maxLength={3000}
        errors={state?.error?.deokdam}
      />
      <Button text="덕담 보내기" />
    </form>
  );
}

const openAtOptions = [
  { value: "chuseok", label: "추석 당일" },
  { value: "0day", label: "당장" },
  { value: "1day", label: "내일" },
  { value: "3day", label: "3일 후" },
  { value: "7day", label: "일주일 후" },
];

const publicOptions = [
  { value: "0", label: "비공개" },
  { value: "1", label: "공개" },
];
