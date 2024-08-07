import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/<your-repo-name>/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8800,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
