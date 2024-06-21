import { ConfigEnv, loadEnv, UserConfig } from "vite"
import { uniPostcssPlugin } from "@dcloudio/uni-cli-shared"
import uni from "@dcloudio/vite-plugin-uni"
// #ifdef H5
import legacy from "@vitejs/plugin-legacy"
// import { createHtmlPlugin } from "vite-plugin-html"
// #endif
import autoprefixer from "autoprefixer"
// import postCss from "postcss-import"
import path from "path"
import TransformPages from "uni-read-pages-vite"
import Unocss from "unocss/vite"

// 类型检查
// import checker from "vite-plugin-checker"
// 自动引入
import AutoImport from "unplugin-auto-import/vite"
import { viteMockServe } from "vite-plugin-mock"

// https://vitejs.dev/config/
export default ({ mode, command, ...params }: ConfigEnv): UserConfig => {
  console.log(process.env.UNI_PLATFORM)
  // loadEnv用来加载.env.[mode]文件中的变量
  // loadEnv有三个参数，mode、路径、要加载变量的前缀(默认为VI TE_)
  const env = loadEnv(mode, process.cwd())
  console.log("params:", JSON.stringify(params)) // {"ssrBuild":false}
  console.log("command:", command) // command 为 `serve`(开发环境) 或者 `build`(生产环境)
  console.log("mode:", mode) // development stage production

  return {
    base: env.VITE_BASE_PATH,
    // 自定义全局变量
    define: {
      ROUTES: new TransformPages().routes // 注入路由表
    },
    resolve: {
      alias: {
        // 设置路径别名
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src")
      },
      extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    css: {
      postcss: {
        plugins: [uniPostcssPlugin(), autoprefixer()]
      }
    },
    plugins: [
      // createHtmlPlugin({
      //   minify: true,
      //   /**
      //    * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
      //    * @default src/main.ts
      //    */
      //   entry: "/src/main.ts",
      //   /**
      //    * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
      //    * @default index.html
      //    */
      //   template: "index.html",
      //   /**
      //    * 需要注入 index.html ejs 模版的数据
      //    */
      //   inject: {
      //     data: {
      //       title: "名称",
      //       // 解决开发服务钉钉浏览器globalThis is not defined的问题
      //       injectScript:
      //         mode === "development"
      //           ? `<script>
      //       !(function (t) {
      //         function e() {
      //           var e = this || self;
      //           (e.globalThis = e), delete t.prototype._T_;
      //         }
      //         "object" != typeof globalThis &&
      //           (this
      //             ? e()
      //             : (t.defineProperty(t.prototype, "_T_", {
      //                 configurable: !0,
      //                 get: e,
      //               }),
      //               _T_));
      //       })(Object);
      //       </script>`
      //           : ""
      //     }
      //   }
      // }),
      uni(),
      // 使用unocss后打包有样式问题，勿用
      Unocss({
        mode: "vue-scoped"
      }),
      // checker({
      //   vueTsc: {
      //     root: ".",
      //     tsconfigPath: "./tsconfig.json"
      //   }
      // })
      AutoImport({
        imports: [
          "vue",
          "uni-app",
          "pinia",
          {
            from: "uni-mini-router",
            imports: ["createRouter", "useRouter", "useRoute"]
          }
        ],
        dts: "src/auto-imports.d.ts",
        // dirs: ["src/store", "src/components/uni-mini-router"],
        dirs: ["src/store"],
        eslintrc: {
          enabled: true,
          globalsPropValue: true,
          filepath: "./.eslintrc-auto-import.json"
        }
      }),
      viteMockServe({
        mockPath: "src/mock",
        // localEnabled: process.env.NODE_ENV !== "production", // true的时候会请求本地
        // localEnabled: command === "serve", // 开发时应用, // true的时候会请求mock
        localEnabled: mode === "mock", // 开发时应用, // true的时候会请求mock
        logger: true
      }),
      process.env.UNI_PLATFORM === "h5"
        ? legacy({
            modernPolyfills: true,
            // 为打包后的文件提供传统浏览器兼容性支持
            renderLegacyChunks: true,
            targets: ["chrome 52"], // 需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"] // 面向IE11时需要此插件
          })
        : ""
    ],
    build: {
      // #ifdef MP-WEIXIN
      sourcemap: true,
      // #endif
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 1500,
      assetsDir: "static",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production", // 默认为false // debugger
          drop_debugger: mode !== "development" // 默认为true
        }
      },
      // sourcemap: mode !== "production",
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/entry/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          compact: true
          // manualChunks(id) {
          //   //静态资源分拆打包
          //   if (id.includes("node_modules")) {
          //     return id
          //       .toString()
          //       .split("node_modules/")[1]
          //       .split("/")[0]
          //       .toString();
          //   }
          // },
        }
      }
    },
    server: {
      port: 8088,
      host: "0.0.0.0", // 将服务暴露在局域网中
      open: true,
      proxy: {
        "/buy": {
          target: "http://xxx.neibu.com",
          changeOrigin: true,
          // configure: (proxy, options) => {
          //   console.log("proxy, options", proxy);
          //   // proxy 是 'http-proxy' 的实例
          // },
          cookieDomainRewrite: {
            "xxx.com": "192.168.43.112"
          }
        },
        "/run": {
          target: "http://xxx.neibu.com",
          changeOrigin: true,
          secure: false,
          // pathRewrite: {
          //   "^/collection-app": ""
          // },
          cookieDomainRewrite: {
            "xxx.com": "192.168.43.112"
          }
        }
      }
    }
  }
}
