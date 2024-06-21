<template>
  <tm-app>
    <view class="logoWrap">
      <image class="logo" src="../../static/logo.png" />
    </view>
    <view class="uno-text-center">666</view>
    <view class="textWrap">
      <text class="title">{{ title }}</text>
      <text class="count">{{ count }}</text>
      <tm-button class="btn" @click="handleCount">计数</tm-button>
      <tm-button class="btn" @click="handleOpen">弹窗</tm-button>
      <tm-button class="btn" @click="handleSwitch('Order')">列表</tm-button>
      <tm-button class="btn" @click="handleSwitch('Tmui')">tmui示例</tm-button>
    </view>
    <tm-drawer :show="show" placement="center" closeable @close="handleClose">
      <view class="dialog">
        <view class="content">
          <text>Hello World</text>
        </view>
      </view>
    </tm-drawer>
    <MTabbar></MTabbar>
  </tm-app>
</template>

<script setup lang="ts">
import MTabbar from "@/components/common/MTabbar.vue"
import { reactive, toRefs } from "vue"

import { useCount, useDialog } from "./hooks"

const state = reactive({
  title: "Hello UniApp"
})

const countHook = useCount()
const { show, handleOpen, handleClose } = useDialog()

const { title } = toRefs(state)
const { count, handleCount } = countHook

const router = useRouter()
const handleSwitch = (name) => {
  router.push({
    name
  })
}
</script>

<style lang="scss" scoped>
:deep(.app) > .flex {
  align-items: center;
  justify-content: center;
}

.logoWrap {
  height: 200rpx;
  width: 200rpx;
  margin: 0 auto;

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
