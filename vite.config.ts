import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = mode !== 'demo'
  
  return {
    plugins: [
      vue(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: isLibraryMode ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DynamicClockVue',
        fileName: (format) => `dynamic-clock.${format}.js`
      },
      rollupOptions: {
        external: ['vue', 'tailwindcss'],
        output: {
          globals: {
            vue: 'Vue'
          },
          exports: 'named',
          // Ensure CSS is extracted with correct name
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) return 'style.css'
            return assetInfo.name || '[name][extname]'
          }
        }
      }
    } : {
      // Regular build for demo mode
      outDir: 'demo-dist'
    }
  }
})