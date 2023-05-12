import { uniPostcssPlugin } from "@dcloudio/uni-cli-shared"
import uni from "@dcloudio/vite-plugin-uni"
import { defineConfig } from "vite"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [uniPostcssPlugin(), autoprefixer()]
    }
  },
  plugins: [uni()],
  server: {
    port: 8080
  }
})
