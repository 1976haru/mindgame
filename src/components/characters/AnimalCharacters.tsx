import { motion } from 'framer-motion'

interface AnimalProps {
  size?: number
  mood?: 'normal' | 'sad' | 'happy'
}

// 공통 눈/입 (mood별)
function Face({ mood = 'normal' }: { mood?: AnimalProps['mood'] }) {
  return (
    <>
      <circle cx="40" cy="52" r="3.5" fill="#2d2d2d" />
      <circle cx="60" cy="52" r="3.5" fill="#2d2d2d" />
      <circle cx="41" cy="51" r="1" fill="#fff" />
      <circle cx="61" cy="51" r="1" fill="#fff" />
      {mood === 'happy' && <path d="M43 62 Q50 70 57 62" stroke="#7c2d12" strokeWidth="2.2" fill="none" strokeLinecap="round" />}
      {mood === 'sad' && <path d="M43 66 Q50 60 57 66" stroke="#7c2d12" strokeWidth="2.2" fill="none" strokeLinecap="round" />}
      {mood === 'normal' && <path d="M45 64 Q50 67 55 64" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
    </>
  )
}

const wrap = (children: React.ReactNode, size: number) => (
  <motion.svg width={size} height={size} viewBox="0 0 100 100" animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>{children}</motion.svg>
)

export function RabbitChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <ellipse cx="40" cy="22" rx="6" ry="18" fill="#f5f5f5" /><ellipse cx="40" cy="22" rx="3" ry="13" fill="#ffc8d4" />
    <ellipse cx="58" cy="20" rx="6" ry="18" fill="#f5f5f5" transform="rotate(12 58 20)" /><ellipse cx="58" cy="20" rx="3" ry="13" fill="#ffc8d4" transform="rotate(12 58 20)" />
    <circle cx="50" cy="54" r="28" fill="#f5f5f5" /><ellipse cx="50" cy="58" rx="3" ry="2" fill="#ff9ec7" />
    <circle cx="34" cy="60" r="3" fill="#ffc8d4" opacity="0.6" /><circle cx="66" cy="60" r="3" fill="#ffc8d4" opacity="0.6" />
    <Face mood={mood} />
  </>, size)
}

export function BearChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <circle cx="30" cy="28" r="11" fill="#a16207" /><circle cx="70" cy="28" r="11" fill="#a16207" />
    <circle cx="30" cy="28" r="6" fill="#d6a96a" /><circle cx="70" cy="28" r="6" fill="#d6a96a" />
    <circle cx="50" cy="54" r="30" fill="#b45309" /><ellipse cx="50" cy="62" rx="14" ry="11" fill="#e7c89a" />
    <ellipse cx="50" cy="58" rx="4" ry="3" fill="#3a2e2e" />
    <Face mood={mood} />
  </>, size)
}

export function DogChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <ellipse cx="26" cy="40" rx="9" ry="18" fill="#c8843c" transform="rotate(-18 26 40)" />
    <ellipse cx="74" cy="40" rx="9" ry="18" fill="#c8843c" transform="rotate(18 74 40)" />
    <circle cx="50" cy="52" r="28" fill="#e0a458" /><ellipse cx="50" cy="62" rx="13" ry="10" fill="#f5deb3" />
    <ellipse cx="50" cy="58" rx="4" ry="3" fill="#3a2e2e" />
    <Face mood={mood} />
  </>, size)
}

export function RaccoonChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <path d="M30 30 L36 16 L44 30 Z" fill="#6b7280" /><path d="M70 30 L64 16 L56 30 Z" fill="#6b7280" />
    <circle cx="50" cy="54" r="28" fill="#9ca3af" />
    <path d="M30 50 Q40 44 46 52 Q40 58 30 56 Z" fill="#374151" /><path d="M70 50 Q60 44 54 52 Q60 58 70 56 Z" fill="#374151" />
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#1f2937" />
    <circle cx="40" cy="52" r="3" fill="#fff" /><circle cx="60" cy="52" r="3" fill="#fff" />
    <circle cx="40" cy="52" r="2" fill="#1f2937" /><circle cx="60" cy="52" r="2" fill="#1f2937" />
    {mood === 'happy' && <path d="M44 64 Q50 69 56 64" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
    {mood !== 'happy' && <path d="M46 65 Q50 67 54 65" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
  </>, size)
}

export function OwlChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <path d="M34 30 L38 18 L44 30 Z" fill="#7c5c3a" /><path d="M66 30 L62 18 L56 30 Z" fill="#7c5c3a" />
    <ellipse cx="50" cy="54" rx="28" ry="30" fill="#a17a4f" /><ellipse cx="50" cy="60" rx="17" ry="20" fill="#d4b58a" />
    <circle cx="40" cy="48" r="9" fill="#fff" /><circle cx="60" cy="48" r="9" fill="#fff" />
    <circle cx="40" cy="48" r="4" fill="#2d2d2d" /><circle cx="60" cy="48" r="4" fill="#2d2d2d" />
    <path d="M50 54 L46 60 L54 60 Z" fill="#f59e0b" />
    {mood === 'sad' && <path d="M40 70 Q50 64 60 70" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
  </>, size)
}

export function FoxChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <path d="M32 30 L38 14 L46 30 Z" fill="#ea580c" /><path d="M68 30 L62 14 L54 30 Z" fill="#ea580c" />
    <ellipse cx="50" cy="52" rx="27" ry="24" fill="#ea580c" />
    <path d="M50 50 Q34 56 38 68 Q50 72 50 66 Q50 72 62 68 Q66 56 50 50" fill="#fff" />
    <path d="M50 60 L46 66 L54 66 Z" fill="#2d2d2d" />
    <Face mood={mood} />
  </>, size)
}

export function TurtleChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <ellipse cx="50" cy="58" rx="30" ry="24" fill="#4d7c0f" /><ellipse cx="50" cy="56" rx="24" ry="18" fill="#65a30d" />
    {[[50, 48], [38, 56], [62, 56], [50, 64]].map(([x, y], i) => <path key={i} d={`M${x - 6} ${y} l6 -5 l6 5 l-3 7 l-6 0 Z`} fill="#84cc16" stroke="#3f6212" strokeWidth="0.6" />)}
    <circle cx="22" cy="52" r="11" fill="#84cc16" />
    <circle cx="18" cy="50" r="2.5" fill="#2d2d2d" />
    {mood === 'happy' && <path d="M14 56 Q20 60 26 56" stroke="#3f6212" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
  </>, size)
}

export function SquirrelChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <path d="M74 70 Q96 58 86 32 Q80 44 70 52 Q78 64 64 68 Z" fill="#c87f3e" />
    <circle cx="48" cy="52" r="26" fill="#d2914f" /><ellipse cx="48" cy="60" rx="11" ry="9" fill="#f0d9b5" />
    <ellipse cx="36" cy="32" rx="6" ry="8" fill="#c87f3e" /><ellipse cx="60" cy="32" rx="6" ry="8" fill="#c87f3e" />
    <ellipse cx="48" cy="56" rx="3" ry="2" fill="#7c2d12" />
    <circle cx="40" cy="50" r="3.2" fill="#2d2d2d" /><circle cx="56" cy="50" r="3.2" fill="#2d2d2d" />
    {mood === 'sad' ? <path d="M42 64 Q48 58 54 64" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
      : <path d="M43 62 Q48 66 53 62" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />}
  </>, size)
}

export function HamsterChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <circle cx="34" cy="34" r="8" fill="#d4a574" /><circle cx="66" cy="34" r="8" fill="#d4a574" />
    <circle cx="50" cy="56" r="28" fill="#e8c9a0" /><ellipse cx="50" cy="62" rx="16" ry="12" fill="#f7ecd9" />
    <ellipse cx="50" cy="60" rx="3" ry="2" fill="#7c2d12" />
    <Face mood={mood} />
  </>, size)
}

export function GiraffeChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <rect x="42" y="58" width="16" height="34" rx="6" fill="#fcd34d" />
    {[[46, 64], [54, 72], [48, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#b45309" />)}
    <circle cx="40" cy="20" r="3" fill="#fcd34d" /><circle cx="60" cy="20" r="3" fill="#fcd34d" />
    <line x1="40" y1="23" x2="42" y2="32" stroke="#a16207" strokeWidth="2" /><line x1="60" y1="23" x2="58" y2="32" stroke="#a16207" strokeWidth="2" />
    <ellipse cx="50" cy="46" rx="22" ry="20" fill="#fcd34d" /><ellipse cx="50" cy="54" rx="11" ry="8" fill="#fde68a" />
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#7c2d12" />
    <Face mood={mood} />
  </>, size)
}

export function CatChar({ size = 90, mood }: AnimalProps) {
  return wrap(<>
    <path d="M30 30 L34 14 L46 28 Z" fill="#9ca3af" /><path d="M70 30 L66 14 L54 28 Z" fill="#9ca3af" />
    <circle cx="50" cy="54" r="27" fill="#b0b7c3" /><ellipse cx="50" cy="60" rx="11" ry="8" fill="#e5e7eb" />
    <path d="M50 58 L47 62 L53 62 Z" fill="#ff9ec7" />
    <Face mood={mood} />
    <line x1="34" y1="58" x2="22" y2="55" stroke="#6b7280" strokeWidth="1" /><line x1="34" y1="60" x2="22" y2="62" stroke="#6b7280" strokeWidth="1" />
    <line x1="66" y1="58" x2="78" y2="55" stroke="#6b7280" strokeWidth="1" /><line x1="66" y1="60" x2="78" y2="62" stroke="#6b7280" strokeWidth="1" />
  </>, size)
}

export const ANIMAL_COMPONENTS: Record<string, React.FC<AnimalProps>> = {
  rabbit: RabbitChar, bear: BearChar, dog: DogChar, raccoon: RaccoonChar,
  owl: OwlChar, fox: FoxChar, turtle: TurtleChar, squirrel: SquirrelChar,
  hamster: HamsterChar, giraffe: GiraffeChar, cat: CatChar
}

export function AnimalAvatar({ id, size = 90, mood }: { id: string; size?: number; mood?: AnimalProps['mood'] }) {
  const Comp = ANIMAL_COMPONENTS[id] || RabbitChar
  return <Comp size={size} mood={mood} />
}
