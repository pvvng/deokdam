"use client";

import MonthNavigator from "./MonthNavigator";
import DateGrid from "./DateGrid";
import WeekDaysHeader from "./WeekDaysHeader";
import { useState } from "react";

interface CalendarProps {
  onSelect?: (date: Date) => void;
}

export default function Calendar({ onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  return (
    <div
      className="w-65 rounded-2xl shadow border border-neutral-100 overflow-hidden
      bg-white/80 backdrop-blur"
    >
      <MonthNavigator
        year={year}
        month={month}
        handleCurrentMonth={(date) => setCurrentMonth(date)}
      />
      <div className="p-4 space-y-4 text-xs">
        <WeekDaysHeader />
        <DateGrid year={year} month={month} onSelect={onSelect} />
      </div>
    </div>
  );
}
