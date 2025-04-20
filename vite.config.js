import { defineConfig } from 'vite'

export default defineConfig({
  // корневая папка исходников, если надо
  root: './',
  // настроить build.outDir, publicDir и т.д.
  build: {
    outDir: 'dist', // папка, куда ляжет сборка
  },
})
