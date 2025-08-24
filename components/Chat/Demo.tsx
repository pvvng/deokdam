"use client";

import { TypingText } from "@pvvng/react-typing-text";
import { useState } from "react";

export default function DemoChats() {
  const [isTypingEnd, setIsTypingEnd] = useState(false);

  return (
    <div className="absolute inset-3 z-5">
      <div className="chat chat-start">
        <div className="chat-bubble shadow text-sm sm:text-base bg-neutral-100 text-black">
          <TypingText
            text="풍성한 한가위 보내고, 맛있는 거 많이 먹어!"
            autoScroll={false}
            interval={40}
            onTypingEnd={() => setIsTypingEnd(true)}
          />
        </div>
      </div>
      {isTypingEnd && (
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-600 text-white shadow text-sm sm:text-base">
            <TypingText
              text="다들 건강하고 웃는 일만 가득하길!"
              autoScroll={false}
              startDelay={200}
              interval={40}
            />
          </div>
        </div>
      )}
    </div>
  );
}
