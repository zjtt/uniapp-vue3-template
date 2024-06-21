import { createRouter } from "uni-mini-router"
import { createRouterGuard } from "./guard"

const router = createRouter({
  // h5: {
  //   mode: "history",
  //   base: "/front/"
  // },
  routes: [...ROUTES] // 路由表信息
})

createRouterGuard(router)

export default router
