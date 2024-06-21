import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia"

// 获取1KB等于多少（字节, Byte)
// Linux和macOS X采用国际单位制标准命名。
// 但是，Windows xp以下的系统仍然错误地将KiB标记为KB。由于系统仍然以旧的方式记录数据容量，
// 导致混淆已经普遍化，通常Kilobyte也可指Kibibyte，即1KB = 1024B。
export const getBiteUnit = () => {
  const tmpiniaStore = useTmpiniaStore()
  // ios、android、mac（3.1.10+）、windows（3.1.10+）、linux（3.1.10+）
  const numObj = {
    macos: 1000,
    windows: 1024,
    android: 1000,
    ios: 1000,
    linux: 1000
  }
  const num = numObj[tmpiniaStore.tmStore.os] || 1000
  return num
}

// 格式化大小
export const getFileSizeStr = (size: number) => {
  const num = getBiteUnit()
  if (size < num * num) {
    // 小于1M
    return (size / num).toFixed(2) + "KB"
  } else {
    return (size / num / num).toFixed(2) + "MB"
  }
}

// 复制逻辑
export const copyText = (val: string) => {
  uni.setClipboardData({
    data: val,
    success() {
      uni.showToast({
        icon: "success", // success / none / loading 3个有效参数
        title: "复制成功",
        duration: 2000
      })
    },
    fail() {
      uni.showToast({
        icon: "none", // success / none / loading 3个有效参数
        title: "复制失败",
        duration: 2000
      })
    }
  })

/**
 * 时间戳转换
 * @param {*} timestamp
 * 返回yyyy-MM-dd HH:mm:ss
 */
export const formatDateTime = (timestamp, type = "1") => {
  // new Date('2022-09-18'.replace(/-/g, "/"))
  // const date = new Date(timestamp.replace(/-/g, "/"))
  const temp = isNaN(Number(timestamp)) ? timestamp : +timestamp
  const date = new Date(temp)
  const y = date.getFullYear()
  let m: string | number = date.getMonth() + 1
  m = m < 10 ? "0" + m : m
  let d: string | number = date.getDate()
  d = d < 10 ? "0" + d : d
  let h: string | number = date.getHours()
  h = h < 10 ? "0" + h : h
  let minute: string | number = date.getMinutes()
  let second: string | number = date.getSeconds()
  minute = minute < 10 ? "0" + minute : minute
  second = second < 10 ? "0" + second : second
  if (type === "1") {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
  } else if (type === "2") {
    return y + "年" + m + "月" + d + "日" + " " + h + ":" + minute + ":" + second
  } else if (type === "3") {
    return m + "月" + d + "日"
  } else {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
  }
}

/*
防抖
防抖原理：在一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
	@param {Function} func 要执行的回调函数
	@param {Number} wait 延迟的时间
	@param{Boolean} immediate 是否要立即执行
*/
export function debounce(func: (...args) => void, wait = 500, immediate = false) {
  let timeout
  return (...args) => {
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout)
    // 立即执行，此类情况一般用不到
    if (immediate) {
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      typeof func === "function" && func(...args)
    } else {
      // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
      timeout = setTimeout(() => {
        typeof func === "function" && func(...args)
      }, wait)
    }
  }
}

/**
 * 节流
	节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */

export function throttle(func: (...args) => void, wait = 500, immediate = true) {
  let timesr: any = NaN
  let throttleFlag: boolean
  return (...args) => {
    if (immediate) {
      if (!throttleFlag) {
        throttleFlag = true
        // 如果是立即执行，则在wait毫秒内开始时执行
        typeof func === "function" && func(...args)
        timesr = setTimeout(() => {
          throttleFlag = false
        }, wait)
      }
    } else {
      if (!throttleFlag) {
        throttleFlag = true
        // 如果是非立即执行，则在wait毫秒内的结束处执行
        timesr = setTimeout(() => {
          throttleFlag = false
          typeof func === "function" && func(...args)
        }, wait)
      }
    }
  }
}

/*
 * 获取url字符串参数
 */
export const getRequestParameters = (locationhref): any => {
  const href = locationhref || ""
  const theRequest = {}
  const str = href.split("?")[1]
  if (str != undefined) {
    const strs = str.split("&")
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1]
    }
  }
  return theRequest
}

/**
 * 获取图片宽高
 * url 图片地址
 */
export function getImageSize(url) {
  return new Promise(function (resolve, reject) {
    const image = new Image()
    image.onload = function () {
      resolve({
        width: image.width,
        height: image.height
      })
    }
    image.onerror = function () {
      reject(new Error("error"))
    }
    image.src = url
  })
}

export const removeHidden = () => {
  // #ifdef H5
  document.body.style.overflow = "visible" // 禁止body滚动
  // #endif
}
export const addHidden = () => {
  // #ifdef H5
  document.body.style.overflow = "hidden" // 禁止body滚动
  // #endif
}
