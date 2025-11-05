import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use relative paths for deployment
  server: {
    hmr: {
      overlay: true, // Show error overlay in the browser
    },
    watch: {
      usePolling: false, // Use native file system events
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
})
