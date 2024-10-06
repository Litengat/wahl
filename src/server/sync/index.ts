export function undefinedDate(date: string | undefined): Date | undefined {
  return date ? new Date(date) : undefined;
}
