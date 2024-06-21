import type { MockMethod } from "vite-plugin-mock"
export default [
  // {
  //   url: "/auth-mini-app/select1",
  //   method: "post",
  //   response: ({ body, query }) => {
  //     // console.log("body>>>>>>>>", body)
  //     // console.log("query>>>>>>>>", query)
  //     return {
  //       success: true,
  //       status: 0,
  //       msg: "mock成功",
  //       data: [
  //         {
  //           authBannerId: 80,
  //           bannerUrl: "https://xxx.jpeg",
  //           bannerType: 2,
  //           openType: 2,
  //           detailUrl: "https://xxx.neibu.com",
  //           detailTitle: "测试",
  //           hotYn: "N",
  //           beginTime: "2023-07-05T16:17:26",
  //           endTime: "2023-07-29T00:00:00",
  //           bannerStatus: 1,
  //           viewOrderBy: 2,
  //           creater: "system",
  //           createTime: "2023-07-05T16:17:30",
  //           reviser: null,
  //           updateTime: null,
  //           deleted: 0
  //         },
  //         {
  //           authBannerId: 78,
  //           bannerUrl: "xxx.jpeg",
  //           bannerType: 1,
  //           openType: 2,
  //           detailUrl: "https://xxx.neibu.com",
  //           detailTitle: "轮播图",
  //           hotYn: "N",
  //           beginTime: "2023-07-05T15:36:42",
  //           endTime: "2023-09-30T00:00:00",
  //           bannerStatus: 1,
  //           viewOrderBy: 1,
  //           creater: "system",
  //           createTime: "2023-07-05T15:37:03",
  //           reviser: null,
  //           updateTime: "2023-07-05T16:48:17",
  //           deleted: 0
  //         }
  //       ]
  //     }
  //   }
  // }
] as MockMethod[]
