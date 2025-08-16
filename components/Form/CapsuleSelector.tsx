"use client";

import { useState } from "react";

interface CapsuleOption {
  label: string;
  value: string;
}

interface CapsuleSelectorProps {
  label: string;
  options: CapsuleOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  renderSelector?: React.ReactNode;
}

export default function CapsuleSelector({
  label,
  options,
  defaultValue,
  onChange,
  renderSelector,
}: CapsuleSelectorProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleClick = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="space-y-3">
      <p className="font-medium">{label}</p>
      <div className="flex gap-2 items-center flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleClick(opt.value)}
            className={`text-sm px-4 py-1 rounded-full transition shadow cursor-pointer
            ${
              selected === opt.value
                ? "bg-blue-600 text-white"
                : "bg-neutral-100 text-gray-800"
            }
          `}
          >
            {opt.label}
          </button>
        ))}
        {/* option 이외의 커스텀 셀렉터 렌더 */}
        {renderSelector}
      </div>
    </div>
  );
}
