// 밤 시간 판별 (저녁 8시 ~ 새벽 6시)
export function isNightTime(): boolean {
  const hour = new Date().getHours()
  return hour >= 20 || hour < 6
}

// 두 날짜 문자열(YYYY-MM-DD) 사이의 일수 차이
export function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

// 오늘이 생일(MM-DD)인지
export function isBirthdayToday(birthday?: string): boolean {
  if (!birthday) return false
  const d = new Date()
  const mmdd = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return birthday === mmdd
}
