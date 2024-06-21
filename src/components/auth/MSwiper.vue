<template>
  <view>
    <swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="2000" @change="onChange">
      <swiper-item v-for="(item, index) in props.banners" :key="index">
        <!-- <image class="banner" :src="item" mode="scaleToFill" /> -->
        <image class="banner" :src="item" mode="scaleToFill" />
      </swiper-item>
    </swiper>
    <view class="swiper-dots flex flex-row">
      <view
        class="dot"
        :class="{ active: index - 1 === activeIndex }"
        v-for="index in props.banners.length"
        :key="index"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  banners: string[]
}
const props = withDefaults(defineProps<Props>(), {
  banners: () => []
})
const activeIndex = ref<number>(0)
const onChange = (e: { detail: { current: number } }) => {
  activeIndex.value = e.detail.current
}
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 300rpx;

  .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.swiper-dots {
  margin: 15rpx 35rpx 0;

  .dot {
    width: 41rpx;
    height: 6rpx;
    background: #e0e4e5;

    &:not(:last-child) {
      margin-right: 10rpx;
    }

    &.active {
      background: #2f7cfc;
    }
  }
}
</style>
