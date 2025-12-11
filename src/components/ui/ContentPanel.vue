<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useUIStore } from '@/stores/uiStore'
import gsap from 'gsap'

const props = defineProps<{ panelId: string }>()
const uiStore = useUIStore()
const panelRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isActive = computed(() => uiStore.activePanel === props.panelId)
const menuItem = computed(() => uiStore.menuItems.find(item => item.id === props.panelId))

watch(isActive, (active) => {
  if (!panelRef.value || !contentRef.value) return
  if (active) {
    gsap.fromTo(panelRef.value, { scale: 0.8, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' })
    const items = contentRef.value.querySelectorAll('.animate-item')
    gsap.fromTo(items, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' })
  }
})

function closePanel() {
  if (!panelRef.value) { uiStore.closePanel(); return }
  gsap.to(panelRef.value, { scale: 0.9, opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: () => uiStore.closePanel() })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="isActive" class="panel-overlay" @click.self="closePanel">
        <div ref="panelRef" class="content-panel">
          <div class="panel-header">
            <div class="header-left">
              <span class="panel-icon">{{ menuItem?.icon }}</span>
              <div class="panel-title-group">
                <h2 class="panel-title font-display">{{ menuItem?.labelEn }}</h2>
                <span class="panel-subtitle font-mono">{{ menuItem?.label }}</span>
              </div>
            </div>
            <button class="close-btn" @click="closePanel"><span class="close-icon">×</span></button>
          </div>
          <div class="header-line"><div class="line-glow"></div></div>
          <div ref="contentRef" class="panel-content"><slot /></div>
          <div class="panel-footer font-mono">
            <span class="footer-status"><span class="status-dot"></span>DATA LOADED</span>
            <span class="footer-hint">ESC TO CLOSE</span>
          </div>
          <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
          <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.panel-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(5,5,8,0.85); backdrop-filter: blur(10px); z-index: var(--z-panel); display: flex; align-items: center; justify-content: center; padding: 40px; }
.content-panel { position: relative; width: 100%; max-width: 900px; max-height: 80vh; background: var(--bg-panel); border: 1px solid var(--hologram-border); box-shadow: var(--glow-cyan), inset 0 0 60px rgba(0,212,255,0.03); display: flex; flex-direction: column; overflow: hidden; }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 30px; background: linear-gradient(180deg, var(--hologram) 0%, transparent 100%); }
.header-left { display: flex; align-items: center; gap: 16px; }
.panel-icon { font-size: 2rem; filter: drop-shadow(0 0 10px var(--primary-cyan)); }
.panel-title-group { display: flex; flex-direction: column; gap: 2px; }
.panel-title { font-size: 1.75rem; font-weight: 700; color: var(--primary-cyan); text-shadow: var(--glow-text); letter-spacing: 4px; margin: 0; }
.panel-subtitle { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 2px; }
.close-btn { width: 40px; height: 40px; background: transparent; border: 1px solid var(--hologram-border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all var(--transition-normal); }
.close-btn:hover { background: var(--hologram); border-color: var(--warning-red); color: var(--warning-red); box-shadow: 0 0 20px rgba(255,59,48,0.3); }
.close-icon { font-size: 1.5rem; line-height: 1; }
.header-line { height: 2px; background: linear-gradient(90deg, transparent 0%, var(--hologram-border) 20%, var(--primary-cyan) 50%, var(--hologram-border) 80%, transparent 100%); position: relative; }
.line-glow { position: absolute; top: -2px; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, transparent 0%, transparent 40%, var(--primary-cyan) 50%, transparent 60%, transparent 100%); filter: blur(4px); }
.panel-content { flex: 1; overflow-y: auto; padding: 30px; }
.panel-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 30px; background: var(--hologram); border-top: 1px solid var(--hologram-border); font-size: 0.7rem; color: var(--text-dim); letter-spacing: 1px; }
.footer-status { display: flex; align-items: center; gap: 8px; }
.status-dot { width: 6px; height: 6px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 10px #00ff88; }
.panel-corner { position: absolute; width: 30px; height: 30px; border-color: var(--primary-cyan); border-style: solid; }
.panel-corner.top-left { top: -1px; left: -1px; border-width: 3px 0 0 3px; }
.panel-corner.top-right { top: -1px; right: -1px; border-width: 3px 3px 0 0; }
.panel-corner.bottom-left { bottom: -1px; left: -1px; border-width: 0 0 3px 3px; }
.panel-corner.bottom-right { bottom: -1px; right: -1px; border-width: 0 3px 3px 0; }
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.3s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
@media (max-width: 768px) { .panel-overlay { padding: 20px; } .content-panel { max-height: 90vh; } .panel-header { padding: 16px 20px; } .panel-title { font-size: 1.25rem; } .panel-content { padding: 20px; } }
</style>