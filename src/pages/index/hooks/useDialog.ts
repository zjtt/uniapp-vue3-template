import { reactive, toRefs } from "vue"

export function useDialog() {
  const state = reactive({
    show: false
  })

  function handleOpen() {
    state.show = true
  }

  function handleClose() {
    state.show = false
  }

  return {
    ...toRefs(state),
    handleOpen,
    handleClose
  }
}
