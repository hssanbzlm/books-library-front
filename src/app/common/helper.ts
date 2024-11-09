export function parseDate(dateStr: any) {
  const [day, month, year] = dateStr.split('-').map(Number);
  if (day && month && year) return new Date(year, month - 1, day); // Month is 0-indexed
  return null;
}
export function compare(a: any, b: any, isAsc: boolean) {
  const parseA = parseDate(a) ?? a;
  const parseB = parseDate(b) ?? b;
  return parseA < parseB ? -1 : 1 * (isAsc ? 1 : -1);
}
