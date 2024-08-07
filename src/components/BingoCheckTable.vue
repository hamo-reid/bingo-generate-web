<template>
  <table>
    <thead>
      <tr>
        <th class="title" colspan="5">{{ data.title }}</th>
      </tr>
      <tr>
        <th class="description" colspan="5">{{ data.description }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data.matrix" :key="rowIndex">
        <td v-for="(word, wordIndex) in row" :key="wordIndex"
          :style="{ fontSize: `${Math.min(64, 1 / Math.log10(word.length + 1) * 16)}px` }">
          <input type="checkbox" :id="`word${rowIndex}-${wordIndex}`">
          <label :for="`word${rowIndex}-${wordIndex}`">{{ word }}</label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  data: BingoData
}>()
</script>

<style scoped>
table {
  border: 1px solid #ccc;
  width: 100%;
  border-collapse: collapse;
  user-select: none;
}
th.title {
  height: 3rem;
  background-color: #f2f2f2;
  font-size: 1.5rem;
}
th.description {
  height: 2rem;
  font-size: 1.125rem;
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
  position: relative;
}
td input[type="checkbox"] {
  display: none;
}
td label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
}
td label::before{
  content: "\e6e3";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 3rem;
  color: red;
  display: none;
  font-weight: 900;
  font-family: 'iconfont' !important;
}
td input[type="checkbox"]:checked + label::before {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}
</style>