// 小程序点击按钮保存图片
export const useSaveImg = () => {
  const saveImgLoading = ref(false)
  const saveImg = (localImgUrl: string) => {
    if (saveImgLoading.value) return
    saveImgLoading.value = true
    // return new Promise((resolve) => {
    // uni.downloadFile({
    //   url: localImgUrl,
    //   success: (res) => {
    uni.saveImageToPhotosAlbum({
      // filePath: res.tempFilePath,
      filePath: localImgUrl,
      success() {
        uni.showToast({
          title: "已保存到相册",
          icon: "success",
          duration: 2000
        })
      },
      fail() {
        uni.showToast({
          title: "保存失败",
          icon: "none",
          duration: 2000
        })
      },
      complete() {
        saveImgLoading.value = false
      }
    })
    // }
    // })
    // })
  }
  return {
    saveImg,
    saveImgLoading
  }
}
