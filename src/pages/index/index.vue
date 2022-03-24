<template>
  <view class="content">
    <video id="myVideo" :src="videoUrl" @error="videoErrorCallback" enable-danmu danmu-btn controls></video>

    <video
      id="myVideo"
      src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
      @error="videoErrorCallback"
      enable-danmu
      danmu-btn
      controls
    ></video>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wm from '../../utils/watermask'

const title = ref('Hello')
const videoUrl = ref('')

wm.run().then(url => {
  videoUrl.value = url
})
const videoErrorCallback = (e: any) => {
  uni.showModal({
    content: e?.target?.errMsg,
    showCancel: false
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
