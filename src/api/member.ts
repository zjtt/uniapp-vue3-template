import ApiClient from "@/utils/service"
import type { BaseResponse } from "@/utils/service/requestTypes"
import type { PageData, PageResponseData } from "@/typings"
export const request = new ApiClient({
  baseURL: "/auth-mini-app",
  timeout: 15000
}).request

export interface RightsOrderType {
  expireTime: string
  orderNo: string
  orderTime: string
  packageContent: string
  packageName: string
  packagePrice: number
  payAmount: number
  payOrderId: string
  payOrderState: 1
  payTime: string
  userAvatar: string
  userNick: string
}

export const rightsOrder = function (
  data: PageData
): Promise<BaseResponse<PageResponseData<RightsOrderType[]>> | undefined> {
  return request<PageData, PageResponseData<RightsOrderType[]>>({
    url: `/member/order/list`,
    method: "POST",
    data,
    dataType: "json",
    showLoading: false,
    abortRequest: "same"
  })
}
