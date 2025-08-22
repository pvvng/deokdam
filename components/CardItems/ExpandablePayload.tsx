"use client";

import { useState } from "react";

interface ExpandablePayloadProps {
  canShow?: boolean;
  payload: string;
}

export default function ExpandablePayload({
  canShow = false,
  payload,
}: ExpandablePayloadProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`break-words whitespace-pre-wrap transition-all ${
          expanded ? "" : "line-clamp-3"
        } ${canShow ? "" : "blur-xs"}`}
      >
        {canShow ? payload : "아직 열람이 불가능한 덕담입니다."}
      </p>
      {payload.length > 100 && ( // 일정 글자 이상일 때만 버튼 표시
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // Link 이동 방지
            setExpanded((prev) => !prev);
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}
