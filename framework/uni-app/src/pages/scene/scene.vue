<template>
  <view class="page">
    <kivicube-slam
      class="slam"
      :license="license"
      @ready="ready"
      @error="error"
      @tap="tap"
    />

    <view v:if="showGuide" class="guide">请点击屏幕，放置模型</view>
  </view>
</template>

<script>
import { errorHandler, showAuthModal, requestFile } from "../../utils/utils";

export default {
  data() {
    return {
      license: "", // 小程序授权证书，可用来去除水印，联系我们获取，需提供小程序appid
      showGuide: false,
    };
  },

  onLoad() {
    uni.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      requestFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-slam-plugin-api-demo/rabbit.glb"
      ),
      requestFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-slam-plugin-api-demo/reticle.glb"
      ),
    ]);
  },

  methods: {
    async ready({ detail: slam }) {
      try {
        const [rabbitArrayBuffer, reticleArrayBuffer] = await this
          .downloadAsset;
        const [rabbitModel, reticleModel] = await Promise.all([
          slam.createGltfModel(rabbitArrayBuffer),
          slam.createGltfModel(reticleArrayBuffer),
        ]);

        slam.addPlaneIndicator(reticleModel, {
          onPlaneShowing() {
            reticleModel.rotation.y += 0.02;
          },
        });

        // 暂时隐藏，点击后再出现。
        rabbitModel.visible = false;
        slam.add(rabbitModel, 0.5);

        await slam.start();

        this.rabbitModel = rabbitModel;
        this.slam = slam;

        uni.hideLoading();

        this.showGuide = true;
      } catch (e) {
        uni.hideLoading();
        errorHandler(e);
      }
    },

    tap({ touches, target }) {
      if (Array.isArray(touches) && touches.length > 0) {
        const { offsetLeft, offsetTop } = target;
        const { pageX, pageY } = touches[0];
        // 注意：需要传入在kivicube-slam组件上的坐标点，而不是页面上的坐标点。
        const success = this.slam.standOnThePlane(
          this.rabbitModel,
          pageX - offsetLeft,
          pageY - offsetTop,
          true
        );

        if (success) {
          this.rabbitModel.visible = true;
          this.rabbitModel.playAnimation({ loop: true });

          this.showGuide = false;
          this.slam.removePlaneIndicator();
        } else {
          uni.showToast({ title: "放置模型失败，请对准平面", icon: "none" });
        }
      }
    },

    error({ detail }) {
      uni.hideLoading();
      // 判定是否camera权限问题，是则向用户申请权限。
      if (detail?.isCameraAuthDenied) {
        showAuthModal(this);
      } else {
        errorHandler(detail);
      }
    },
  },
};
</script>

<style scoped>
.page,
.slam-component {
  display: block;
  width: 100vw;
  height: 100vh;
}

.slam-component-guide {
  position: absolute;
  left: 50%;
  bottom: 30vh;
  transform: translate(-50%);
  z-index: 2;

  color: white;
  pointer-events: none;
}
</style>
