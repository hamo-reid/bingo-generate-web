<template>
  <div class="bingo-creator">
    <ShareDialog v-if="isShowShareDialog" :is-show="isShowShareDialog" :bingo-url="shareUrl" @close="isShowShareDialog = false" />
    <div class="inputs">
      <input class="bingo-title-input" type="text" v-model="bingoTitle" placeholder="输入Bingo标题">
      <input class="bingo-description-input" type="text" name="description" v-model="bingoDescription"
        placeholder="输入Bingo描述">
      <textarea name="" id="" cols="30" rows="10" v-model="bingoContent" placeholder="输入Bingo内容，每行为1格" />
    </div>
    <div class="preview" ref="preview">
      <BingoTable :data="{
        title: bingoTitle,
        description: bingoDescription,
        matrix: bingoMatrix
      }" />
    </div>
    <div class="buttons">
      <button class="create-img-button" @click="createBingo">生成图片</button>
      <button class="create-txt-button" @click="share">分享</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import BingoTable from './BingoTable.vue'
import ShareDialog from '@/components/ShareDialog.vue';


const bingoTitle = ref('')
const bingoDescription = ref('')
const bingoContent = ref('')
const isShowShareDialog = ref(false)
const shareUrl = ref('')


const bingoWords = computed(() => {
  const words = bingoContent.value.split('\n')
  // 去除空白字符
  words.map(word => word.trim()).filter(word => word.trim() !== '')
  // 如果单词数量少于5*5，则补充空白字符，否则截断
  if (words.length < 25) {
    words.push(...Array(25 - words.length).fill(''))
  } else {
    words.splice(25)
  }
  return words
})
// 计算词语矩阵
const bingoMatrix = computed(() => {
  // 转换为5*5的数组
  const matrix: string[][] = []
  const words = bingoWords.value
  for (let i = 0; i < 5; i++) {
    matrix.push([])
    for (let j = 0; j < 5; j++) {
      matrix[i].push(words[i * 5 + j])
    }
  }
  return matrix
})

const preview = ref<HTMLDivElement>()

function createBingo() {
  // 调用浏览器接口生成图片
  html2canvas(preview.value as HTMLElement).then(canvas => {
    const img = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = img
    a.download = `${bingoTitle.value}.png`
    a.click()
  })
}

function createBingoText(bingoData: BingoData) {
  const BingoText = JSON.stringify(bingoData)
  const BingoCompressed = LZString.compressToEncodedURIComponent(BingoText)
  // 将压缩后的文字添加至剪切板
  return BingoCompressed
}
function createShareLink() {
  const bingoData: BingoData = {
    title: bingoTitle.value,
    description: bingoDescription.value,
    matrix: bingoMatrix.value
  }
  const url = `${location.href}?bingo=${createBingoText(bingoData)}`
  return url
}
function share(){
  isShowShareDialog.value = true
  shareUrl.value = createShareLink()
}
</script>

<style scoped>
.bingo-creator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
}

input {
  outline: none;
  text-align: center;
}

textarea {

  height: 200px;
  outline: none;
  resize: none;
  font-size: 1.125rem;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "AlimamaFangYuanTiVF";
}

.preview {
  width: 100%;
  margin-bottom: 1.25rem;
}

table {
  border: 1px solid #ccc;
  width: 100%;
  border-collapse: collapse;
}

th.title {
  height: 3rem;
  background-color: #f2f2f2;
  font-size: 1.5rem;
}

th.description {
  height: 1.625rem;
  font-size: 1.25rem;
  font-weight: normal;
}


td {
  /* 宽高相等*/
  width: 80px;
  height: 80px;
  max-width: 80px;
  max-height: 80px;
  border: 1px solid #ccc;
  text-align: center;
  /* 文字大小随内容变化 */
  white-space: pre-wrap;
  word-break: break-all;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.buttons button {
  width: 100px;
  padding: 0.625rem 0;
  color: #f2f2f2;
  background-color: #333;
}
</style>