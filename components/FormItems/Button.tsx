"use client";

import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  isFormValid?: boolean;
  text: string;
}

export default function Button({ isFormValid = true, text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full h-10 bg-blue-600 hover:bg-blue-500 active:scale-95 
      transition font-semibold text-white rounded-full shadow focus:outline-none 
      focus:ring-4 focus:ring-gray-300 focus:ring-offset-0
      flex justify-center items-center gap-2 cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
      disabled={!isFormValid || pending}
    >
      <FontAwesomeIcon
        icon={pending ? faSpinner : faPaperPlane}
        className={`${pending ? "animate-spin" : ""}`}
      />
      <span>{text}</span>
    </button>
  );
}
