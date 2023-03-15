import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from "vite"
// import path from "path";

export default defineConfig({
  plugins: [createVuePlugin()]
})