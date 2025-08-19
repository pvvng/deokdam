"use client";

import TextArea from "../FormItems/TextArea";
import Button from "../FormItems/Button";
import CapsuleSelector from "../FormItems/CapsuleSelector";
import DatePicker from "../DatePicker";
import { startTransition, useActionState, useEffect, useState } from "react";
import { postDeokdam } from "@/lib/postDeokdam";

interface DeokDamFormProps {
  onActionEnd?: ({
    id,
    isPublic,
    token,
  }: {
    id: string;
    isPublic: boolean;
    token: string | null;
  }) => void;
}

export default function DeokDamForm({ onActionEnd }: DeokDamFormProps) {
  const [state, action] = useActionState(postDeokdam, null);
  const [openAtOption, setOpenAtOption] = useState<string | null>("chuseok");
  const [customOpenAt, setCustomOpenAt] = useState<Date | null>(null);
  const [publicOption, setPublicOption] = useState("0");
  const [payload, setPayload] = useState("");

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

  useEffect(() => {
    const initState = () => {
      setOpenAtOption("chuseok");
      setCustomOpenAt(null);
      setPublicOption("0");
      setPayload("");
    };

    if (state && state.success) {
      const { id, isPublic, accessToken: token } = state.data;
      initState();
      onActionEnd?.({ id, isPublic, token });
    }
  }, [state?.data?.id]);

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

const publicOptions = [
  { value: "0", label: "비공개" },
  { value: "1", label: "공개" },
];
