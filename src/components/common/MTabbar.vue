<template>
  <tm-tabbar :autoSelect="false" v-model:active="acc">
    <tm-tabbar-item
      @click="acc = 0"
      activeColor="orange"
      count="HOT"
      open-type="reLaunch"
      text="首页"
      icon="tmicon-collection-fill"
    ></tm-tabbar-item>
    <tm-tabbar-item
      @click="acc = 1"
      activeColor="orange"
      text="表单"
      icon="tmicon-cog-fill"
    ></tm-tabbar-item>
    <tm-tabbar-item
      @click="acc = 2"
      :shadow="2"
      :beforeClick="laodingfun"
      :data="'中间项'"
      btn-top
      fontColor="white"
      activeColor="white"
      linear="top"
      linearDeep="accent"
      color="yellow"
      icon="tmicon-plus"
    ></tm-tabbar-item>
    <tm-tabbar-item
      @click="acc = 3"
      activeColor="orange"
      url="/pages/fankui/index"
      text="反馈分类"
      unicon="tmicon-like"
      icon="tmicon-heart-fill"
    ></tm-tabbar-item>
    <tm-tabbar-item
      @click="acc = 4"
      activeColor="orange"
      :count="8"
      url="/pages/chart/index"
      active
      text="图表中心"
      unicon="tmicon-account"
      icon="tmicon-userplus-fill"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue"
import { onShow, onLoad } from "@dcloudio/uni-app"
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue"
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"
const acc = ref(1)
function laodingfun(val) {
  return new Promise((res) => {
    setTimeout(function () {
      console.log("选中了：", val)
      res(true)
    }, 2000)
  })
}
</script>
