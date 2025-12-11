<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/stores/uiStore'
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'
import HUD from '@/components/ui/HUD.vue'
import AtomicMenu from '@/components/ui/AtomicMenu.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import WorkPanel from '@/components/panels/WorkPanel.vue'
import SkillsPanel from '@/components/panels/SkillsPanel.vue'
import TravelPanel from '@/components/panels/TravelPanel.vue'
import AboutPanel from '@/components/panels/AboutPanel.vue'

const uiStore = useUIStore()

function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space' && !uiStore.isPanelOpen) {
    e.preventDefault()
    uiStore.toggleMenu()
  } else if (e.code === 'Escape') {
    if (uiStore.isPanelOpen) uiStore.closePanel()
    else if (uiStore.isMenuOpen) uiStore.toggleMenu()
  } else if (e.key >= '1' && e.key <= '6' && !uiStore.isPanelOpen) {
    const index = parseInt(e.key) - 1
    if (uiStore.menuItems[index]) uiStore.openPanel(uiStore.menuItems[index].id)
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="app">
    <LoadingScreen />
    <AnimatedBackground />
    <HUD />
    <AtomicMenu />
    <WorkPanel />
    <SkillsPanel />
    <TravelPanel />
    <ContactPanel />
    <EducationPanel />
    <AboutPanel />
  </div>
</template>

<style scoped>
.app { min-height: 100vh; position: relative; }
</style>