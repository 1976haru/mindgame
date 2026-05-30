import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// DOM 인증서를 캡처해 PDF로 저장 (한글이 이미지로 렌더되어 깨지지 않음)
export async function downloadCertificatePdf(el: HTMLElement, filename: string): Promise<void> {
  const canvas = await html2canvas(el, { backgroundColor: '#fffbe6', scale: 2, useCORS: true })
  const img = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pw = pdf.internal.pageSize.getWidth()
  const ph = pdf.internal.pageSize.getHeight()
  const ratio = canvas.width / canvas.height
  let w = pw - 20
  let h = w / ratio
  if (h > ph - 20) { h = ph - 20; w = h * ratio }
  pdf.addImage(img, 'PNG', (pw - w) / 2, (ph - h) / 2, w, h)
  pdf.save(filename)
}

// 가능하면 이미지 공유, 안 되면 PDF 다운로드로 폴백
export async function shareCertificate(el: HTMLElement, filename: string): Promise<void> {
  try {
    const canvas = await html2canvas(el, { backgroundColor: '#fffbe6', scale: 2, useCORS: true })
    const blob: Blob | null = await new Promise(res => canvas.toBlob(b => res(b), 'image/png'))
    const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean }
    if (blob && nav.share && nav.canShare) {
      const file = new File([blob], `${filename}.png`, { type: 'image/png' })
      if (nav.canShare({ files: [file] })) { await nav.share({ files: [file], title: '마음 정원 인증서' }); return }
    }
  } catch {
    /* 폴백 */
  }
  await downloadCertificatePdf(el, `${filename}.pdf`)
}
