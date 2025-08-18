export function parseOpenAt(value: string): Date {
  const getKSTMidnight = (offsetDays = 0) => {
    const now = new Date();
    now.setDate(now.getDate() + offsetDays);

    // 한국 시간 기준 00:00
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // UTC로 변환
    return new Date(Date.UTC(year, month, day, -9, 0, 0));
  };

  const openAtOptionsMap: Record<string, () => Date> = {
    chuseok: () => new Date(Date.UTC(2025, 9, 6, 0, 0, 0)), // 10월 = month 9
    "0day": () => getKSTMidnight(0),
    "1day": () => getKSTMidnight(1),
    "3day": () => getKSTMidnight(3),
    "7day": () => getKSTMidnight(7),
  };

  if (value in openAtOptionsMap) {
    return openAtOptionsMap[value]();
  }

  // "YYYY. M. D." 형식 처리
  const match = value.match(/^(\d{4})\.\s(\d{1,2})\.\s(\d{1,2})\.$/);
  if (match) {
    const [_, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  throw new Error(`허용되지 않은 개봉 가능일 값입니다: ${value}`);
}
