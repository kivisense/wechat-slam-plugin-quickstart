<template>
  <view class="wrapper">
    <view class="button-wrap">
      <view class="btn-start">
        <image class="home-btn" mode="widthFix" src="/static/images/home-btn.png"></image>
        <text @click="handleAr">开始AR-不带参数</text>
      </view>
      <view class="btn-start">
        <image class="home-btn" mode="widthFix" src="/static/images/home-btn.png"></image>
        <text @click="handleArWithParams">开始AR-带参数</text>
      </view>
      <view class="btn-start">
        <image class="home-btn" mode="widthFix" src="/static/images/home-btn.png"></image>
        <text @click="handleUseComponent">使用插件组件</text>
      </view>
    </view>
    <image class="home-bg" mode="widthFix" src="/static/images/home-bg.jpg"></image>
  </view>
</template>

<script>

export default {
  data() {
    return {
      sceneId: '867911c32f0a4e48a6762a0beb2162c6',
      params: "&shadow=0.3&ambient=0.3&directional=2.5&horizontal=0&vertical=0&envMap=default&size=0.8&rotation=0&animation=&animationLoop=true&shareImage=&gyroscope=false&version=v2&downgrade=true",
    }
  },

  methods: {
    // 不带参数
    handleAr(){
      wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.sceneId}` });
    },

    // 带参数
    handleArWithParams() {
      wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.sceneId}${this.params}` });
    },

    // 进入插件组件页面
    handleUseComponent() {
      wx.navigateTo({ url: "/pages/scene/scene" });
    },
  },
};
</script>

<style scoped>
.wrapper{
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.button-wrap{
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 44vh;
}
.btn-start{
  flex-shrink: 0;
  position: relative;
  width: 302rpx;
  height: 164rpx;
  line-height: 164rpx;
  margin: 0 auto;
  color: #fff;
  letter-spacing: 1rpx;
}
.btn-start text{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 24rpx;
  line-height: 1;
  white-space: nowrap;
  padding: 20rpx;
}
.home-btn{
  width: 105%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home-bg{
  position: absolute;
  z-index: -1;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  /* height: 100%; */
}
</style>
