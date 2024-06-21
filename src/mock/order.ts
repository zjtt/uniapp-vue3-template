import type { MockMethod } from "vite-plugin-mock"
export default [
  {
    url: "/auth-mini-app/member/order/list",
    method: "post",
    response: ({ body, query }) => {
      // console.log("body>>>>>>>>", body)
      // console.log("query>>>>>>>>", query)
      return {
        success: true,
        status: 0,
        msg: "操作成功",
        data: {
          total: 33,
          pages: 4,
          current: 1,
          size: 1,
          records: [
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            },
            {
              productId: 180,
              propertyId: 430,
              sellStatus: 1,
              propertyType: 1,
              propertyFileType: 2,
              propertyFileFormat: "jpg",
              name: "海贼王路飞",
              amount: 1.0,
              sellerNickName: "我是一个昵称"
            }
          ]
        }
      }
    }
  }
] as MockMethod[]
