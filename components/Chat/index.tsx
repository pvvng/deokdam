"use client";

import { TypingText } from "@pvvng/react-typing-text";

interface ChatProps {
  type: "start" | "end";
  text: string;
  interval: number;
}
export default function Chat({ type, text, interval }: ChatProps) {
  return (
    <div
      className={`chat ${
        type === "start" ? "chat-start" : "chat-end"
      } text-center`}
    >
      <div
        className={`chat-bubble mx-auto shadow ${
          type === "start" ? "" : "bg-blue-600 text-white"
        }`}
      >
        <TypingText text={text} interval={interval} autoScroll={false} />
      </div>
    </div>
  );
}
