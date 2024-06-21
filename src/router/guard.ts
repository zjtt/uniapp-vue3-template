import { useAuthStore } from "@/store/useAuthStore"
import type { DiyRoute } from "@/typings"
import type { Router } from "uni-mini-router/lib/interfaces"
import qs from "qs"

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach(async (to: DiyRoute, from: DiyRoute, next) => {
    const { authState } = useAuthStore()
    console.log("beforeEach：", from.name + "----" + to.name)
    if (to?.meta?.needLogin && !authState.isLogin && to.name !== "Login") {
      // 未登录
      next({
        path: "pages/login/Login"
      })
      // next(false)
      // uni.navigateTo({ url: "pages/login/Login?" + qs.stringify(redirect) })
    } else if (authState.isLogin && to.name === "Login") {
      // 已登录去登录页面
      next({ name: "Home", navType: "replaceAll" })
    } else if (
      authState.isLogin &&
      realPageArr.includes(to.name || "") &&
      authState.isReal
    ) {
      // 已登录，已实名认证，去实名认证页面
      next({ name: "Home", navType: "replaceAll" })
    } else if (authState.isLogin && to?.meta?.needReal) {
      // 登录后去需要实名认证的页面
      if (authState.isReal) {
        next()
      } else if (authState.isReal === null) {
        console.log("guard:authState.isReal：", authState.isReal)
        if (authState.isReal) {
          next()
        } else {
          // 已登录未认证身份
          next({
            path: "pages/real/Index"
          })
        }
      } else {
        // 已登录未认证身份
        next({
          path: "pages/real/Index"
        })
      }
    } else {
      if (to.name === from.name && to.name === "Login") {
        next(false)
      } else {
        next(true)
      }
    }
    // console.log("to:", to)
    // console.log("from:", from)
    // next入参 false 以取消导航
  })
}
const realPageArr = ["Personal"]

function createAfterEachGuard(router: Router) {
  // 刷新的时候没走beforeEach,所以这里还要判断
  router.afterEach(async (to: DiyRoute, from: DiyRoute) => {
    console.log("afterEach：", from.name + "----" + to.name)
    const { authState } = useAuthStore()
    if (to?.meta?.needLogin && !authState.isLogin && to.name !== "Login") {
      router.replace({
        path: "pages/login/Login"
      })
    } else if (authState.isLogin && to.name === "Login") {
      // 已登录去登录页面
      router.replaceAll({ name: "Home" })
    } else if (
      authState.isLogin &&
      realPageArr.includes(to.name || "") &&
      authState.isReal
    ) {
      // 已登录，已实名认证，去实名认证页面
      router.replaceAll({ name: "Home" })
    } else if (authState.isLogin && to?.meta?.needReal) {
      if (!authState.isReal) {
        if (authState.isReal === null) {
          console.log("guard:authState.isReal：", authState.isReal)
          if (!authState.isReal) {
            // 已登录未认证身份
            router.replace({
              path: "pages/real/Index"
            })
          }
        } else {
          // 已登录未认证身份
          router.replace({
            path: "pages/real/Index"
          })
        }
      }
    }
  })
}
