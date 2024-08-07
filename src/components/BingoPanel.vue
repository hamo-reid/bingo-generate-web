<template>
  <div class="bingo-panel">
    <div class="bingo-begin" v-show="!isBegin">
      <textarea class="bingo-input" :class="{ error: isError }" placeholder="请输入Bingo" name="bingo-input"
        v-model="BingoText"></textarea>
      <button @click="BeginBingo(BingoText)">开始</button>
    </div>
    <div class="bingo-content" v-if="isBegin">
      <div class="bingo-check" ref="bingoCheck">
        <BingoCheckTable :data="bingoData"></BingoCheckTable>
      </div>
      <div class="buttons">
        <button @click="retrunBegin">返回</button>
        <button @click="generateImage">生成图片</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import LZString from 'lz-string';
import BingoCheckTable from './BingoCheckTable.vue';
import html2canvas from 'html2canvas'



const isBegin = ref(false)
const BingoText = ref('')
const isError = ref(false)

const bingoData = ref<BingoData>(
  {
    title: '',
    description: '',
    matrix: []
  }
)

function parseBingoText(bingo_text: string): BingoData | void {
  let decompressed: string
  try {
    const url = new URL(bingo_text) 
    const bingo = url.searchParams.get('bingo') as string
    decompressed = LZString.decompressFromEncodedURIComponent(bingo)
  } catch (error) {
    console.log(error)
    decompressed = LZString.decompressFromEncodedURIComponent(bingo_text)
  }
  
  let bingoJson: BingoData
  try {
    bingoJson = JSON.parse(decompressed)
  } catch (error) {
    return
  }
  // 判断json中是否含有对应属性
  if (!(
    bingoJson.hasOwnProperty('title') &&
    bingoJson.hasOwnProperty('description') &&
    bingoJson.hasOwnProperty('matrix'))
  ) return
  return {
    title: bingoJson.title,
    description: bingoJson.description,
    matrix: bingoJson.matrix
  }
}

function initBingo() {
  const queryParams = new URLSearchParams(window.location.search);
  const queryBingo = queryParams.get('bingo')
  if (queryBingo) {
    BingoText.value = queryBingo
    BeginBingo(queryBingo)
  }
}

function BeginBingo(bingo_text: string) {
  const bingo = parseBingoText(bingo_text)
  if (!bingo) {
    isError.value = true
    return
  } else {
    bingoData.value = bingo
    isError.value = false
    isBegin.value = true
  }
}
function retrunBegin() {
  isBegin.value = false
  BingoText.value = ''
  window.location.href = window.location.href.split('?')[0]
}
const bingoCheck = ref<HTMLDivElement>()

function generateImage() {
  html2canvas(bingoCheck.value as HTMLElement, {
    allowTaint: true,
  }).then(canvas => {
    const img = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = img
    a.download = `${bingoData.value.title}.png`
    a.click()
  })
}
onBeforeMount(() => {
  initBingo()
})
</script>

<style scoped>
.bingo-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
}

.bingo-begin {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bingo-begin button {
  width: 100px;
  padding: 0.625rem 0;
  color: #f2f2f2;
  background-color: #333;
}

.bingo-input {
  width: 100%;
  height: 200px;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
  font-family: "AlimamaFangYuanTiVF";
}

.bingo-input.error {
  color: red;
  border: 1px solid red;
}

.bingo-content {
  width: 400px;
}

.bingo-content .buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1.25rem;
}

.bingo-content .buttons button {
  width: 100px;
  padding: 0.625rem 0;
  color: #f2f2f2;
  background-color: #333;
}</style>