export function isDeokdamOpen(openAt: Date): boolean {
  return new Date().getTime() >= openAt.getTime();
}
