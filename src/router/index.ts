import { createRouter } from "uni-mini-router"
const router = createRouter({
  routes: [...ROUTES] // 路由表信息
})

router.beforeEach((to, from, next) => {
  // next入参 false 以取消导航
  next(true)
})

export default router
