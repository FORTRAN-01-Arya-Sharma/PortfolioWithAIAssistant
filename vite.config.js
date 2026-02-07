import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // FIX: This automatically handles React imports so you don't get "React is not defined"
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  build: {
    // OPTIMIZATION: 'esbuild' is faster and doesn't require extra installs like 'terser'
    minify: 'esbuild', 
    rollupOptions: {
      output: {
        manualChunks: {
          // OPTIMIZATION: Splitting these keeps your "Initial Load" size small
          vendor: ['react', 'react-dom', 'framer-motion', 'cobe'],
        },
      },
    },
    // Removes console logs in production to speed up execution
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
