export function getPreviousDate(daysInNumber) {
  const now = new Date();

  const prevDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(daysInNumber));
  return prevDate.toISOString().split('T')[0]
}
