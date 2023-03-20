import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import preact from '@preact/preset-vite'

export default defineConfig({
   base: '',
   plugins: [preact(), viteSingleFile()],
   build: {
      target: 'es2018',
      cssCodeSplit: false,
      copyPublicDir: false,
      rollupOptions: {
         output: {
            entryFileNames: 'index.js',
            assetFileNames: 'index.css',
         }
      }
   }
})
