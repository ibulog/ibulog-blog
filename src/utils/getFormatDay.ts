export function getFormatDay(date: Date) {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
}

export function getFormatMonthYear(date: Date) {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
  }).replace(/\//g, '-');
}
