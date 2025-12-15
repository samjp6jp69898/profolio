<script setup lang="ts">
import { useUIStore } from '@/stores/uiStore'
import { useContentStore } from '@/stores/contentStore'
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import { onMounted } from 'vue'

const uiStore = useUIStore()
const contentStore = useContentStore()

onMounted(() => {
  contentStore.fetchContent()
})
</script>

<template>
  <div class="app">
    <LoadingScreen @complete="uiStore.setLoading(false)" />
    <AnimatedBackground />
    <MainLayout v-if="!uiStore.isLoading" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-dark, #0a0a0f);
  color: #fff;
}
</style>