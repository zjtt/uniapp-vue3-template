import { computed } from "vue"

import { useMainStore } from "@/store"

export function useCount() {
  const mainStore = useMainStore()

  const count = computed(() => mainStore.count)

  function handleCount() {
    mainStore.increment()
  }

  return {
    count,
    handleCount
  }
}
