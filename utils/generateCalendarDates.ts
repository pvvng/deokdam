export function generateCalendarDates(year: number, month: number) {
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
