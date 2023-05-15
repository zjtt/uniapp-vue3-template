import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
interface ResponseData {
  code: number
  data: any
  message: string
}
const instance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000
})
// 请求拦截器
instance.interceptors.request.use(
  // (config: AxiosRequestConfig) => {
  (config) => {
    // 在发送请求前做些什么
    // 如果有 token，可以在这里添加到请求头中
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  // (response: AxiosResponse<ResponseData>) => {
  (response) => {
    // 在这里对响应数据做些什么
    const res = response.data
    if (res.code !== 200) {
      // 根据实际情况处理错误信息
      console.error(res.message)
    }
    return res
  },
  (error) => {
    // 处理响应错误
    console.error(error)
    return Promise.reject(error)
  }
)

export default function request<T>(config: AxiosRequestConfig): Promise<T> {
  return instance
    .request<ResponseData>(config)
    .then((res) => {
      return res.data.data as T
    })
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
}
