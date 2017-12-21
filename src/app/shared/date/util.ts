export function toLocal(utcDate: Date): Date {
  const localDateTime = new Date(utcDate);
  localDateTime.setUTCDate(utcDate.getDate());
  localDateTime.setUTCHours(utcDate.getHours());
  localDateTime.setUTCMinutes(utcDate.getMinutes());
  return localDateTime;
}
