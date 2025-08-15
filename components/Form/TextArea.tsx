"use client";

interface TextAreaProps {
  name: string;
  required: boolean;
  placeholder: string;
}

export default function TextArea({
  name,
  required,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full h-96 focus:outline-none border border-neutral-200 bg-neutral-200 rounded-2xl resize-none p-5 shadow"
      name={name}
      required={required}
      placeholder={placeholder}
    />
  );
}
