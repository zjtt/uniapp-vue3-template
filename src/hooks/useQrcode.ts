import UQRCode from "uqrcodejs"

/**
 *
 * @param data 二维码内容
 * @param size 二维码大小
 * @param id
 */
export const useQrcode = (size: number, id: string) => {
  // 获取uQRCode实例
  let qrCodeInstance = new UQRCode()
  const loading = ref(false) // true运行中不可点击
  const hasCanvas = ref(false) // canvas是否已就绪
  const qrcodeImg = ref("") // 二维码图片是否已生成

  // 绘制
  const drawQr = (data: string) => {
    if (loading.value) return
    loading.value = true
    // 设置二维码内容
    qrCodeInstance.data = data
    // 设置二维码大小，必须与canvas设置的宽高一致
    // 将rpx单位值转换成px
    qrCodeInstance.size = uni.upx2px(size)
    // 调用制作二维码方法
    qrCodeInstance.make()
    // 获取canvas上下文
    const canvasContext = uni.createCanvasContext(id) // 如果是组件，第二个参数this必须传入
    // 设置uQRCode实例的canvas上下文
    qrCodeInstance.canvasContext = canvasContext
    // 调用绘制方法将二维码图案绘制到canvas上
    qrCodeInstance.drawCanvas()
    hasCanvas.value = true
    loading.value = false
  }

  // 创建图片
  const createQrImg = (data: string): Promise<string> | undefined => {
    // 已经生成过图片，不再重复生成
    if (qrcodeImg.value) return Promise.resolve(qrcodeImg.value)
    if (loading.value) return
    if (!hasCanvas.value) {
      drawQr(data)
    }
    loading.value = true
    return new Promise((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: id,
        fileType: "canvasToTempFilePath",
        width: uni.upx2px(size) * 2,
        height: uni.upx2px(size) * 2,
        success: (res: UniApp.CanvasToTempFilePathRes) => {
          console.log("canvasToTempFilePath：", res)
          if (res.errMsg === "canvasToTempFilePath:ok") {
            resolve(res.tempFilePath)
            qrcodeImg.value = res.tempFilePath
          } else {
            reject(res.errMsg)
          }
        },
        fail: (err) => {
          console.log("canvasToTempFilePath：", err)
          reject("err")
        },
        complete() {
          loading.value = false
        }
      })
    })
  }

  const destryQrCodeInstance = () => {
    qrCodeInstance = null
  }

  return {
    drawQr,
    createQrImg,
    qrcodeImg,
    destryQrCodeInstance
  }
}
