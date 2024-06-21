/**
 * 倒计时
 */
import { reactive, onUnmounted, toRef } from "vue"
import { checkTime } from "@/utils"
export const useCountDown = () => {
  let timer: null | NodeJS.Timeout = null
  const data = reactive({
    leftTime: 0,
    timeStr: "", // 倒计时
    countIndex: 1, // 倒计时任务执行次数
    timeout: 1000, // 触发倒计时任务的时间间隙
    startCountTime: 0 // 开始计时的时间
  })

  const resetCountDown = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    data.startCountTime = 0 // 开始计时的时间
    data.countIndex = 1
    data.leftTime = 0
    data.timeStr = ""
  }

  // 执行倒计时
  const getDateDiff = (interval) => {
    if (data.leftTime <= 0) {
      resetCountDown()
      return
    }
    const days = Math.floor(data.leftTime / 1000 / 60 / 60 / 24)
    let hours = "" + Math.floor((data.leftTime / 1000 / 60 / 60) % 24)
    let minutes = "" + Math.floor((data.leftTime / 1000 / 60) % 60)
    let seconds = "" + Math.floor((data.leftTime / 1000) % 60)
    //调用checkTime方法将数字小于10的在前面补0
    hours = checkTime(hours)
    minutes = checkTime(minutes)
    seconds = checkTime(seconds)
    if (days > 0) {
      data.timeStr = days + "天 " + hours + ":" + minutes + ":" + seconds
    } else {
      data.timeStr = hours + ":" + minutes + ":" + seconds
    }

    data.leftTime = data.leftTime - 1000
    timer = setTimeout(() => {
      const endTime = new Date().getTime()
      // 偏差值，现在的时间减去应该的时间
      const deviation = endTime - (data.startCountTime + data.countIndex * data.timeout)
      // console.log(`${data.countIndex}: 偏差${deviation}ms`);
      data.countIndex++
      getDateDiff(data.timeout - deviation)
    }, interval)
  }

  const initCountDown = (leftTime) => {
    resetCountDown()
    data.startCountTime = new Date().getTime() // 开始计时的时间
    data.leftTime = leftTime
    getDateDiff(data.timeout)
  }

  onUnmounted(() => {
    resetCountDown()
  })

  return {
    initCountDown,
    resetCountDown,
    timeStr: toRef(data, "timeStr"),
    leftTime: toRef(data, "leftTime")
  }
}
