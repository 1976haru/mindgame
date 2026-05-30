import { useRef, useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { DOJO_BY_ID } from '../../data/dojos'
import { todayString } from '../../utils/helpers'
import { downloadCertificatePdf, shareCertificate } from '../../utils/certificate'

export function CertificateScreen() {
  const certGrand = useAppStore(s => s.certGrand)
  const activeDojoId = useAppStore(s => s.activeDojoId)
  const profile = useAppStore(s => s.profile)
  const setScreen = useAppStore(s => s.setScreen)
  const ref = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  const name = profile?.name || '친구'
  const dojo = !certGrand && activeDojoId ? DOJO_BY_ID[activeDojoId] : null
  const title = certGrand ? '솔로몬의 후계자' : dojo ? dojo.finalReward.titleName : '수련생'
  const filename = certGrand ? `${name}_솔로몬의후계자_인증서` : `${name}_${dojo?.shortName ?? ''}_사범_인증서`

  const doDownload = async () => { if (!ref.current) return; setBusy(true); try { await downloadCertificatePdf(ref.current, filename + '.pdf') } finally { setBusy(false) } }
  const doShare = async () => { if (!ref.current) return; setBusy(true); try { await shareCertificate(ref.current, filename) } finally { setBusy(false) } }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, overflowY: 'auto' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen(certGrand ? 'hallOfFame' : 'dojoHall')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 20, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>📜 인증서</h2>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 16px 24px', gap: 16 }}>
        {/* 캡처 대상 인증서 */}
        <div ref={ref} style={{
          width: 320, padding: 24, borderRadius: 8, background: 'linear-gradient(160deg,#fffbe6,#fef3c7)', color: '#3a2e2e',
          border: '6px double #d4a017', textAlign: 'center', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {/* 무궁화 모서리 */}
          <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 20 }}>🌺</div>
          <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 20 }}>🌺</div>
          <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 20 }}>🌺</div>
          <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 20 }}>🌺</div>

          <div style={{ fontSize: 40 }}>🦉</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#92400e', margin: '4px 0 2px' }}>마음 정원 인증서</div>
          <div style={{ fontSize: 14, color: '#a16207' }}>{certGrand ? '명예의 전당' : '솔로몬 7대 도장'}</div>
          <div style={{ height: 2, background: '#d4a017', margin: '14px 0' }} />

          <div style={{ fontSize: 26, fontWeight: 700, color: '#7c3aed', marginBottom: 8 }}>{name}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7 }}>
            위 어린이는 마음 정원에서<br />
            <b style={{ color: '#b45309' }}>{title}</b><br />
            자격을 훌륭히 취득하였기에<br />이 증서를 드립니다.
          </p>
          {certGrand && <p style={{ fontSize: 13, color: '#a16207', marginTop: 8 }}>7개 도장 사범 · 법교육 15편 완수</p>}

          <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>취득일: {todayString()}</div>
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-around', fontSize: 13, color: '#4b5563' }}>
            <span>멘토 {dojo ? dojo.mentor.name.slice(0, 4) : '솔로몬'} ✍️</span>
            <span>솔로몬 ⚖️</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button disabled={busy} onClick={doDownload} style={{ padding: '14px 22px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#a855f7)', color: 'white', fontWeight: 700, fontSize: 17, opacity: busy ? 0.6 : 1 }}>
            {busy ? '만드는 중…' : '⬇️ PDF 저장'}
          </button>
          <button disabled={busy} onClick={doShare} style={{ padding: '14px 22px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', fontWeight: 700, fontSize: 17, opacity: busy ? 0.6 : 1 }}>
            📤 공유
          </button>
        </div>
        <p style={{ fontSize: 16, color: 'var(--color-text-soft)', textAlign: 'center' }}>부모님께 보여드리거나 출력할 수 있어요!</p>
      </div>
    </div>
  )
}
