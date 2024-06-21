<template>
  <!-- home-color="#2F7CFC" -->
  <!-- :color="props.color" -->
  <!-- :home-path="props.homePath" -->
  <tm-navbar
    v-if="showNavBar"
    :title="props.title"
    :fontSize="36"
    :shadow="0"
    color="#F3F8FF"
    :hideHome="true"
    :hideBack="true"
  >
    <template v-if="!props.hideLeft" #left>
      <view class="icon-box">
        <tm-icon
          v-if="!hideBack && (fixedBack || _pages > 1)"
          :font-size="38"
          name="tmicon-angle-left"
          _style="padding: 12rpx 24rpx;"
          @click="goBack"
        ></tm-icon>
        <tm-icon
          v-if="!hideHome && (fixedHome || _pages === 1)"
          :font-size="38"
          name="tmicon-md-home"
          _style="padding: 12rpx 24rpx;"
          @click="goHome"
        ></tm-icon>
      </view>
    </template>
  </tm-navbar>
</template>

<script setup lang="ts">
import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue"
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"

const showNavBar = ref(true)
// // #ifdef H5
// const { isMP } = useWebViewStore()
// isMP().then((flag) => {
//   if (flag) {
//     showNavBar.value = false
//   }
// })
// // #endif

const _pages = ref(0)
onMounted(() => {
  _pages.value = getCurrentPages().length
  // #ifdef H5
  _pages.value = history.state.back === null ? 1 : window.history.length
  // #endif
  console.log("getCurrentPages:", toRaw(getCurrentPages()))
})

interface NavBarProps {
  title: string
  color?: string
  hideLeft?: boolean
  hideBack?: boolean // 隐藏返回按钮
  hideHome?: boolean // 隐藏home按钮
  fixedHome?: boolean // 始终显示首页icon，如果只显示home需要同时设置hideBack为true
  fixedBack?: boolean // 始终显示返回icon，如果只显示back需要同时设置hideHome为true
  homeName?: string // 自定义homeicon返回的路由
  leftName?: string // 自定义lefticon返回的路由
}

const props = withDefaults(defineProps<NavBarProps>(), {
  color: "#fff",
  hideLeft: false,
  hideHome: false,
  hideBack: false,
  fixedHome: false,
  fixedBack: false
})

const router = useRouter()
const goBack = () => {
  if (props.leftName) {
    router.push({
      name: props.leftName
    })
  } else {
    // #ifdef H5
    window.history.back()
    // #endif
    // #ifdef MP-WEIXIN
    router.back()
    // #endif
  }
}
const goHome = () => {
  if (props.homeName) {
    router.push({
      name: props.homeName
    })
  } else {
    router.push({
      name: "Home"
    })
  }
}
</script>
<style lang="scss" scoped>
.icon-box {
  display: flex;
}
</style>
