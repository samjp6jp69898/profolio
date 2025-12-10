<script setup lang="ts">
import IronManScene from './components/IronManScene.vue'
</script>

<template>
  <div id="app">
    <IronManScene />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Rajdhani', sans-serif;
  background: #0a0a0f;
  color: #ffffff;
  overflow: hidden;
}
</style>
