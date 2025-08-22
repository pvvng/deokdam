"use client";

import { TypingText } from "@pvvng/react-typing-text";

interface ChatProps {
  type: "start" | "end";
  text: string;
  interval: number;
  onTypingEnd?: () => void;
}

export default function Chat({ type, text, interval, onTypingEnd }: ChatProps) {
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
        <TypingText
          text={text}
          interval={interval}
          autoScroll={false}
          onTypingEnd={onTypingEnd}
        />
      </div>
    </div>
  );
}
