"use client";

import DateCell from "./DateCell";
import { Dates } from "./types";
import { generateCalendarDates } from "@/utils";
import { useState } from "react";

interface DateGridProps {
  year: number;
  month: number;
  onSelect?: (date: Date) => void;
}

export default function DateGrid({ year, month, onSelect }: DateGridProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  return (
    <div className="grid grid-cols-7 text-center gap-1">
      {dates.map(({ date, type }, idx) => (
        <DateCell
          key={idx}
          day={date.getDate()}
          type={type}
          isSelected={selectedDate?.toDateString() === date.toDateString()}
          isToday={date.toDateString() === new Date().toDateString()}
          onSelect={() => {
            onSelect?.(date);
            setSelectedDate(date);
          }}
        />
      ))}
    </div>
  );
}
