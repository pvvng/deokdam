"use client";

import { useState } from "react";
import Calendar from "react-calendar";

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <Calendar
        onChange={(val) => {
          if (Array.isArray(val)) {
            setValue(val[0] ?? null);
          } else {
            setValue(val);
          }
        }}
        value={value}
        className="w-full border rounded-lg overflow-hidden text-sm
                   [&_.react-calendar__month-view__days__day]:p-2
                   [&_.react-calendar__tile]:text-center
                   [&_.react-calendar__tile--now]:bg-blue-600 [&_.react-calendar__tile--now]:text-white [&_.react-calendar__tile--now]:rounded-full"
      />
      {value && (
        <div className="mt-2 text-center text-gray-700">
          선택한 날짜: {value.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
