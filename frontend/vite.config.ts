import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Rails serves this build from its public directory so the interface and the
// API share one origin, one deployment and one URL. See README.
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL('../backend/public', import.meta.url)),
    // public/ also holds files Rails owns, such as robots.txt.
    emptyOutDir: false,
    assetsDir: 'assets',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
