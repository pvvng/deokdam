"use client";

import Button from "./Button";
import TextArea from "./TextArea";
import CapsuleSelector from "./CapsuleSelector";
import { useActionState, useState } from "react";
import DatePicker from "./DatePicker";

export default function DeokDamForm() {
  // const [state, action] = useActionState(postMessage, null);
  const [openAtOption, setOpenAtOption] = useState("chuseok");
  const [publicOption, setPublicOption] = useState("0");

  const handleOpenAtOptionChange = (option: string) => {
    setOpenAtOption(option);
  };

  const handlePublicOptionChange = (option: string) => {
    setPublicOption(option);
  };

  return (
    <form className="space-y-5">
      <section className="space-y-3 text-start border border-neutral-100 rounded-2xl p-5 shadow">
        <CapsuleSelector
          label="덕담 개봉 가능일"
          options={openAtOptions}
          defaultValue="chuseok"
          onChange={handleOpenAtOptionChange}
        />
        {openAtOption === "custom" && <></>}
      </section>

      <section className="space-y-3 text-start border border-neutral-100 rounded-2xl p-5 shadow">
        <CapsuleSelector
          label="덕담 공개 여부"
          options={publicOptions}
          defaultValue="0"
          onChange={handlePublicOptionChange}
        />
      </section>

      <TextArea name="deokdam" placeholder="덕담을 입력해보세요!" required />
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
  { value: "custom", label: "직접 선택" },
];

const publicOptions = [
  { value: "0", label: "비공개" },
  { value: "1", label: "공개" },
];
