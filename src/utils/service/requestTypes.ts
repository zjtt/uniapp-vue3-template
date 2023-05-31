// abortRequest 取消请求配置，可选值：same(取消相同请求)、all(取消所有请求)、none(不取消请求)
export type TypeAbortRequest = "same" | "all" | "none"

export interface BaseResponse<T = any> {
  status: number
  success: boolean
  data: T
  msg?: string
}

export interface HttpOption<D = any> {
  url: string
  data?: D
  method?: string
  dataType?: string
  headers?: any
  abortRequest?: TypeAbortRequest
  showLoading?: boolean
  showToast?: boolean
}
