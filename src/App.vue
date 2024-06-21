<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"
onLaunch(() => {
  console.log("onLaunch")
  // #ifdef MP-WEIXIN
  // 冷启动更新小程序 begin
  if (uni.canIUse("getUpdateManager")) {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log("onCheckForUpdate:", res)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          uni.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
          })
        })
      }
    })
  } else {
    //如果小程序需要在最新的微信版本体验，如下提示
    uni.showModal({
      title: "更新提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    })
  }
  // #endif
})
onShow(() => {
  console.log("App Show")
})
onHide(() => {
  console.log("App Hide")
})
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */

/* #ifdef APP-NVUE */
@import url("./tmui/scss/nvue.css");

/* #endif */

/* #ifndef APP-NVUE */
@import url("./tmui/scss/noNvue.css");

/* #endif */
</style>
