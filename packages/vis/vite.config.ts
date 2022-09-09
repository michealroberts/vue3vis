/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    deps: {
      inline: [
        "vis-timeline",
        "vis-util"
      ]
    },
    globals: true,
    passWithNoTests: true,
    testTimeout: 20000,
    watch: false
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    vue()
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue3vis',
      fileName: format => `vue3vis.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'vue-demi', '@vue/composition-api'],
      output: {
        sourcemap: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})
