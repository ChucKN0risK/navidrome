import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const scssPaths: Array<string> = [
  './src/assets/styles/01-utils/_mixins.scss',
];
console.log(path.resolve(process.cwd(), './src/assets/vectors'))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/vectors')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: false,
    })
  ],
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
