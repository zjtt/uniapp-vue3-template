// #ifdef H5
import wx from "weixin-js-sdk"
import qs from "qs"
import type { BaseResponse } from "@/utils/service/requestTypes"
// #endif

export interface WxShareConfig {
  appid: string
  timestamp: number // 时间戳
  noncestr: string
  signature: string
  jsapi_ticket: string
  url: string
}
// #ifdef H5
// 判断是否在微信内打开H5
export const isWechat = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  const temp = ua.match(/micromessenger/i)
  if ((Array.isArray(temp) && temp[0]) === "micromessenger") {
    // console.log(‘是微信客户端‘)
    return true
  } else {
    // console.log(‘不是微信客户端‘)
    return false
  }
}

// H5跳转小程序页面
export const redirectToMpPage = (url: string, params?: object) => {
  if (wx && (wx as any).miniProgram) {
    // const stringParmes = JSON.stringify(parmes) // h5活动需回传的参数
    ;(wx as any).miniProgram.redirectTo({
      // url: `${url}?redirectURL=${encodeURIComponent(h5Url)}&parmes=${encodeURIComponent(stringParmes)}`
      url: params ? `${url}?${qs.stringify(params)}` : url,
      success() {
        console.log("跳转成功")
      },
      fail() {
        console.log("跳转失败")
      }
    })
  }
}

// webview前往小程序页面
export const goToMpPage = (url: string, params?: object) => {
  if (wx && (wx as any).miniProgram) {
    ;(wx as any).miniProgram.navigateTo({
      // url: `${url}?redirectURL=${encodeURIComponent(h5Url)}&parmes=${encodeURIComponent(stringParmes)}`
      url: params ? `${url}?${qs.stringify(params)}` : url,
      success() {
        console.log("跳转成功")
      },
      fail() {
        console.log("跳转失败")
      }
    })
  }
}

// webview返回上一页面，返回小程序
export const goToMpBack = () => {
  if (wx && (wx as any).miniProgram) {
    // const stringParmes = JSON.stringify(parmes) // h5活动需回传的参数
    // const h5Url = "https://xxxx.com.cn/wxapp/nev-prod/3d/" // h5活动需回传的h5活动地址
    ;(wx as any).miniProgram.navigateBack({
      url: "",
      success() {
        console.log("返回成功")
      },
      fail() {
        console.log("返回失败")
      }
    })
  }
}

// 设置webview页面标题
export const setWebviewTitle = (title: string) => {
  isMiniProgram().then((flag) => {
    // if (flag && wx && (wx as any).setNavigationBarTitle) {
    //   (wx as any).setNavigationBarTitle({
    //     title
    //   })
    // }
    if (flag) {
      document.title = title
    }
  })
}

// webview中H5向小程序发送消息，会在特定时机（小程序后退、组件销毁、分享）触发组件的 message 事件;
export const postMessageToMP = (parmes) => {
  if (wx && (wx as any).miniProgram) {
    ;(wx as any).miniProgram.postMessage({
      //这里一定要将数据放在dada中
      data: {
        message: parmes
      }
    })
  }
}

// 判断h5是否在小程序环境内
export const isMiniProgram = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isWechat()) {
      resolve(false)
      return
    }
    if (wx && (wx as any).miniProgram) {
      //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
      ;(wx as any).miniProgram.getEnv(function (res) {
        console.log("(wx as any).miniProgram:", res)
        if (res.miniprogram) {
          //小程序环境 ,在此进行相关逻辑处理
          resolve(true)
        } else {
          //非小程序环境下逻辑
          console.log("不在小程序中")
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}

// 分享成功回调
function doShareDone() {
  console.log("分享成功")
}
// 取消分享回调
function doShareCancel() {
  console.log("取消了分享")
}

// 微信h5分享
export const wxShare = ({
  url = import.meta.env.VITE_API_URL,
  title = "产品名字",
  desc = "产品描述",
  imgUrl = "static/images/logo.png"
}) => {
  if (!isWechat()) return
  console.log("测试wxShare!!!")
  const shareUrl = url
  const shareTitle = title
  const shareDesc = desc
  const shareImgUrl = imgUrl

  uni.request({
    url: "https://xxx.neibu.com/wxshare",
    method: "GET",
    data: {
      url: shareUrl
    }, //这里不是统一的
    success: (res: UniApp.RequestSuccessCallbackResult) => {
      console.log("aaaaa", res)
      const result = res.data as BaseResponse<WxShareConfig>
      if (result.status !== 1) {
        uni.showToast({
          title: result.msg,
          icon: "none"
        })
        return
      }
      ;(wx as any).config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.data.appid, // 必填，公众号的唯一标识
        timestamp: result.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.data.noncestr, // 必填，生成签名的随机串
        signature: result.data.signature, // 必填，签名
        jsApiList: [
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表
      })
      setTimeout(() => {
        ;(wx as any).ready(function () {
          // 分享给好友
          ;(wx as any)
            .updateAppMessageShareData({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: shareUrl, // 分享链接
              imgUrl: shareImgUrl, // 分享图标
              success: function () {
                doShareDone()
              },
              cancel: function () {
                doShareCancel()
              }
            })(
              // 分享到朋友圈
              wx as any
            )
            .updateTimelineShareData({
              title: shareTitle, // 分享标题
              link: shareUrl, // 分享链接
              imgUrl: shareImgUrl, // 分享图标
              success: function () {
                doShareDone()
              },
              cancel: function () {
                doShareCancel()
              }
            })
        })
      }, 300)
    }
  })
}
// #endif

// #ifdef MP-WEIXIN
/**
 * 对比小程序基础库版本
 * @param v1 string
 * @param v2 string
 */
export const compareVersion = (v1str: string, v2str: string) => {
  const v1 = v1str.split(".")
  const v2 = v2str.split(".")
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push("0")
  }
  while (v2.length < len) {
    v2.push("0")
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
// #endif

// #ifdef MP-WEIXIN
// 统一配置微信小程序分享内容
// 分享给朋友，按钮或右上角转发给朋友，只有定义了onShareAppMessage事件处理函数，右上角菜单才会显示“转发”按钮
export const getMpShareFriend = (path?: string, imageUrl?: string) => {
  interface ShareFriendData {
    title?: string
    path?: string // 默认值当前页面 path ，必须是以 / 开头的完整路径
    imageUrl?: string
    promise?: Promise<ShareFriendData>
  }

  let tempPath = ""
  if (path) {
    tempPath = path.includes("?")
      ? path + "&channel=mp&share=1"
      : path + "?channel=mp&share=1"
  }
  const obj: ShareFriendData = {
    title: "分享标题",
    path: tempPath ? tempPath : "/pages/index/Index?channel=mp&share=1",
    imageUrl: "static/images/share-mp.png" // 默认值使用默认截图
  }
  imageUrl && (obj.imageUrl = imageUrl)
  return obj
}

// 右上角分享到朋友圈，只有定义了onShareTimeline事件处理函数，右上角菜单才会显示“分享到朋友圈”按钮
export const getMpShareFriends = (query?: string, imageUrl?: string) => {
  interface ShareFriendsData {
    title?: string
    query?: string
    imageUrl?: string
  }
  const obj: ShareFriendsData = {
    title: "小程序名称", // 默认值当前小程序名称
    // query: "" // 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分，
    // 不支持自定义页面路径，默认值为当前页面路径携带的参数
    imageUrl: "static/images/share/logo.png" // 默认使用小程序 Logo
  }
  const tempQuery = query ? query + "&channel=mp&share=1" : "channel=mp&share=1"
  obj.query = tempQuery
  imageUrl && (obj.imageUrl = imageUrl)
  return obj
}

// 获取相册权限
export const getWritePhotosAlbumRight = () => {
  // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
  ;(wx as any).showModal({
    title: "提示",
    content: "需要您授权保存相册",
    showCancel: false,
    success: () => {
      ;(wx as any).openSetting({
        success(settingdata) {
          console.log("settingdata", settingdata)
          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
            ;(wx as any).showModal({
              title: "提示",
              content: "获取权限成功,再次点击下载即可保存",
              showCancel: false
            })
          } else {
            ;(wx as any).showModal({
              title: "提示",
              content: "获取权限失败，将无法保存到相册",
              showCancel: false
            })
          }
        },
        fail(failData) {
          console.log("failData", failData)
        },
        complete(finishData) {
          console.log("finishData", finishData)
        }
      })
    }
  })
}

// 图片保存相册
export const saveImageToPhotosAlbum = (filePath: string) => {
  ;(wx as any).saveImageToPhotosAlbum({
    filePath,
    success: function (data) {
      console.log("saveImageToPhotosAlbum-success：", data)
      // {errMsg: "saveVideoToPhotosAlbum:ok"}
      uni.showToast({
        title: "保存成功"
      })
    },
    fail: function (err) {
      console.log("saveImageToPhotosAlbum-err：", err)
      if (
        err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
        err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
        err.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
      ) {
        getWritePhotosAlbumRight()
      } else {
        uni.showToast({
          icon: "none",
          title: "下载失败"
        })
      }
    }
    // complete(res) {
    // uni.hideLoading()
    // }
  })
}

// 视频保存相册
export const saveVideoToPhotosAlbum = (filePath: string) => {
  ;(wx as any).saveVideoToPhotosAlbum({
    filePath: filePath,
    success: function (data) {
      console.log("saveVideoToPhotosAlbum-success：", data)
      uni.showToast({
        title: "保存成功"
      })
    },
    fail: function (err) {
      console.log("saveVideoToPhotosAlbum-err：", err)
      if (
        err.errMsg === "saveImageToPhotosAlbumsAlbum:fail:auth denied" ||
        err.errMsg === "saveImageToPhotosAlbumsAlbum:fail auth deny" ||
        err.errMsg === "saveImageToPhotosAlbumsAlbum:fail authorize no response"
      ) {
        getWritePhotosAlbumRight()
      } else {
        uni.showToast({
          icon: "none",
          title: "下载失败"
        })
      }
    },
    complete(res) {
      uni.hideLoading()
    }
  })
}

// 文本打开保存
export const saveDocument = (filePath: string) => {
  ;(wx as any).showModal({
    title: "提示",
    content: "文件即将打开，请点击右上角按钮进行保存",
    showCancel: false,
    success: (modalSuccess) => {
      console.log("showModal-success：", modalSuccess)
      if (modalSuccess.confirm) {
        // 支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
        ;(wx as any).openDocument({
          filePath,
          showMenu: true, //关键点
          success: function (res) {
            console.log("打开文档成功：", res)
          },
          fail() {
            uni.showToast({
              icon: "none",
              title: "下载失败"
            })
          }
        })
      }
    }
  })
}
