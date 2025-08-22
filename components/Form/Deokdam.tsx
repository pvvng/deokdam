"use client";

import DatePicker from "../DatePicker";
import { startTransition, useActionState, useEffect, useState } from "react";
import { postDeokdam } from "@/lib/actions";
import { Button, CapsuleSelector, Input, TextArea } from "../FormItems";

interface DeokDamFormProps {
  onActionEnd?: ({ id, token }: { id: string; token: string }) => void;
}

export default function DeokDamForm({ onActionEnd }: DeokDamFormProps) {
  const [state, action] = useActionState(postDeokdam, null);
  const [openAtOption, setOpenAtOption] = useState<string | null>("chuseok");
  const [customOpenAt, setCustomOpenAt] = useState<Date | null>(null);
  const [payload, setPayload] = useState("");
  const [nickname, setNickname] = useState("");

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

    startTransition(() => {
      action(formdata);
    });
  };

  useEffect(() => {
    // 초기화
    const initState = () => {
      setOpenAtOption("chuseok");
      setCustomOpenAt(null);
      setPayload("");
      setNickname("");
    };

    if (state && state.success) {
      const { id, token } = state.data;
      initState();
      onActionEnd?.({ id, token });
    }
  }, [state?.data?.id]);

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <div className="text-start">
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
      </div>

      <Input
        name="nickname"
        placeholder="덕담을 보낼 사람에게 보여질 별명을 입력하세요."
        minLength={0}
        maxLength={10}
        required
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        errors={state?.error?.nickname}
      />

      <TextArea
        name="deokdam"
        placeholder="덕담을 입력하세요"
        required
        minLength={0}
        maxLength={3000}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
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
