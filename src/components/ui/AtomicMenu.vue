<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useUIStore } from '@/stores/uiStore'
import { useAtomicAnimation } from '@/composables/useAtomicAnimation'

const uiStore = useUIStore()
const { isAnimating, expandAnimation, collapseAnimation } = useAtomicAnimation()
const coreRef = ref<HTMLElement | null>(null)
const isOpen = computed(() => uiStore.isMenuOpen)

watch(isOpen, async (newVal, oldVal) => {
  await nextTick()
  if (!coreRef.value) return
  const rings = Array.from(document.querySelectorAll('.orbit-ring')) as HTMLElement[]
  const electrons = Array.from(document.querySelectorAll('.electron')) as HTMLElement[]
  const beams = Array.from(document.querySelectorAll('.connection-beam')) as HTMLElement[]
  if (newVal && !oldVal) expandAnimation(coreRef.value, rings, electrons, beams)
  else if (!newVal && oldVal) collapseAnimation(coreRef.value, rings, electrons, beams)
})

function handleCoreClick() { if (!isAnimating.value) uiStore.toggleMenu() }
function handleElectronClick(panelId: string) { if (!isAnimating.value) uiStore.openPanel(panelId) }
function getPos(angle: number, r = 0) { const rad = (angle - 180) * Math.PI / 180; return { x: Math.cos(rad) * r, y: Math.sin(rad) * r } }
</script>

<template>
  <div class="atomic-menu" :class="{ 'is-open': isOpen }">
    <div ref="coreRef" class="core-container" @click="handleCoreClick">
      <div class="wave-ring"></div><div class="wave-ring"></div><div class="wave-ring"></div>
      <div class="core"><div class="core-inner"></div><div class="core-glow"></div></div>

      <!-- 環繞軌道 (僅在菜單關閉時顯示) -->
      <div class="reactor-orbits" v-show="!isOpen">
        <div class="reactor-orbit orbit-1">
          <div class="orbit-dot"></div>
        </div>
        <div class="reactor-orbit orbit-2">
          <div class="orbit-dot"></div>
        </div>
        <div class="reactor-orbit orbit-3">
          <div class="orbit-dot"></div>
        </div>
      </div>

      <div class="core-label font-mono">{{ isOpen ? 'SELECT' : 'MENU' }}</div>
    </div>
    <div class="orbits" v-show="isOpen">
      <div class="orbit-ring orbit-1"></div><div class="orbit-ring orbit-2"></div>
      <div class="orbit-ring orbit-3"></div><div class="orbit-ring orbit-4"></div>
    </div>
    <svg class="beams-container" v-show="isOpen" viewBox="-200 -200 400 400">
      <line v-for="item in uiStore.menuItems" :key="`beam-${item.id || 'null'}`" class="connection-beam" x1="0" y1="0" :x2="getPos(item.angle).x" :y2="getPos(item.angle).y" />
    </svg>
    <div class="electrons" v-show="isOpen">
      <div v-for="item in uiStore.menuItems" :key="item.id"
           class="electron"
           :data-angle="item.angle"
           :style="{
             left: `${getPos(item.angle).x}px`,
             top: `${getPos(item.angle).y}px`
           }"
           @click="handleElectronClick(item.id)">
        <div class="electron-core"><span class="electron-icon">{{ item.icon }}</span></div>
        <div class="electron-ring"></div>
        <div class="electron-label font-mono">{{ item.labelEn }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.atomic-menu { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: var(--z-menu); pointer-events: none; }
.core-container { position: relative; width: 18.7vw; height: 18.7vw; cursor: pointer; pointer-events: auto; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
.core { position: relative; width: 12vw; height: 12vw; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
.core-inner { width: 8vw; height: 8vw; background: radial-gradient(circle, #fff 0%, var(--primary-cyan) 50%, transparent 70%); border-radius: 50%; box-shadow: 0 0 2vw var(--primary-cyan), 0 0 4vw var(--primary-cyan), inset 0 0 1.5vw rgba(255,255,255,0.5); animation: core-pulse 2s ease-in-out infinite; transition: transform 0.3s ease; }
.core-container:hover .core-inner { transform: scale(1.1); }
.core-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 16vw; height: 16vw; background: radial-gradient(circle, var(--hologram-strong) 0%, transparent 70%); border-radius: 50%; opacity: 0.5; }
.wave-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 12vw; height: 12vw; border: 2px solid var(--primary-cyan); border-radius: 50%; opacity: 0; }
.core-label { position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: var(--primary-cyan); letter-spacing: 3px; text-shadow: var(--glow-text); white-space: nowrap; }
.orbits { position: absolute; top: 50%; left: 50%; pointer-events: none; }
.orbit-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid var(--hologram-border); border-radius: 50%; opacity: 0; }
.orbit-1 { width: 16vw; height: 16vw; animation: ring-rotate 30s linear infinite; }
.orbit-2 { width: 24vw; height: 24vw; border-style: dashed; animation: ring-rotate-reverse 25s linear infinite; }
.orbit-3 { width: 32vw; height: 32vw; border-style: dotted; animation: ring-rotate 35s linear infinite; }
.orbit-4 { width: 40vw; height: 40vw; opacity: 0.3; animation: ring-rotate-reverse 40s linear infinite; }
.beams-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40vw; height: 40vw; pointer-events: none; }
.connection-beam { stroke: var(--primary-cyan); stroke-width: 1; opacity: 0; transform-origin: 0 0; }
.electrons { position: absolute; top: 20%; left: 50%; pointer-events: none; }
.electron { position: absolute; top: 0; left: 0; transform: translate(-50%, -50%); cursor: pointer; pointer-events: auto; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; }
.electron-core { width: 2.5vw; height: 2.5vw; background: var(--bg-panel); border: 2px solid var(--hologram-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; position: relative; z-index: 1; }
.electron:hover .electron-core { background: var(--hologram); border-color: var(--primary-cyan); box-shadow: var(--glow-cyan); transform: scale(1.15); }
.electron-icon { font-size: 1.2vw; }
.electron-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 3vw; height: 3vw; border: 1px solid var(--hologram-border); border-radius: 50%; opacity: 0; transition: opacity 0.3s ease; }
.electron:hover .electron-ring { opacity: 1; animation: ring-rotate 3s linear infinite; }
.electron-label { font-size: 0.65rem; color: var(--text-secondary); letter-spacing: 2px; text-shadow: var(--glow-text); transition: color 0.3s ease; }
.electron:hover .electron-label { color: var(--primary-cyan); }

/* 原子核環繞軌道 */
.reactor-orbits {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
}

.reactor-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;
}

.reactor-orbit.orbit-1 {
  width: 130px;
  height: 130px;
  transform: translate(-50%, -50%);
  animation: reactor-orbit-spin 8s linear infinite;
}

.reactor-orbit.orbit-2 {
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  animation: reactor-orbit-spin 12s linear infinite reverse;
}

.reactor-orbit.orbit-3 {
  width: 190px;
  height: 190px;
  transform: translate(-50%, -50%);
  animation: reactor-orbit-spin 16s linear infinite;
}

@keyframes reactor-orbit-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.orbit-dot {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--primary-cyan);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--primary-cyan);
}

@media (max-width: 768px) { .atomic-menu { transform: translate(-50%, -50%) scale(0.7); } }
@media (max-width: 480px) { .atomic-menu { transform: translate(-50%, -50%) scale(0.55); } }
</style>