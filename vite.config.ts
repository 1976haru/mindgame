import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel 배포용: 루트('/') 경로 기준. base 옵션 없음(기본값 '/').
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
