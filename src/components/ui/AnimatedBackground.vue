<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Particle { id: number; x: number; y: number; size: number; opacity: number; speed: number; delay: number }
const particles = ref<Particle[]>([])

onMounted(() => {
  particles.value = Array.from({ length: 50 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 20 + 10, delay: Math.random() * 5
  }))
})
</script>

<template>
  <div class="animated-background">
    <div class="bg-gradient"></div>
    <div class="grid-overlay"></div>
    <div class="floor-grid"></div>
    <div class="particles">
      <div v-for="p in particles" :key="p.id" class="particle"
        :style="{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, animationDuration: `${p.speed}s`, animationDelay: `${p.delay}s` }">
      </div>
    </div>
    <div class="scanline"></div>
    <div class="vignette"></div>
  </div>
</template>

<style scoped>
.animated-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: var(--z-background); overflow: hidden; pointer-events: none; }
.bg-gradient { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at 20% 20%, rgba(0, 212, 255, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(10, 132, 255, 0.05) 0%, transparent 50%), linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 50%, var(--bg-darker) 100%); }
.grid-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px); background-size: 50px 50px; animation: grid-pulse 4s ease-in-out infinite; }
.floor-grid { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%) perspective(500px) rotateX(60deg); width: 200%; height: 60%; background-image: linear-gradient(var(--primary-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--primary-cyan) 1px, transparent 1px); background-size: 80px 80px; opacity: 0.06; mask-image: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%); }
.particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.particle { position: absolute; background: var(--primary-cyan); border-radius: 50%; box-shadow: 0 0 6px var(--primary-cyan); animation: particle-float linear infinite; }
.scanline { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.1), transparent); animation: scanline 8s linear infinite; opacity: 0.5; }
.vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 5, 8, 0.8) 100%); }
</style>