import { AxiosPromise, AxiosRequestConfig, AxiosResponseHeaders } from "axios"

// 解决uniapp 适配axios请求，避免报adapter is not a function错误
/**
 * 全量替换url中的字符
 * @param str 原始字符串
 * @param find 要查找的字符串
 * @param replace 要替换的字符串
 * @returns
 */
function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace)
}

/**
 * 去除拼接url产生的多余的/
 * @param url 目标路径
 */
export function beautifyUrl(url: string) {
  url = replaceAll(url, "//", "/") // 先替换所有'//'为'/'
  url = replaceAll(url, "https:/", "https://") // 再将https补全'//'
  url = replaceAll(url, "http:/", "http://") // 再将http补全'//'
  return url
}

/**
 * 获取url参数
 * @param path 完整路径
 * @returns
 */
export function getParams(path: string) {
  const params: Map<string, string> = new Map()
  const pathArray: string[] = path.split("?") // 路径根据？拆分为2部分
  let paramString = "" // 参数字符串
  let paramArrary: string[] = [] // 参数数组
  if (pathArray.length > 1) {
    paramString = pathArray[1]
  }
  paramArrary = paramString.split("&")
  for (let index = 0; index < paramArrary.length; index++) {
    if (paramArrary[index].split("=").length === 2) {
      params.set(paramArrary[index].split("=")[0], paramArrary[index].split("=")[1])
    }
  }
  return params
}

/**
 * 设置参数
 * @param path 路径（无参数）
 * @param params （参数）
 * @returns
 */
export function setParams(path: string, params: Map<string, string>) {
  params.forEach((value: string, key: string) => {
    if (path.indexOf("?") > -1) {
      path = path + `&${key}=${value}`
    } else {
      path = path + `?${key}=${value}`
    }
  })
  return path
}

export const uniAdapter = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const params = typeof config.params === "object" ? config.params : {}
    let url: string = beautifyUrl(`${config.baseURL || ""}/${config.url || ""}`)
    url = setParams(url, new Map(Object.entries(params)))
    const requestOptions: UniNamespace.RequestOptions = {
      method:
        config.method !== undefined
          ? (config.method!.toUpperCase() as
              | "OPTIONS"
              | "GET"
              | "HEAD"
              | "POST"
              | "PUT"
              | "DELETE"
              | "TRACE"
              | "CONNECT")
          : undefined,
      url: url,
      header: { ...config.headers },
      timeout: config.timeout,
      data: config.data || {},
      success(res) {
        const response: any = {
          data: res.data,
          status: res.statusCode,
          headers: res.header as AxiosResponseHeaders,
          config: config
        }
        if (res.statusCode == 0 || res.statusCode == 200) {
          resolve(response)
        } else {
          reject(response)
        }
      },
      fail(res) {
        const response: any = {
          ...res,
          status: (res as any).statusCode,
          statusText: res.errMsg || "",
          config: config
        }
        reject(response)
      }
    }
    let requestTask: any = uni.request(requestOptions)
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!requestTask) {
          return
        }
        // 取消请求
        requestTask.abort()
        reject(cancel)
        requestTask = null
      })
    }
  })
}
