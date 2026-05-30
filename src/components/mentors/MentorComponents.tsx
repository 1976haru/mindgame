import { motion } from 'framer-motion'

export type MentorExpression = 'normal' | 'cheer' | 'praise'
interface MentorProps {
  size?: number
  expression?: MentorExpression
}

function Mouth({ expression, y = 64 }: { expression: MentorExpression; y?: number }) {
  if (expression === 'praise') return <path d={`M44 ${y} Q60 ${y + 12} 76 ${y}`} stroke="#7c2d12" strokeWidth="2.4" fill="none" strokeLinecap="round" />
  if (expression === 'cheer') return <ellipse cx="60" cy={y + 2} rx="6" ry="5" fill="#7c2d12" />
  return <path d={`M52 ${y} Q60 ${y + 5} 68 ${y}`} stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
}

function Eyes({ cheer }: { cheer?: boolean }) {
  return (
    <>
      <circle cx="49" cy="52" r="4" fill="#2d2d2d" /><circle cx="71" cy="52" r="4" fill="#2d2d2d" />
      <circle cx="50.5" cy="50.5" r="1.3" fill="#fff" /><circle cx="72.5" cy="50.5" r="1.3" fill="#fff" />
      {cheer && <><path d="M44 46 Q49 43 54 46" stroke="#2d2d2d" strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M66 46 Q71 43 76 46" stroke="#2d2d2d" strokeWidth="1.5" fill="none" strokeLinecap="round" /></>}
    </>
  )
}

const wrap = (children: React.ReactNode, size: number, expression: MentorExpression) => (
  <motion.svg width={size} height={size} viewBox="0 0 120 120"
    animate={expression === 'cheer' ? { y: [0, -6, 0] } : { y: [0, -3, 0] }}
    transition={{ duration: expression === 'cheer' ? 1 : 3, repeat: Infinity, ease: 'easeInOut' }}>
    {/* 등장 빛 입자 */}
    {[[20, 28], [98, 34], [100, 90], [18, 86]].map(([x, y], i) => (
      <motion.text key={i} x={x} y={y} fontSize="11" animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.4] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}>✨</motion.text>
    ))}
    {children}
  </motion.svg>
)

/* 🎵 모차르트 다람쥐 */
export function MozartSquirrel({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <path d="M88 86 Q112 74 102 44 Q96 58 84 66 Q92 80 76 82 Z" fill="#c87f3e" />
    <ellipse cx="58" cy="86" rx="24" ry="22" fill="#d2914f" /><ellipse cx="58" cy="92" rx="14" ry="13" fill="#f0d9b5" />
    <circle cx="60" cy="52" r="24" fill="#d2914f" />
    <ellipse cx="44" cy="30" rx="7" ry="10" fill="#c87f3e" /><ellipse cx="76" cy="30" rx="7" ry="10" fill="#c87f3e" />
    {/* 가발 */}
    <path d="M36 40 Q36 20 60 20 Q84 20 84 40 Q78 34 60 34 Q42 34 36 40" fill="#f5f5f5" />
    <circle cx="38" cy="44" r="7" fill="#f5f5f5" /><circle cx="82" cy="44" r="7" fill="#f5f5f5" />
    {/* 음표 안경 */}
    <circle cx="49" cy="52" r="8" fill="none" stroke="#7c2d12" strokeWidth="1.5" /><circle cx="71" cy="52" r="8" fill="none" stroke="#7c2d12" strokeWidth="1.5" /><line x1="57" y1="52" x2="63" y2="52" stroke="#7c2d12" strokeWidth="1.5" />
    <Eyes cheer={expression === 'cheer'} />
    <ellipse cx="60" cy="58" rx="3" ry="2" fill="#7c2d12" />
    <Mouth expression={expression} />
    <motion.text x="92" y="40" fontSize="14" animate={{ y: [40, 30, 40], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>🎵</motion.text>
  </>, size, expression)
}

/* 🏃 번개 토끼 */
export function LightningRabbit({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <motion.path d="M84 84 L100 72 L92 86 L104 92 L86 92 Z" fill="#fbbf24" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity }} />
    <ellipse cx="56" cy="86" rx="22" ry="20" fill="#fde047" />
    <ellipse cx="46" cy="28" rx="6" ry="20" fill="#fde047" /><ellipse cx="46" cy="28" rx="3" ry="15" fill="#fca5a5" />
    <ellipse cx="66" cy="26" rx="6" ry="20" fill="#fde047" transform="rotate(12 66 26)" /><ellipse cx="66" cy="26" rx="3" ry="15" fill="#fca5a5" transform="rotate(12 66 26)" />
    <circle cx="58" cy="54" r="24" fill="#fef08a" />
    {/* 머리띠 */}
    <rect x="34" y="42" width="48" height="7" rx="3" fill="#ef4444" /><path d="M82 45 l8 -3 l-2 6 Z" fill="#ef4444" />
    <Eyes cheer={expression === 'cheer'} />
    <ellipse cx="58" cy="60" rx="3" ry="2" fill="#f97316" />
    <Mouth expression={expression} y={66} />
    <text x="92" y="44" fontSize="13">⚡</text>
  </>, size, expression)
}

/* 💃 백조 공주 */
export function SwanPrincess({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <ellipse cx="58" cy="88" rx="24" ry="18" fill="#fdf2f8" />
    <path d="M46 86 Q40 60 56 50 Q66 48 64 60 Q58 66 56 80 Z" fill="#fdf2f8" />
    <ellipse cx="56" cy="48" rx="13" ry="11" fill="#fdf2f8" />
    {/* 부리 */}
    <path d="M44 48 L34 50 L44 53 Z" fill="#f59e0b" />
    {/* 왕관 */}
    <path d="M48 34 L51 26 L56 32 L61 24 L64 34 Z" fill="#ffd84d" stroke="#f59e0b" strokeWidth="1" /><circle cx="56" cy="26" r="1.6" fill="#ef4444" />
    <circle cx="52" cy="48" r="3" fill="#2d2d2d" /><circle cx="53" cy="47" r="1" fill="#fff" />
    {expression === 'praise' && <path d="M58 56 Q62 60 66 56" stroke="#b45c4a" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
    {/* 토슈즈 */}
    <ellipse cx="48" cy="106" rx="7" ry="4" fill="#f9a8d4" /><ellipse cx="68" cy="106" rx="7" ry="4" fill="#f9a8d4" />
    <motion.text x="86" y="44" fontSize="13" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ transformOrigin: '90px 44px' }}>🩰</motion.text>
  </>, size, expression)
}

/* 📚 시간 부엉이 */
export function TimeOwl({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <path d="M40 30 L44 18 L50 30 Z" fill="#7c5c3a" /><path d="M80 30 L76 18 L70 30 Z" fill="#7c5c3a" />
    <ellipse cx="60" cy="58" rx="30" ry="32" fill="#a17a4f" /><ellipse cx="60" cy="64" rx="19" ry="22" fill="#d4b58a" />
    <circle cx="49" cy="52" r="11" fill="#fff" /><circle cx="71" cy="52" r="11" fill="#fff" />
    <circle cx="49" cy="52" r="5" fill="#2d2d2d" /><circle cx="71" cy="52" r="5" fill="#2d2d2d" />
    <circle cx="51" cy="50" r="1.6" fill="#fff" /><circle cx="73" cy="50" r="1.6" fill="#fff" />
    <path d="M60 58 L55 64 L65 64 Z" fill="#f59e0b" />
    {/* 모래시계 목걸이 */}
    <path d="M54 84 h12 l-6 7 Z M54 98 h12 l-6 -7 Z" fill="#a5f3fc" stroke="#0e7490" strokeWidth="1" />
    <motion.text x="88" y="40" fontSize="13" animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '92px 36px' }}>⏳</motion.text>
  </>, size, expression)
}

/* 🇰🇷 세종 거북이 */
export function SejongTurtle({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <ellipse cx="60" cy="74" rx="32" ry="24" fill="#4d7c0f" /><ellipse cx="60" cy="72" rx="25" ry="18" fill="#65a30d" />
    {[[60, 64], [46, 72], [74, 72], [60, 80]].map(([x, y], i) => <path key={i} d={`M${x - 6} ${y} l6 -5 l6 5 l-3 7 l-6 0 Z`} fill="#84cc16" stroke="#3f6212" strokeWidth="0.6" />)}
    <circle cx="36" cy="54" r="13" fill="#84cc16" />
    {/* 학자 모자(정자관 느낌) */}
    <path d="M26 46 h20 v-6 h-20 Z M30 40 h12 v-5 h-12 Z" fill="#1f2937" />
    <circle cx="32" cy="54" r="2.5" fill="#2d2d2d" />
    {expression !== 'normal' && <path d="M28 60 Q34 64 40 60" stroke="#3f6212" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
    {/* 붓 */}
    <line x1="84" y1="44" x2="96" y2="32" stroke="#a16207" strokeWidth="3" strokeLinecap="round" /><path d="M96 32 l4 -4 l-1 6 Z" fill="#1f2937" />
    <text x="86" y="92" fontSize="12">한</text>
  </>, size, expression)
}

/* 🌍 호기심 여우 */
export function CuriousFox({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <path d="M84 86 Q104 80 98 58 Q94 66 84 70 Z" fill="#ea580c" /><path d="M96 60 Q100 56 98 52 Q92 58 90 64 Z" fill="#fff" />
    <ellipse cx="56" cy="84" rx="20" ry="20" fill="#ea580c" />
    <path d="M38 34 L46 50 L34 52 Z" fill="#ea580c" /><path d="M74 34 L66 50 L78 52 Z" fill="#ea580c" />
    <ellipse cx="56" cy="54" rx="22" ry="19" fill="#fb923c" />
    <path d="M56 52 Q42 58 44 70 Q56 74 56 68 Q56 74 68 70 Q70 58 56 52" fill="#fff" />
    <circle cx="49" cy="52" r="3.5" fill="#2d2d2d" /><circle cx="63" cy="52" r="3.5" fill="#2d2d2d" />
    <path d="M56 60 L52 65 L60 65 Z" fill="#2d2d2d" />
    {expression === 'praise' && <path d="M50 70 Q56 74 62 70" stroke="#7c2d12" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
    {/* 돋보기 */}
    <circle cx="84" cy="64" r="9" fill="none" stroke="#7c2d12" strokeWidth="2.5" /><circle cx="84" cy="64" r="6" fill="#a5f3fc" opacity="0.5" /><line x1="91" y1="71" x2="98" y2="80" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" />
  </>, size, expression)
}

/* 🧮 숫자 곰돌이 */
export function NumberBear({ size = 120, expression = 'normal' }: MentorProps) {
  return wrap(<>
    <circle cx="34" cy="30" r="10" fill="#a16207" /><circle cx="86" cy="30" r="10" fill="#a16207" />
    <circle cx="34" cy="30" r="5" fill="#d6a96a" /><circle cx="86" cy="30" r="5" fill="#d6a96a" />
    <ellipse cx="60" cy="84" rx="26" ry="22" fill="#b45309" />
    {/* 숫자 셔츠 */}
    <ellipse cx="60" cy="88" rx="17" ry="15" fill="#fde68a" />
    <text x="60" y="94" fontSize="14" textAnchor="middle" fill="#a16207" fontWeight="bold">123</text>
    <circle cx="60" cy="52" r="26" fill="#c87f3e" /><ellipse cx="60" cy="60" rx="13" ry="10" fill="#e7c89a" />
    {/* 안경 */}
    <circle cx="49" cy="52" r="9" fill="none" stroke="#1f2937" strokeWidth="2" /><circle cx="71" cy="52" r="9" fill="none" stroke="#1f2937" strokeWidth="2" /><line x1="58" y1="52" x2="62" y2="52" stroke="#1f2937" strokeWidth="2" />
    <circle cx="49" cy="52" r="3.5" fill="#2d2d2d" /><circle cx="71" cy="52" r="3.5" fill="#2d2d2d" />
    <ellipse cx="60" cy="60" rx="4" ry="3" fill="#3a2e2e" />
    <Mouth expression={expression} y={66} />
  </>, size, expression)
}

export const MENTOR_COMPONENTS: Record<string, React.FC<MentorProps>> = {
  mozart_squirrel: MozartSquirrel,
  lightning_rabbit: LightningRabbit,
  swan_princess: SwanPrincess,
  time_owl: TimeOwl,
  sejong_turtle: SejongTurtle,
  curious_fox: CuriousFox,
  number_bear: NumberBear
}

export function MentorAvatar({ mentorId, size = 120, expression = 'normal' }: { mentorId: string; size?: number; expression?: MentorExpression }) {
  const Comp = MENTOR_COMPONENTS[mentorId]
  return Comp ? <Comp size={size} expression={expression} /> : null
}
