interface PaintedFlowerProps {
  colors: string[]   // [꽃잎, 꽃중심, 줄기, 잎]
  size?: number
  outlineOnly?: boolean
}

const DEFAULT = ['#e5e7eb', '#e5e7eb', '#e5e7eb', '#e5e7eb']

/** 색칠용/표시용 식물 윤곽 — 4개 영역 (꽃잎·중심·줄기·잎) */
export function PaintedFlower({ colors, size = 120, outlineOnly = false }: PaintedFlowerProps) {
  const c = outlineOnly ? DEFAULT : colors
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* 줄기 (idx 2) */}
      <path d="M60 110 Q58 80 60 54" stroke={c[2]} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* 잎 (idx 3) */}
      <path d="M60 84 Q44 78 38 88 Q50 92 60 88 Z" fill={c[3]} stroke="#9ca3af" strokeWidth="1" />
      {/* 꽃잎 (idx 0) */}
      {[0, 60, 120, 180, 240, 300].map(d => (
        <ellipse key={d} cx="60" cy="30" rx="9" ry="16" fill={c[0]} stroke="#9ca3af" strokeWidth="1" transform={`rotate(${d} 60 48)`} />
      ))}
      {/* 중심 (idx 1) */}
      <circle cx="60" cy="48" r="9" fill={c[1]} stroke="#9ca3af" strokeWidth="1" />
    </svg>
  )
}
