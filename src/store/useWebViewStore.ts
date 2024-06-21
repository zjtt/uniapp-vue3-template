// #ifdef H5
import { defineStore } from "pinia"
import { reactive } from "vue"
import { isMiniProgram } from "@/utils/wechat"

interface WebViewStore {
  isWebview: null | boolean
}

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useWebViewStore = defineStore("useWebViewStore", () => {
  const webViewState: WebViewStore = reactive({
    isWebview: null
  })

  const isMP = async () => {
    if (webViewState.isWebview !== null) {
      return webViewState.isWebview
    }
    try {
      const flag = await isMiniProgram()
      webViewState.isWebview = flag
      return flag
    } catch (err) {
      return false
    }
  }

  return { webViewState, isMP }
})
// #endif
