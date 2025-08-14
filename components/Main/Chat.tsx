"use client";

import { TypingText } from "@pvvng/react-typing-text";

export default function Chat() {
  return (
    <div className="chat chat-end text-center">
      <div className="chat-bubble mx-auto shadow bg-blue-600 text-white">
        <TypingText interval={100} text="잘 지내고 있어?" autoScroll={false} />
      </div>
    </div>
  );
}
