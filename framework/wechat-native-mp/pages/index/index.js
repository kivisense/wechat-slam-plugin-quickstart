// index.js
const app = getApp();
Page({

  data: {
    sceneId: '867911c32f0a4e48a6762a0beb2162c6',
    params: "&shadow=0.3&ambient=0.3&directional=2.5&horizontal=0&vertical=0&envMap=default&size=0.8&rotation=0&animation=&animationLoop=true&shareImage=&gyroscope=false&version=v2&downgrade=true",
    sharePagePath: '/pages/index/index',
  },

  // 不带参数
  handleAr(){
    // wx.uma.trackEvent("home_entry_slamScene", {sceneId: this.data.sceneId});
    wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.data.sceneId}` });
  },

  // 带参数
  handleArWithParams() {
    // wx.uma.trackEvent("home_entry_slamScene", {sceneId: this.data.sceneId});
    wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.data.sceneId}${this.data.params}` });
  },

  // 进入插件组件页面
  handleUseComponent() {
    wx.navigateTo({ url: "/pages/scene/scene" });
  },

  onShareAppMessage() {
    return {
      title: app.globalData.appName,
      path: this.data.sharePagePath,
      imageUrl: app.globalData.shareImg,
    };
  },
});
