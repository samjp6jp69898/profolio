<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'


const isLoaded = ref(false)

const onLoadingComplete = () => {
  isLoaded.value = true
}
</script>

<template>
  <div id="app">
    <!-- Loading 畫面 -->
    <LoadingScreen @complete="onLoadingComplete" />
    
    <!-- 主大廳（Loading 完成後顯示） -->
 
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Rajdhani', sans-serif;
  background: #0a0a0f;
  color: #ffffff;
  overflow: hidden;
}

/* 主大廳進場動畫 */
.hall-fade-enter-active {
  transition: all 0.5s ease;
}

.hall-fade-enter-from {
  opacity: 0;
}

.hall-fade-enter-to {
  opacity: 1;
}
</style>
