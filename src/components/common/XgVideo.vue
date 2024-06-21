<template>
  <view id="player"></view>
</template>

<script setup lang="ts">
import type PresetPlayer from "xgplayer"
// 引入es目录下的插件
import CorePlayer from "xgplayer/es/core_player"
import Poster from "xgplayer/es/controls/poster"
// import Play from "xgplayer/es/controls/play"
import Fullscreen from "xgplayer/es/controls/fullscreen"
import Progress from "xgplayer/es/controls/progress"
import Volume from "xgplayer/es/controls/volume"
import PlaybackRate from "xgplayer/es/controls/playbackRate"
// import Pip from "xgplayer/es/controls/pip"
// import Flex from "xgplayer/es/controls/flex"

interface Props {
  poster?: string
  videoUrl: string
}
const props = defineProps<Props>()

const player = ref<PresetPlayer | null>()

onMounted(() => {
  // xgplayer3.x视频播放比例不对，所以使用2.x版本
  // // 必须在onMounted 或 nextTick实例Xgplayer播放器
  player.value = new CorePlayer({
    id: "player",
    url: props.videoUrl,
    // url: "https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4",
    poster: props.poster,
    height: "100%",
    width: "100%",
    // 设置这个才没有下载按钮
    autoplay: true, //自动播放，设置自动播放必要参数
    autoplayMuted: true, //自动播放静音，设置自动播放参数必要参数
    muted: true,
    volume: 0,
    defaultMuted: true,
    loop: true,
    controls: true,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    defaultPlaybackRate: 1,
    controlPlugins: [
      // Play,
      Poster,
      Fullscreen,
      Progress,
      Volume,
      PlaybackRate
      // Pip,
      // Flex
    ],
    // pip: true, //打开画中画功能
    // fluid: true, // 流式布局，可使播放器宽度跟随父元素的宽度大小变化
    // fitVideoSize: "fixWidth", // 表示容器宽度固定，容器高度按照视频内容比例增大或减小
    playsinline: true, //内联模式
    "x5-video-player-type": "h5"
    // errorTips: '<span class="app-error">无视频源</span>',
  })
})

onUnmounted(() => {
  player.value = null
})
</script>
