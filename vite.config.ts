import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 프로젝트 저장소 경로(/mindgame/)에 맞춘 base.
// 로컬 개발/Vercel 배포 시에는 base를 '/'로 두어도 동작합니다.
export default defineConfig({
  base: '/mindgame/',
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
