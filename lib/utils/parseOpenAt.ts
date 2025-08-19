export function parseOpenAt(value: string): Date {
  const getKSTMidnightUTC = (offsetDays = 0) => {
    const now = new Date();
    now.setDate(now.getDate() + offsetDays);

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // 한국시 00:00 → UTC로 변환: 9시간 빼기
    return new Date(Date.UTC(year, month, day, 0, 0, 0) - 9 * 60 * 60 * 1000);
  };

  const openAtOptionsMap: Record<string, () => Date> = {
    chuseok: () => new Date(Date.UTC(2025, 9, 6, 0, 0, 0) - 9 * 60 * 60 * 1000), // UTC 15:00 → KST 00:00
    "0day": () => getKSTMidnightUTC(0),
    "1day": () => getKSTMidnightUTC(1),
    "3day": () => getKSTMidnightUTC(3),
    "7day": () => getKSTMidnightUTC(7),
  };

  if (value in openAtOptionsMap) {
    return openAtOptionsMap[value]();
  }

  // "YYYY. M. D." 형식 처리
  const match = value.match(/^(\d{4})\.\s(\d{1,2})\.\s(\d{1,2})\.$/);
  if (match) {
    const [_, year, month, day] = match;
    return new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0) -
        9 * 60 * 60 * 1000
    );
  }

  throw new Error(`허용되지 않은 개봉 가능일 값입니다: ${value}`);
}
