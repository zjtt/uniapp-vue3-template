<template>
  <tm-app>
    <view class="top">
      <view class="logoWrap">
        <image class="logo" src="@/static/logo.png" />
      </view>
      <view class="text-red text-center">666</view>
    </view>
    <view class="textWrap">
      <text class="title">{{ title }}</text>
      <text class="count">{{ count }}</text>
      <tm-button class="btn" @click="handleCount">计数</tm-button>
      <tm-button class="btn" @click="handleOpen">弹窗</tm-button>
      <tm-button class="btn" @click="onGo">路由实验</tm-button>
    </view>
    <tm-drawer :show="show" placement="center" closeable @close="handleClose">
      <view class="dialog">
        <view class="content">
          <text>Hello World</text>
        </view>
      </view>
    </tm-drawer>
    <MTabbar></MTabbar>
    <!-- <BottomBar></BottomBar> -->
  </tm-app>
</template>

<script setup lang="ts">
import tmApp from "@/tmui/components/tm-app/tm-app.vue"
import tmButton from "@/tmui/components/tm-button/tm-button.vue"
import tmDrawer from "@/tmui/components/tm-drawer/tm-drawer.vue"
import MTabbar from "@/components/common/MTabbar.vue"
import BottomBar from "@/components/common/BottomBar.vue"
import { reactive, toRefs, getCurrentInstance } from "vue"
import { useRouter } from "uni-mini-router"
import { getProductList2, login } from "@/api"
getProductList2({ pageNo: 1, pageSize: 5, categoryId: 1 })
getProductList2({ pageNo: 1, pageSize: 5, categoryId: 1 })
const api = async () => {
  const data = await getProductList2({ pageNo: 1, pageSize: 5, categoryId: 1 })
  console.log("data:", data)
}
api()

// 使用hooks（推荐）
let router = useRouter()

// 或者 使用全局挂载的router
// router = instence?.appContext.config.globalProperties.$Router

const onGo = () => {
  // 字符串路径
  // router.push("/pages/poster/poster")
  router.push({
    name: "poster"
  })

  // 带有路径的对象
  // router.push({ path: "/user" })
}

import { useCount, useDialog } from "./hooks"

const state = reactive({
  title: "Hello UniApp"
})

const countHook = useCount()
const { show, handleOpen, handleClose } = useDialog()

const { title } = toRefs(state)
const { count, handleCount } = countHook
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.logoWrap {
  height: 200rpx;
  width: 200rpx;

  .logo {
    width: 100%;
    height: 100%;
  }
}

.textWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50rpx;

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .count {
    margin: 20rpx auto;
  }
}

.btn + .btn {
  margin-top: 20rpx;
}

.dialog {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16rpx;
    font-size: 28rpx;
  }
}
</style>
