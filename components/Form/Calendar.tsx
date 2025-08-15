"use client";

import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function generateCalendarDates(year: number, month: number) {
  const firstDay = new Date(year, month, 1); // 이번 달 1일
  const lastDay = new Date(year, month + 1, 0); // 이번 달 마지막 날

  const startDayOfWeek = firstDay.getDay(); // 0=일, 1=월...
  const daysInMonth = lastDay.getDate();

  // 지난달 날짜 채우기
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthDates = Array.from(
    { length: startDayOfWeek },
    (_, i) => prevMonthLastDay - startDayOfWeek + i + 1
  );

  // 이번 달 날짜
  const currentMonthDates = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  // 다음 달 날짜 채우기
  const nextMonthDates = Array.from(
    { length: 42 - (prevMonthDates.length + currentMonthDates.length) },
    (_, i) => i + 1
  );

  return {
    prevMonthDates,
    currentMonthDates,
    nextMonthDates,
  };
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const { prevMonthDates, currentMonthDates, nextMonthDates } =
    generateCalendarDates(year, month);

  const dates = [
    ...prevMonthDates.map((d) => ({
      date: new Date(year, month - 1, d),
      type: "prev",
    })),
    ...currentMonthDates.map((d) => ({
      date: new Date(year, month, d),
      type: "current",
    })),
    ...nextMonthDates.map((d) => ({
      date: new Date(year, month + 1, d),
      type: "next",
    })),
  ];

  return (
    <div className="w-65 rounded-2xl shadow border border-neutral-100 overflow-hidden">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center px-5 pt-4 pb-2 text-xs">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year - 1, month, 1))}
            className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
        <p className="text-sm font-semibold">
          {year}년 {month + 1}월
        </p>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year + 1, month, 1))}
            className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 text-xs">
        {/* 요일 */}
        <div className="grid grid-cols-7 text-sm text-center">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-7 text-center gap-1">
          {dates.map(({ date, type }, idx) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();

            return (
              <div
                key={idx}
                className={`
                text-sm aspect-square p-1 rounded cursor-pointer flex justify-center items-center transition
                ${type !== "current" ? "text-gray-400" : ""}
                ${isToday ? "text-blue-600" : ""}
                ${
                  isSelected
                    ? "bg-blue-600 text-white ring-3 ring-neutral-200"
                    : ""
                }
              `}
                onClick={() => setSelectedDate(date)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
