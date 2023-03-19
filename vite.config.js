import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import react from '@vitejs/plugin-react'

export default defineConfig({
   base: '',
   plugins: [react(), viteSingleFile()],
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
