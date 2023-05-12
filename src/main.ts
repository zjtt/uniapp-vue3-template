import App from "./App.vue"
// main.js，注意要在use方法之后执行
import tmui from "@/tmui"
import * as Pinia from "pinia"

// #ifdef VUE3
import { createSSRApp } from "vue"
export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  app.use(pinia)
  app.use(tmui, { autoDark: false } as Tmui.tmuiConfig)
  // 如此配置即可
  return {
    app,
    Pinia
  }
}
// #endif
