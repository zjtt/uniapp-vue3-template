import axios from "axios"
import type { AxiosInstance, AxiosResponse } from "axios"
import type { HttpOption, BaseResponse } from "./requestTypes"
import { handleRequestConfig } from "./tool"
import { useAxiosCancelToken } from "./AxiosCancelToken"
import { uniAdapter } from "fant-axios-adapter"

// 同一个请求失败后最大重试次数
const MAX_RETRY_NUM = 5
// 所有请求失败最多重试总次数
const MAX_RETRY_TOTAL_NUM = 10
// 是否可以重试开关
const canRetry = true
// 重试次数记录实体
const retryMap: {
  [key: string]: number
} = {}
// 总重试次数
let retryTotalNum = 0
const timeoutMsg = "请求超时，请稍后再试"
const errorDefaultMsg = "服务器开小差了，请稍后再试"

class ApiClient {
  serviceInstance: AxiosInstance

  /**
   * @param baseURL 基础路径
   * @param timeout 超时时间
   */
  constructor({ baseURL = "/", timeout = 15000 }) {
    // #ifdef H5
    //如果是h5端 则请求传过来的地址 不带域名
    // #endif
    //如果非h5端 则将地址改成完整带域名的接口地址
    // #ifndef H5
    // #endif
    // #ifdef MP-WEIXIN
    baseURL = import.meta.env.VITE_BASEURL + baseURL
    // #endif
    this.serviceInstance = axios.create({
      baseURL,
      timeout,
      // withCredentials: true,
      adapter: uniAdapter
    })
  }

  /**
   *
   * @param D 请求数据data的类型
   * @param T 返回数据response.data的类型
   */
  request = <D, T>({
    url,
    data,
    method = "GET",
    dataType,
    headers = {},
    showLoading = true,
    showToast = true,
    abortRequest = "none"
  }: HttpOption<D>) => {
    if (showLoading) {
      uni.showLoading({ title: "加载中...", mask: true })
    }
    const axiosConfig = handleRequestConfig<D>({
      url,
      data,
      method,
      dataType,
      headers
    })

    // 请求拦截器
    this.serviceInstance.interceptors.request.use(
      (config) => {
        useAxiosCancelToken(config, abortRequest)
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const requestOnce = (): Promise<
      AxiosInstance | BaseResponse<T> | undefined
    > => {
      // 添加cancletoken
      return this.serviceInstance
        .request(axiosConfig)
        .then((res: AxiosResponse<BaseResponse<T>>) => {
          if (showLoading) {
            uni.hideLoading()
          }
          // code判断: 200成功,不等于200错误
          if (res.status != 200) {
            uni.showToast({
              title: errorDefaultMsg,
              icon: "none",
              duration: 2500
            })
            return
          }
          const { status, msg } = res.data

          if (+status === 0) {
            // 请求成功
            // 重置retry次数
            if (canRetry && retryMap[url] && retryMap[url] > 0) {
              retryMap[url] = 0
            }
            return res.data
          } else if (+status === 403001) {
            // retry once
            // 少于最高重试次数则再发一次请求
            if (
              canRetry &&
              (!retryMap[url] || retryMap[url] <= MAX_RETRY_NUM) &&
              retryTotalNum <= MAX_RETRY_TOTAL_NUM
            ) {
              retryMap[url] = (retryMap[url] || 0) + 1
              retryTotalNum += 1
              return requestOnce()
            }
          } else if (+status === 1214) {
            // 用户未登录
            // store.commit("clearUserInfo", "1214")
            return
          } else if (showToast) {
            uni.showToast({
              title: msg || timeoutMsg,
              icon: "none",
              duration: 2500
            })
          }
          // 将结果抛出
          return res.data
        })
        .catch((err) => {
          if (showLoading) {
            uni.hideLoading()
          }
          if (err.code === "ERR_CANCELED") {
            throw new Error("取消请求")
          }
          console.log("看看报啥错误了？？？", err)
          if (showToast && err && err.stack.indexOf("timeout") > -1) {
            uni.showToast({
              icon: "none",
              title: timeoutMsg,
              duration: 2500
            })
          } else if (
            showToast &&
            err &&
            err.stack.indexOf("Network Error") > -1
          ) {
            uni.showToast({
              icon: "none",
              title: "前方网络拥挤，请稍后再试",
              duration: 2500
            })
          }
          throw new Error(errorDefaultMsg)
        })
    }
    return requestOnce()
  }
}

export default ApiClient
