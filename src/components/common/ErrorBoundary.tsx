import { Component, ErrorInfo, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 개발 중 로깅 (외부 전송 없음)
    console.error('정원에 문제가 생겼어요:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="screen">
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌱</div>
          <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 10 }}>잠깐 쉬어가요</h2>
          <p style={{ color: 'var(--color-text-soft)', textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>
            정원에 작은 문제가 생겼어요.<br />다시 시작하면 괜찮아질 거예요.
          </p>
          <button onClick={this.handleReset} style={{ padding: '14px 32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', fontWeight: 700, fontSize: 16 }}>
            정원 다시 열기 🌿
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
