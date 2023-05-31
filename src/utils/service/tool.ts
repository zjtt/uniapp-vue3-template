import qs from "qs"
import type { HttpOption } from "./requestTypes"

// 处理请求数据
export const handleRequestConfig = <D>({
  url,
  data,
  method = "GET",
  dataType,
  headers = {}
}: HttpOption<D>) => {
  const commonConfig = {
    platform: 0,
    deviceid: "deviceId",
    ...headers
  }
  let axiosConfig = {}
  method = method.toUpperCase() // 小写改为大写
  if (method === "GET") {
    axiosConfig = {
      url,
      method,
      params: data,
      headers: { ...commonConfig }
    }
  } else if (method === "POST") {
    if (dataType === "json") {
      axiosConfig = {
        url,
        method,
        headers: { ...commonConfig },
        data: data
      }
    } else if (dataType === "form") {
      axiosConfig = {
        url,
        method,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          ...commonConfig
        },
        data: qs.stringify(data)
      }
    } else if (dataType === "formData") {
      // 图片信息提交需要这个headers 单独出来一个
      axiosConfig = {
        url,
        method,
        headers: { "content-type": "multipart/form-data", ...commonConfig },
        data: data
      }
    } else {
      axiosConfig = {
        url,
        method,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          ...commonConfig
        },
        data: qs.stringify(data)
      }
    }
  }
  return axiosConfig
}
