import App from "./App.vue"
// main.js，注意要在use方法之后执行
import tmui from "@/tmui"
import * as Pinia from "pinia"
import { createPersistedState } from "pinia-plugin-persistedstate"

// #ifdef VUE3
import { createSSRApp } from "vue"
import router from "./router"
// #ifdef H5
if (import.meta.env.VITE_API_URL === "http://xxx.neibu.com") {
  const erudaScript = document.createElement("script")
  erudaScript.src = "//xxx.neibu.com/front/js/eruda.js"
  erudaScript.onload = () => {
    eruda.init()
  }
  document.body.appendChild(erudaScript)
}
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  const pinia = Pinia.createPinia().use(
    createPersistedState({
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        }
      }
    })
  )
  app.use(pinia)
  app.use(tmui, {
    autoDark: false,
    light: {
      bgColor: "#fff"
    }
  } as Tmui.tmuiConfig)

  return {
    app,
    Pinia
  }
}
// #endif
