<template>
  <view class="video-box">
    <!-- #ifdef MP-WEIXIN -->
    <video
      class="video"
      :poster="props?.poster"
      controlsList="nodownload"
      :src="videoUrl"
      @error="videoError"
      controls
    ></video>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <XgVideo :videoUrl="videoUrl" :poster="poster" />
    <!-- #endif -->
  </view>
  <!-- enable-danmu
    danmu-btn -->
</template>

<script setup lang="ts">
// #ifdef H5
import XgVideo from "./XgVideo.vue"
// #endif
interface Props {
  poster?: string
  videoUrl: string
}

const props = defineProps<Props>()

const videoError = () => {
  console.log("videoError")
}
</script>
<style scoped lang="scss">
.video-box {
  width: 100%;
  height: 400rpx;

  .video {
    width: 100%;
    height: 100%;

    &::-webkit-media-controls-enclosure {
      overflow: hidden;
    }

    &::-webkit-media-controls-panel {
      width: calc(100% + 30px);
    }

    &::-internal-media-controls-download-button {
      display: none;
    }
  }
}
</style>
