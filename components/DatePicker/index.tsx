"use client";

import { useState } from "react";
import Calendar from "./Calendar";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="px-4 py-1 rounded-full bg-neutral-100 text-gray-800 shadow text-sm cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? value.toLocaleDateString() : "날짜 선택"}
      </button>

      {open && (
        <div className="absolute right-1/2 translate-x-1/2 mt-2 z-50">
          <Calendar
          // Calendar에서 날짜를 고르면 버튼 값 갱신
          // onSelect={(date: Date) => {
          //   onChange(date);
          //   setOpen(false);
          // }}
          />
        </div>
      )}
    </div>
  );
}
