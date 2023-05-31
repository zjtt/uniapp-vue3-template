import { uniPostcssPlugin } from "@dcloudio/uni-cli-shared"
import uni from "@dcloudio/vite-plugin-uni"
import { defineConfig } from "vite"
import autoprefixer from "autoprefixer"
import path from "path"
import TransformPages from "uni-read-pages-vite"
// 类型检查
// import checker from "vite-plugin-checker"
// 自动引入
// import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    ROUTES: new TransformPages().routes // 注入路由表
  },
  resolve: {
    alias: {
      // 设置路径别名
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [uniPostcssPlugin(), autoprefixer()]
    }
  },
  plugins: [
    uni()
    // checker({
    //   vueTsc: {
    //     root: ".",
    //     tsconfigPath: "./tsconfig.json"
    //   }
    // })
    // AutoImport({
    //   imports: [
    //     "vue",
    //     "uni-app",
    //     "pinia",
    //     {
    //       from: "uni-mini-router",
    //       imports: ["createRouter", "useRouter", "useRoute"]
    //     }
    //   ],
    //   dts: "src/auto-imports.d.ts",
    //   dirs: ["src/store"],
    //   eslintrc: {
    //     enabled: true,
    //     globalsPropValue: true
    //   }
    // })
  ],
  server: {
    port: 8091,
    host: "0.0.0.0", // 将服务暴露在局域网中
    open: true,
    proxy: {
      "/activity": {
        target: "https://xxx.baidu.com",
        changeOrigin: true,
        // configure: (proxy, options) => {
        //   console.log("proxy, options", proxy);
        //   // proxy 是 'http-proxy' 的实例
        // },
        cookieDomainRewrite: {
          "baidu.com": "192.168.43.11"
        }
      }
    }
  }
})
