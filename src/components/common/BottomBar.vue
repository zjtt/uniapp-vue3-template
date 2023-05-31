<template>
  <tm-tabbar :autoSelect="false" :active="useBottomBarState.selectedIndex">
    <tm-tabbar-item
      v-for="(tabBar, index) in tabBarlist"
      :key="tabBar.url"
      @click="changeBottomBarIndex(index)"
      :fontColor="tabBar.fontColor"
      :activeColor="tabBar.activeColor"
      :iconSize="tabBar.iconSize"
      :textSize="tabBar.textSize"
      :url="tabBar.url"
      :text="tabBar.text"
      :unicon="tabBar.unicon"
      :icon="tabBar.icon"
      :open-type="tabBar.openType"
    ></tm-tabbar-item>
  </tm-tabbar>
</template>
<script lang="ts" setup>
import { onShow, onLoad } from "@dcloudio/uni-app"
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue"
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"
import { useBottomBarStore } from "@/store"
const { useBottomBarState, changeBottomBarIndex } = useBottomBarStore()
type OpenTypeType = "switchTab" | "reLaunch"
const tabBarlist = [
  {
    fontColor: "#929292",
    activeColor: "#2F7CFC",
    iconSize: 56,
    textSize: 24,
    url: "/pages/index/index",
    openType: "reLaunch" as OpenTypeType,
    text: "首页",
    unicon: "",
    icon: ""
  },
  {
    fontColor: "#929292",
    activeColor: "#2F7CFC",
    iconSize: 56,
    textSize: 24,
    url: "/pages/example/poster/index",
    openType: "reLaunch" as OpenTypeType,
    text: "海报首页",
    unicon: "",
    icon: ""
  },
  {
    fontColor: "#929292",
    activeColor: "#2F7CFC",
    iconSize: 56,
    textSize: 24,
    count: "8",
    url: "/pages/example/poster/jsonPoster",
    openType: "reLaunch" as OpenTypeType,
    text: "我的",
    unicon: "",
    icon: ""
  }
]
</script>
