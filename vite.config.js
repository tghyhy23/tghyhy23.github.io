// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',            // với repo user-site <username>.github.io phải là "/"
  plugins: [react()],
  build: { outDir: 'dist' } // mặc định của Vite, để nguyên
})
