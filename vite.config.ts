import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ScriptureFlux/', // GitHub Pages 배포 서브디렉토리 지원
})
