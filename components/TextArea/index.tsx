"use client";

export default function TextArea() {
  return (
    <textarea
      className="w-full h-96 focus:outline-none border border-neutral-200 bg-neutral-200 rounded-2xl resize-none p-5 shadow"
      placeholder="덕담을 입력해보세요!"
    />
  );
}
