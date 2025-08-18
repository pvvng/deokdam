"use client";

import DateCell from "./DateCell";
import { Dates } from "./types";
import { generateCalendarDates } from "@/utils";

interface DateGridProps {
  year: number;
  month: number;
  selectedDate: Date | null;
  onSelect?: (date: Date) => void;
}

export default function DateGrid({
  year,
  month,
  selectedDate,
  onSelect,
}: DateGridProps) {
  const { prevMonthDates, currentMonthDates, nextMonthDates } =
    generateCalendarDates(year, month);

  const dates: Dates[] = [
    ...prevMonthDates.map((d) => ({
      date: new Date(year, month - 1, d),
      type: "prev" as const,
    })),
    ...currentMonthDates.map((d) => ({
      date: new Date(year, month, d),
      type: "current" as const,
    })),
    ...nextMonthDates.map((d) => ({
      date: new Date(year, month + 1, d),
      type: "next" as const,
    })),
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 00:00로 초기화

  return (
    <div className="grid grid-cols-7 text-center gap-1">
      {dates.map(({ date, type }, idx) => (
        <DateCell
          key={idx}
          day={date.getDate()}
          type={type}
          isSelected={selectedDate?.toDateString() === date.toDateString()}
          isToday={date.toDateString() === new Date().toDateString()}
          disabled={date < today}
          onSelect={() => {
            if (date >= today) {
              onSelect?.(date);
            }
          }}
        />
      ))}
    </div>
  );
}
