import ApiClient from "@/utils/service"
const request = new ApiClient({
  baseURL: "/activity",
  timeout: 15000
}).request

interface GetList2Data {
  pageNo: number
  pageSize: number
}

interface GetList2ResponseData {
  token: string
}

export const getList2 = function (data: GetList2Data) {
  return request<GetList2Data, GetList2ResponseData>({
    url: `/product/list`, //请求url
    method: "POST", //请求方式
    dataType: "json",
    abortRequest: "same",
    data
  })
}
