import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  // Ensure service worker is accessible
  server: {
    fs: {
      allow: ['..']
    }
  }
})
