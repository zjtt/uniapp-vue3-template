import { defineStore } from "pinia"
import { reactive } from "vue"

interface BottomBarStore {
  selectedIndex: number
}

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useBottomBarStore = defineStore(
  "useBottomBarStore",
  () => {
    const useBottomBarState: BottomBarStore = reactive({
      selectedIndex: 0
    })

    const changeBottomBarIndex = (index: number) => {
      useBottomBarState.selectedIndex = index
    }
    return { useBottomBarState, changeBottomBarIndex }
  },
  {
    persist: {
      key: "useBottomBarState",
      paths: ["useBottomBarState.selectedIndex"]
    }
  }
)
