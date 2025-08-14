"use client";

import Button from "../Button";
import TextArea from "../TextArea";

export default function DeokDamForm() {
  return (
    <form className="space-y-5">
      <div className="flex justify-center items-center">
        <div className="flex gap-2 items-center border border-neutral-300 shadow rounded-2xl overflow-hidden">
          <label className="text-sm bg-neutral-300 px-3 py-1">
            덕담 개봉 가능 날짜
          </label>
          <select
            name="openAt"
            className="text-sm focus:outline-none cursor-pointer px-3 py-1"
            defaultValue="chuseok"
          >
            <option value="chuseok">추석 당일</option>
            <option value="3days">3일 뒤</option>
            <option value="7days">1주일 뒤</option>
            <option value="custom">직접 지정</option>
          </select>
        </div>
      </div>
      <TextArea />
      <Button text="덕담 보내기" />
    </form>
  );
}
