// index.js
const app = getApp();
const {
  setBackPagePath,
  setAuthorize,
  setMenuButtonBoundingClientRect,
} = requirePlugin("kivicube-slam");
Page({
  data: {
    sceneId: '867911c32f0a4e48a6762a0beb2162c6',
    params: "&shadow=0.3&ambient=0.3&directional=2.5&horizontal=0&vertical=0&envMap=default&size=0.8&rotation=0&animation=&animationLoop=true&shareImage=&gyroscope=false",
    sharePagePath: '/pages/index/index',
  },
  onLoad() {
    const isTabbarPage = false;
    setBackPagePath("/pages/index/index", isTabbarPage);
    // Slam场景展示页面需要申请camera权限。如果小程序配置基础库最低版本>=2.14.4，也可不设置此API。
    // setAuthorize(wx.authorize);
    // 适配Slam场景展示页面返回按钮的位置。如果小程序配置基础库最低版本>=2.15.0，也可不设置此API。
    setMenuButtonBoundingClientRect(wx.getMenuButtonBoundingClientRect());
  },
  // 不带参数
  handleAr(){
    wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.data.sceneId}` });
  },
  // 带参数
  handleArWithParams() {
    wx.navigateTo({ url: `plugin://kivicube-slam/scene?id=${this.data.sceneId}${this.data.params}` });
  }
})
