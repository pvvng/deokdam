"use client";

import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MonthNavigatorProps {
  year: number;
  month: number;
  handleCurrentMonth: (date: Date) => void;
}

export default function MonthNavigator({
  year,
  month,
  handleCurrentMonth,
}: MonthNavigatorProps) {
  return (
    <div className="flex justify-between items-center px-5 pt-4 pb-2 text-xs">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => handleCurrentMonth(new Date(year - 1, month, 1))}
          className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button
          type="button"
          onClick={() => handleCurrentMonth(new Date(year, month - 1, 1))}
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
          onClick={() => handleCurrentMonth(new Date(year, month + 1, 1))}
          className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          type="button"
          onClick={() => handleCurrentMonth(new Date(year + 1, month, 1))}
          className="size-6 flex justify-center items-center cursor-pointer p-1 
          hover:bg-blue-600 hover:text-white transition rounded-full"
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </div>
  );
}
