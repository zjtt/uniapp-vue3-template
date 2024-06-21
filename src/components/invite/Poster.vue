<template>
  <view class="poster-box" v-if="isShow" @click.stop="onClose">
    <view v-show="canvasImg" class="top">
      <view class="tip">长按图片保存到手机</view>
      <view class="btn-close" @click="onClose">
        <view class="line line1"></view>
        <view class="line line2"></view>
      </view>
    </view>
    <canvas
      type="2d"
      class="my-canvas"
      :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
      canvas-id="my-canvas"
    ></canvas>
    <canvas
      class="my-qrcode"
      id="qrcode"
      canvas-id="qrcode"
      style="width: 160rpx; height: 160rpx"
    ></canvas>
    <!-- <view class="save-btn" @click.stop="saveImage">保存图片</view> -->
    <image
      :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
      :src="canvasImg"
      mode="scaleToFill"
    />
  </view>
</template>

<script setup lang="ts">
import { useCanvas } from "@zh-achieve/uni-vue3-canvas"
import { useQrcode } from "@/hooks/useQrcode"
import { removeHidden, addHidden } from "@/utils"

interface Props {
  previewUrl?: string
  propertyName?: string // 资产名称
  price?: number | string
  pageUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  propertyName: "",
  pageUrl: "/pages/invite/invite"
})

// 网页二维码码
const qrImgWidth = 160 // 要与canvas宽高相同否则生成二维码显示不全
const { createQrImg, destryQrCodeInstance } = useQrcode(qrImgWidth, "qrcode")
const canvasImg = ref<string>("")
const {
  canvasCtx,
  getCanvasTextWidth,
  setCanvasStyle,
  setCanvasWH,
  setCanvasImg,
  drawRoundRect,
  getImageInfo,
  rpxToPx,
  beginDraw,
  drawRoundImg,
  createCanvasImg,
  setCanvasFontText
} = useCanvas("my-canvas")

onBeforeUnmount(() => {
  canvasCtx.value = null
  destryQrCodeInstance()
})
const onClose = () => {
  isShow.value = false
  removeHidden()
}
const { authState } = useAuthStore()
const isShow = ref(false)
const posterW = 640
const canvasW = ref(rpxToPx(posterW))
const extraNum = ref(props.propertyName ? 0 : 100)
const canvasH = ref(rpxToPx(840 - extraNum.value))
const showCanvas = () => {
  isShow.value = true
  addHidden()
  if (!canvasImg.value) {
    init()
  }
}
// 保存图片到相册
// const saveImage = () => {
//   console.log("saveImage")
// }

const init = async () => {
  //初始化画布
  uni.showLoading({
    title: "海报生成中...",
    mask: true
  })
  try {
    //设置画布背景透明
    setCanvasStyle("rgba(255, 255, 255, 0)")
    //设置画布大小
    setCanvasWH(canvasW.value, canvasH.value)
    //绘制圆角背景
    drawRoundRect(0, 0, canvasW.value, canvasH.value, 0, "#FFFFFF")
    // 绘制头部背景
    const topH = 388
    drawRoundRect(0, 0, canvasW.value, rpxToPx(topH), 0, "#C7CADD")
    // 预览图
    const previewImg = props.previewUrl || "static/images/share-poster.png"
    if (previewImg) {
      console.log(previewImg)
      let proviewImgRes = await getImageInfo(previewImg)
      const previewWidth = (proviewImgRes.width / proviewImgRes.height) * topH
      console.log("previewWidth:", previewWidth)
      const previewX = (posterW - previewWidth) / 2
      if (proviewImgRes.errMsg === "getImageInfo:ok") {
        setCanvasImg(
          proviewImgRes.path,
          rpxToPx(previewX),
          0,
          rpxToPx(previewWidth),
          rpxToPx(topH)
        )
      }
    }
    //// 获取头像图片
    const headerImgLocal = await getImageInfo(authState.userInfo?.avatar || "")
    // //绘制头像
    const headY = rpxToPx(418)
    const headX = rpxToPx(40)
    const headW = rpxToPx(88) // 头像
    drawRoundImg(headerImgLocal.path, headX, headY, headW, headW, headW / 2)

    //绘制标题
    const titleFontSize = rpxToPx(30)
    const nickY = headY + headW / 2 + titleFontSize / 4
    let nick = authState.userInfo?.nickName || ""
    const nickWidth = getCanvasTextWidth(nick)
    const maxNickWidth = rpxToPx(486)
    if (nickWidth > maxNickWidth) {
      // 超出最大宽度
      nick = nick.slice(0, 15) + "..."
    }
    setCanvasFontText(
      nick,
      rpxToPx(158),
      nickY,
      "#444",
      `${titleFontSize}px sans-serif`
    )
    // 如果有资产名字
    if (props.propertyName) {
      let propertyName = props.propertyName // 资产名字
      const propertyNameFontSize = rpxToPx(36)
      const propertyNameWidth = getCanvasTextWidth(propertyName)
      const maxPropertyNameWidth = rpxToPx(260)
      if (propertyNameWidth > maxPropertyNameWidth) {
        // 超出最大宽度
        propertyName = propertyName.slice(0, 7) + "..."
      }
      // 资产名称
      setCanvasFontText(
        propertyName,
        headX,
        headY + headW + rpxToPx(69),
        "#444",
        `bold ${propertyNameFontSize}px sans-serif`
      )
      // 价格
      props.price &&
        setCanvasFontText(
          `¥  ${props.price} 元`,
          rpxToPx(420),
          headY + headW + rpxToPx(69),
          "rgba(255, 97, 103, 1)",
          `bold ${rpxToPx(30)}px sans-serif`
        )
    }
    setCanvasFontText(
      "扫码进入小程序平台",
      headX,
      rpxToPx(706 - extraNum.value),
      "#444",
      `${rpxToPx(32)}px sans-serif`
    )
    setCanvasFontText(
      "限时免费",
      headX,
      rpxToPx(757 - extraNum.value),
      "#444",
      `${rpxToPx(32)}px sans-serif`
    )

    const qrcodeImg = await createQrImg(
      location.origin + import.meta.env.VITE_BASE_PATH + props.pageUrl
    )
    if (qrcodeImg) {
      setCanvasImg(
        qrcodeImg,
        rpxToPx(440),
        rpxToPx(posterW - extraNum.value),
        rpxToPx(qrImgWidth),
        rpxToPx(qrImgWidth)
      )
    }
    //延迟渲染
    await beginDraw()
    const imgRes = await createCanvasImg()
    canvasImg.value = imgRes
  } catch (err) {
    console.log(err)
    isShow.value = false
    uni.showToast({
      title: "海报生成失败",
      icon: "none"
    })
  } finally {
    uni.hideLoading()
  }
}

defineExpose({
  showCanvas
})
</script>

<style scoped lang="scss">
.poster-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background: rgb(0 0 0 / 40%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    width: 640rpx;
    position: relative;
    margin-bottom: 30rpx;

    .tip {
      font-size: 34rpx;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #fff;
      text-align: center;
      width: 100%;
    }

    .btn-close {
      width: 60rpx;
      height: 60rpx;
      border: 5rpx solid #fff;
      border-radius: 50%;
      position: absolute;
      box-sizing: border-box;
      right: 0;
      top: 50%;
      transform: translateY(-50%);

      .line {
        width: 40rpx;
        height: 4rpx;
        background-color: #fff;
        position: absolute;
        left: 5rpx;
        top: 23rpx;
        transform-origin: 20rpx 2.5rpx;
      }

      .line1 {
        transform: rotateZ(45deg);
      }

      .line2 {
        transform: rotateZ(-45deg);
      }
    }
  }

  .my-canvas {
    position: absolute;
    left: -100%;
  }

  .my-qrcode {
    position: absolute;
    right: -100%;
  }

  .save-btn {
    margin-top: 35rpx;
    color: #fff;
    background: linear-gradient(to right, #fe726b, #fe956b);
    padding: 15rpx 40rpx;
    border-radius: 50rpx;
  }
}
</style>
