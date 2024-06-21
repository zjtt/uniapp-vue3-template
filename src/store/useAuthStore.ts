import { defineStore } from "pinia"
import { reactive } from "vue"
import type { Nullable } from "@/typings"
class UserInfo {
  // 帐号
  loginId: Nullable<string> = null
  // 手机号
  mobile: Nullable<string> = null
  // 名称
  nickName: Nullable<string> = null
  // uuid
  uuid: Nullable<string> = null
}

interface AuthStore {
  isReal: Nullable<null>
  isLogin: Nullable<null>
  // 鉴权令牌
  userInfo: Nullable<UserInfo>
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAuthStore = defineStore(
  "useAuthStore",
  () => {
    const authState: AuthStore = reactive({
      isLogin: null,
      isReal: null,
      userInfo: null
    })
    const logout = () => {
      authState.userInfo = null
      authState.isReal = null
      authState.isLogin = null
    }
    return { authState, logout }
  },
  {
    persist: {
      key: "authState",
      paths: ["authState.userInfo"]
    }
  }
)
