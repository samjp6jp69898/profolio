<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useUIStore } from '@/stores/uiStore'

const uiStore = useUIStore()

const currentPanel = computed(() => uiStore.getActivePanel())

const PanelComponent = computed(() => {
  if (!currentPanel.value) return null
  return defineAsyncComponent(currentPanel.value.getComponent())
})
</script>

<template>
  <div v-if="currentPanel && PanelComponent" class="dynamic-panel">
    <div class="panel-header">
      <h2 class="panel-title">{{ currentPanel.info.title }}</h2>
      <button @click="uiStore.closePanel()" class="close-btn">✕</button>
    </div>
    <div class="panel-content">
      <Suspense>
        <component :is="PanelComponent" :panel-data="currentPanel.data" />
        <template #fallback>
          <div class="loading">載入中...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.dynamic-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 800px;
  height: 80vh;
  background: var(--bg-panel);
  border: 2px solid var(--hologram-border);
  border-radius: 10px;
  z-index: var(--z-panel);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--hologram-border);
}

.panel-title {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  color: var(--primary-cyan);
  margin: 0;
}

.close-btn {
  background: none;
  border: 1px solid var(--hologram-border);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  border-color: var(--primary-cyan);
  color: var(--primary-cyan);
  box-shadow: var(--glow-cyan);
}

.panel-content {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
}
</style>