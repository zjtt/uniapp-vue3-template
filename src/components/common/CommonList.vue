<template>
  <mescroll-body
    ref="mescrollRef"
    @init="mescrollInit"
    @down="downCallback"
    :down="orderDownOption"
    :top="topOffset"
    :bottom="bottomOffset"
    :up="orderUpOption"
    @up="upCallback"
    :height="props.height"
    :bottombar="bottombar"
  >
    <slot></slot>
  </mescroll-body>
  <!-- :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" -->
</template>

<script setup lang="ts">
import MescrollBody from "@/components/mescroll-uni/components/mescroll-body/mescroll-body.vue"
import useMescroll from "@/components/mescroll-uni/hooks/useMescroll.js"
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app"
import type { MescrollType } from "@/typings"
const mescrollRef = ref<InstanceType<typeof MescrollBody> | null>(null)

interface Props {
  height?: string | number
  apiMethod?: (p: any) => Promise<any>
  modelValue?: unknown[]
  useUp?: boolean
  useDown?: boolean
  autoDown?: boolean // 测试没效果
  upCallback?: (mescroll: any) => void
  topOffset?: number | string // 下拉刷新区域往下偏移的距离比如希望偏移100rpx, 则top="100", 传的值是rpx的数值
  bottomOffset?: number | string
  bottombar?: boolean // tab页是否偏移TabBar的高度,避免列表被TabBar遮住, 默认true (仅h5生效,仅h5需要, 1.2.7新增)
}

const props = withDefaults(defineProps<Props>(), {
  height: "",
  useUp: true,
  useDown: true,
  autoDown: true,
  topOffset: 0,
  bottomOffset: 0,
  bottombar: false
})

const emits = defineEmits(["update:modelValue", "init"])

// 注册了mescroll示例
const { mescrollInit, downCallback, getMescroll } = useMescroll(
  onPageScroll,
  onReachBottom
) // 调用mescroll的hook

const orderDownOption = {
  use: props.useDown, // 是否启用下拉刷新,如果配置false,则不会初始化下拉刷新的布局
  auto: props.autoDown, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
  offset: 80, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  bgColor: "#fff", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
  textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
  textInOffset: "下拉刷新", // 下拉的距离在offset范围内的提示文本
  textOutOffset: "释放更新", // 下拉的距离大于offset范围的提示文本
  textLoading: "加载中 ..." // 加载中的提示文本
}
const orderUpOption = {
  use: props.useUp,
  page: {
    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    size: 10, // 每页数据的数量
    time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
  },
  noMoreSize: 10,
  offset: 80, // 距底部多远时,触发upCallback(仅mescroll-uni生效, 对于mescroll-body则需在pages.json设置"onReachBottomDistance")
  bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
  textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
  textLoading: "加载中 ...", // 加载中的提示文本
  textNoMore: "-- 没有更多数据了 --",
  toTop: {
    // 回到顶部按钮,需配置src才显示
    src: "https://xxx.neibu.png", // 图片路径
    offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
    duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
    zIndex: 9990, // fixed定位z-index值
    left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    bottom: 250 // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
  },
  empty: {
    use: true, // 是否显示空布局
    icon: "https://xxx.neibu.png", // 图标路径
    tip: "暂无数据" // 提示
  }
}

// 上拉加载的回调: 其中num:当前页 从1开始, size:每页数据条数,默认10
const upCallback = (mescroll: MescrollType) => {
  if (props.upCallback) {
    props.upCallback(mescroll)
    return
  }
  const pageData = {
    pageNo: mescroll.num,
    pageSize: mescroll.size
  }
  if (mescroll.num === 1) {
    // 第一次加载
    emits("init", mescroll)
  }
  props.apiMethod &&
    props
      .apiMethod(pageData)
      .then((res) => {
        if (res && res.status === 0) {
          const data = res.data
          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (data.records) {
            mescroll.endBySize(data.records.length, data.total)
          } else {
            mescroll.endSuccess(0)
          }
          //设置列表数据
          if (props.modelValue !== undefined) {
            if (mescroll.num == 1) {
              // 第一页需手动制空列表
              emits("update:modelValue", data.records)
            } else {
              emits("update:modelValue", props.modelValue.concat(data.records)) //追加新数据
            }
          }
        }
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

        //方法一(推荐): 后台接口有返回列表的总页数 totalPage
        //mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

        //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
        //mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

        //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
        //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
      })
      .catch(() => {
        mescroll.endErr() // 请求失败, 结束加载
      })
}

// 主动触发下拉刷新
const resetUpScroll = () => {
  const mescroll: MescrollType = getMescroll()
  mescroll.resetUpScroll()
  mescroll.scrollTo(0, 0)
}

defineExpose({
  mescrollRef,
  getMescroll,
  resetUpScroll
})
</script>
