import { getBiteUnit } from "@/utils"
import { PropertyFileFormatType } from "@/typings"
import {
  imageExtension,
  docExtension,
  audioExtension,
  videoExtension
} from "@/utils/businessConfig"

/**
 * @param onlyImg 是否只能上传图片
 * @param count 每次可以从手机选几张照片
 */
export const useUpload = (onlyImg = false, count = 1) => {
  // 不同类型文件大小，单位M
  const sizeLimitObj = {
    jpg: 5,
    png: 5,
    jpeg: 5,
    doc: 5,
    docx: 5,
    pdf: 5,
    mp4: 100,
    avi: 100,
    wmv: 100,
    mp3: 20,
    wav: 20
  }
  const fileJudge = (
    type: keyof typeof sizeLimitObj | "",
    size: number
  ): boolean => {
    // 判断格式是否符合
    if (!extension.includes("." + type)) {
      uni.showToast({
        title: `请选择正确格式的文件`,
        icon: "none",
        duration: 2500
      })
      return false
    }

    const bitnum = getBiteUnit()

    if (size / bitnum / bitnum > sizeLimitObj[type]) {
      // 算出多少M
      uni.showToast({
        title: `大小不能超过${sizeLimitObj[type]}M`,
        icon: "none",
        duration: 2500
      })
      return false
    }
    return true
  }
  let extension = [
    ...imageExtension,
    ...docExtension,
    ...audioExtension,
    ...videoExtension
  ]
  if (onlyImg) {
    extension = imageExtension
  }
  // #ifdef MP-WEIXIN
  const weixinUpload = (): Promise<
    | UniApp.ChooseImageSuccessCallbackResult
    | UniApp.ChooseFileSuccessCallbackResult
    | UniApp.ChooseMessageFileSuccessCallbackResult
  > => {
    return new Promise((resolve) => {
      // 选择图片
      if (onlyImg) {
        uni.chooseImage({
          // count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。
          count: count, // 默认9
          sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], //从相册选择或拍照
          success: function (
            chooseImageRes: UniApp.ChooseImageSuccessCallbackResult
          ) {
            resolve(chooseImageRes)
          }
        })
      } else {
        uni.chooseMessageFile({
          count: count,
          extension: extension,
          success: (chooseFileRes) => {
            // errMsg: "chooseMessageFile:ok"
            // tempFiles
            resolve(chooseFileRes)
          },
          fail: (err) => {
            console.log("weixinUpload-error:", err)
          }
        })
      }
    })
  }
  // #endif
  // #ifdef H5
  const h5Upload = (): Promise<
    | UniApp.ChooseImageSuccessCallbackResult
    | UniApp.ChooseFileSuccessCallbackResult
  > => {
    return new Promise((resolve) => {
      // 选择图片
      if (onlyImg) {
        uni.chooseImage({
          // count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。
          count: count, // 默认9
          sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], //从相册选择或拍照
          success: (
            chooseImageRes: UniApp.ChooseImageSuccessCallbackResult
          ) => {
            resolve(chooseImageRes)
          }
        })
      } else {
        uni.chooseFile({
          count: count,
          extension: extension,
          success: (chooseFileRes: UniApp.ChooseFileSuccessCallbackResult) => {
            // errMsg: "chooseFile:ok"
            // tempFilePaths: (...)
            // tempFiles:
            resolve(chooseFileRes)
          }
        })
      }
    })
  }
  // #endif
  const upload = (): Promise<
    | UniApp.ChooseImageSuccessCallbackResult
    | UniApp.ChooseFileSuccessCallbackResult
    | UniApp.ChooseMessageFileSuccessCallbackResult
  > => {
    // #ifdef MP-WEIXIN
    console.log("MP-WEIXIN")
    return weixinUpload()
    // #endif
    // #ifdef H5
    console.log("H5")
    return h5Upload()
    // #endif
  }

  // 一次上传多个
  // const uploadAndJudgeSizeMultiple = (): Promise<(File & UniApp.ChooseFileSuccessCallbackResultFile)[]> => {
  //   return upload().then((chooseFileRes) => {
  //     // name: "submitted.png"
  //     // size: 27478
  //     // type: "image/png"
  //     const imageArr: (File & UniApp.ChooseFileSuccessCallbackResultFile)[] = []
  //     const chooseTempFiles = (chooseFileRes.tempFiles as (File & UniApp.ChooseFileSuccessCallbackResultFile)[]).slice(
  //       0,
  //       count
  //     )
  //     for (let i = 0; i < chooseTempFiles.length; i++) {
  //       const tempFile = chooseTempFiles[i]
  //       // const tempFilePath = tempFile.path
  //       console.log("chooseFileRes:", chooseFileRes)
  //       // const type = tempFile.type.split("/")[1]
  //       const nameArr = tempFile.name.split(".")
  //       const type: PropertyFileFormatType = nameArr[nameArr.length - 1] as PropertyFileFormatType
  //       // 文件资产类型 1-文本;2-图片;3-视频;4-音频
  //       // export type PropertyFileType = 1 | 2 | 3 | 4
  //       if (fileJudge(type, tempFile.size)) {
  //         imageArr.push(tempFile)
  //       }
  //     }
  //     return imageArr
  //   })
  const uploadAndJudgeSize = (): Promise<
    File & UniApp.ChooseFileSuccessCallbackResultFile
  > => {
    return upload().then((chooseFileRes) => {
      // name: "submitted.png"
      // size: 27478
      // type: "image/png"
      const tempFile = chooseFileRes.tempFiles[0]
      // const tempFilePath = tempFile.path
      console.log("chooseFileRes:", chooseFileRes)
      console.log("tempFile.path:", tempFile.path)
      // const type = tempFile.type.split("/")[1]
      let name = ""
      // #ifdef H5
      name = tempFile.name
      // #endif
      // #ifdef MP-WEIXIN
      name = tempFile.path
      // #endif
      const nameArr: any[] = name.split(".")
      const type: PropertyFileFormatType = nameArr[nameArr.length - 1]
      // 文件资产类型 1-文本;2-图片;3-视频;4-音频
      // export type PropertyFileType = 1 | 2 | 3 | 4
      if (fileJudge(type, tempFile.size)) {
        return tempFile
      }
    })
  }

  return {
    upload,
    fileJudge,
    uploadAndJudgeSize,
    extension
  }
}
