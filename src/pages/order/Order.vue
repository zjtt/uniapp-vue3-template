<template>
  <tm-app class="pc-page" color="#fff">
    <MNavBar title="套餐订单" />
    <view class="page-content">
      <CommonList :apiMethod="rightsOrder" v-model="orderList" :height="500">
        <view
          class="order-item"
          v-for="(item, index) in orderList"
          :key="index"
          @click="goDetail(item)"
        >
          <view class="top-line">
            <view class="name">{{ item.packageName }}: </view>
            <view class="price">{{ item.packagePrice }}元/年</view>
            <view class="amount">
              <view>实付：</view>
              <view class="redword">¥ {{ item.payAmount }}</view>
            </view>
          </view>
          <view class="bottom-line">
            <view class="left">
              <view class="content">{{ item.packageContent }}</view>
              <view class="time">下单时间：{{ item.payTime }}</view>
            </view>
            <image class="back" :src="''" mode="scaleToFill" />
          </view>
        </view>
      </CommonList>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { rightsOrder } from "@/api"
import MNavBar from "@/components/common/MNavBar.vue"
import CommonList from "@/components/common/CommonList.vue"
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app"
import useMescroll from "@/components/mescroll-uni/hooks/useMescroll.js"
// 注册了onPageScroll, onReachBottom勾子
useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

export interface RightsOrderType {
  expireTime: string
  orderNo: string
  orderTime: string
  packageContent: string
  packageName: string
  packagePrice: number
  payAmount: number
  payOrderId: string
  payOrderState: 1
  payTime: string
  userAvatar: string
  userNick: string
}

const orderList = ref<RightsOrderType[]>([])

const router = useRouter()

// 资产详情
const goDetail = (orderItem: RightsOrderType) => {
  router.push({
    path: "pages/my/RightsOrderDetail",
    query: {
      id: orderItem.orderNo
    }
  })
}
</script>

<style scoped lang="scss">
.page-content {
  width: 640rpx;
  margin: 0 auto;
}

.order-item {
  margin-bottom: 40rpx;
  width: 640rpx;
  min-height: 149rpx;
  border-bottom: 2rpx solid #ced4da;

  .top-line {
    color: #333;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 30rpx;
    display: flex;
    margin-bottom: 20rpx;

    .name {
      width: 250rpx;
    }

    .price {
      width: 180rpx;
    }

    .amount {
      width: 210rpx;
      display: flex;
      justify-content: flex-end;
    }
  }

  .bottom-line {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20rpx;

    .left {
      flex: 1;

      .content {
        margin-bottom: 13rpx;
      }

      .content,
      .time {
        color: #929292;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 30rpx;
      }
    }

    .back {
      margin-left: 13rpx;
      width: 41rpx;
      height: 40rpx;
    }
  }
}
</style>
