// 간단한 UUID 생성 (외부 의존성 없이)
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function todayString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 0~1 범위의 안전한 정원 좌표 (가장자리 패딩)
export function randomGardenPosition(): { x: number; y: number } {
  return {
    x: 0.1 + Math.random() * 0.8,
    y: 0.35 + Math.random() * 0.5 // 위쪽은 하늘로 비워둠
  }
}
