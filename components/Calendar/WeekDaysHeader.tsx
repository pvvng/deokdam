export default function WeekDaysHeader() {
  return (
    <div className="grid grid-cols-7 text-sm text-center">
      {weekdays.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}

const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;
