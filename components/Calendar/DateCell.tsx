import { DatesType } from "./types";

interface DateCellProps {
  day: number;
  type: DatesType;
  isSelected: boolean;
  isToday: boolean;
  onSelect: () => void;
}

export default function DateCell({
  day,
  type,
  isSelected,
  isToday,
  onSelect,
}: DateCellProps) {
  return (
    <div
      className={`
        text-sm aspect-square p-1 rounded cursor-pointer flex justify-center items-center 
        hover:bg-blue-300 transition
        ${type !== "current" ? "text-gray-400" : ""}
        ${isToday ? "text-blue-600" : ""}
        ${isSelected ? "bg-blue-600 text-white ring-3 ring-neutral-200" : ""}
      `}
      onClick={onSelect}
    >
      {day}
    </div>
  );
}
