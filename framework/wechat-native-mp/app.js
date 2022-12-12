const {
  setBackPagePath,
  setAuthorize,
  setMenuButtonBoundingClientRect,
} = requirePlugin("kivicube-slam");
App({
  onLaunch() {
    let shareImg = "https://kivicube-resource.kivisense.com/slam-ar/share.jpeg"
    this.globalData = {
      shareImg,
      appName: "SLAM插件快速接入示例",
    }
    const isTabbarPage = false;
    setBackPagePath("/pages/index/index", isTabbarPage);
    // Slam场景展示页面需要申请camera权限。如果小程序配置基础库最低版本>=2.14.4，也可不设置此API。
    // setAuthorize(wx.authorize);
    // 适配Slam场景展示页面返回按钮的位置。如果小程序配置基础库最低版本>=2.15.0，也可不设置此API。
    setMenuButtonBoundingClientRect(wx.getMenuButtonBoundingClientRect());
  },
});
