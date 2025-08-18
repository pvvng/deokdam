"use client";

import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className={`px-4 py-1 rounded-full shadow text-sm cursor-pointer ${
          value !== null
            ? "bg-blue-600 text-white"
            : "bg-neutral-100 text-gray-800"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? value.toLocaleDateString() : "날짜 선택"}
      </button>

      {open && (
        <div className="absolute right-1/2 translate-x-1/2 mt-2 z-50">
          <Calendar
            value={value}
            onSelect={(date: Date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
