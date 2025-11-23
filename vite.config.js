import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'OneDrive', 'Documents', 'Projects', 'darkstackstudios'),
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  }
})
