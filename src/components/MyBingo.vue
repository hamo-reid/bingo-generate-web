<template>
  <div class="bingo">
    <header>
      <div class="title">Bingo 生成器</div>
    </header>
    <div class="content">
      <div class="switch">
        <div class="btn" @click="isBingo = true">
          Bingo!
        </div>
        <div class="btn" @click="isBingo = false">
          创作
        </div>
      </div>
      <div class="container">
        <keep-alive comp>
          <component :is="isBingo? BingoPanel : BingoCreator" />
        </keep-alive>
      </div>
    </div>
    <footer class="footer" style="height: 100px;">
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BingoPanel from '@/components/BingoPanel.vue';
import BingoCreator from '@/components/BingoCreator.vue';

const isBingo = ref(true)
</script>

<style scoped>
header {
  background-color: #E5E7ED;
  padding: 0.625rem;
  text-align: center;
  font-weight: 600;
}

.title {
  font-size: 1.5rem;
}

.content {
  max-width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 640px) {
 .content {
    width: 100%;
  }
}

.container {
  width: 100%;
  height: 100%;
}
.switch {
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin: auto;
  margin-bottom: 0.625rem;
  padding: 0.625rem;
  
}
.switch .btn {
  width: 100px;
  background-color: #E5E7ED;
  border: 1px solid #ccc;
  padding: 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}


</style>