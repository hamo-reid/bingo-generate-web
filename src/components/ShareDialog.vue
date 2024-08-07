<template>
  <div class="share-dialog">
    <div class="mask" @click="$emit('close')"></div>
    <div class="dialog">
      <div class="header">
        <span>分享</span>
        <span class="close" @click="$emit('close')"> X </span>
      </div>
      <div class="content">
        <div class="qrcode">
          <canvas id="qrcode" ref="qrcode" width="200" height="200"></canvas>
        </div>
        <div class="share-link">
          <p class="link">
            {{ bingoUrl }}
          </p>
          <p class="desc">复制链接分享给好友</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { ref, onMounted } from 'vue';
const props = defineProps<{
  isShow: boolean;
  bingoUrl: string;
}>();




const qrcode = ref<HTMLCanvasElement>();

function saveCanvasAsImage() {
  const link = document.createElement('a');
  link.download = 'bingo.png';
  link.href = qrcode.value?.toDataURL() as string;
  link.click();
}
let isLongPress = false;
onMounted(() => {
  QRCode.toCanvas(qrcode.value, props.bingoUrl, (error) => {
    if (error) {
      console.error(error);
    }
  });
  qrcode.value?.addEventListener('touchstart', function (event) {
    event.preventDefault();
    setTimeout(function () {
      if (!isLongPress) {
        isLongPress = true;
        // 长按操作
        saveCanvasAsImage();
      }
    }, 500);
  }, false);
  qrcode.value?.addEventListener('touchend', function (event) {
    event.preventDefault();
    isLongPress = false;
  }, false);
})
</script>

<style scoped>
.share-dialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1.25rem;
  text-align: center;
}

.dialog .header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dialog .header span {
  font-size: 1.5rem;
  font-weight: bold;
}

.dialog .header .close {
  cursor: pointer;
}

.dialog .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.dialog .content .qrcode {
  margin-bottom: 1rem;
}

.dialog .content .qrcode canvas {
  width: 200px;
  height: 200px;
}


.dialog .content .share-link {
  margin-top: 1rem;
}

.dialog .content .share-link p {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #333;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
}

.dialog .content .share-link p.desc {
  font-size: 0.75rem;
  color: #666;
}
</style>