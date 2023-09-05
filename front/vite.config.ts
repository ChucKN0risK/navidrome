import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const scssPaths: Array<string> = [
  './src/assets/styles/01-utils/_mixins.scss',
  './src/assets/styles/01-utils/_media-queries.scss',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: scssPaths.reduce((acc, scssPath) => {
          const pathToImport = path.resolve(__dirname, scssPath);
          if (acc) {
            return `${acc} @import "${pathToImport}";`;
          }
          return `@import "${pathToImport}";`;
        }, ''),
      },
    },
  },
  server: {
    cors: false
  }
})
