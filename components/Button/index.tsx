"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ text }: { text: string }) {
  return (
    <button
      className="w-full h-10 bg-blue-600 hover:bg-blue-500 active:scale-95 
      transition font-semibold text-white rounded-full shadow
      flex justify-center items-center gap-2 cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
    >
      <FontAwesomeIcon icon={faPaperPlane} />
      <span>{text}</span>
    </button>
  );
}
