export function formatDateKorean(date: Date): string {
  const formatted = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const [year, month, day] = formatted.split(".").map((s) => s.trim());
  return `${year}년 ${month}월 ${day}일`;
}
