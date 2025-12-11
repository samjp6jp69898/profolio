<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let intervalId: number

function updateDateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  currentDate.value = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()
}

onMounted(() => { updateDateTime(); intervalId = window.setInterval(updateDateTime, 1000) })
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <div class="hud-container">
    <div class="hud-corner hud-top-left">
      <div class="arc-reactor">
        <div class="reactor-core"></div>
        <div class="reactor-ring ring-1"></div>
        <div class="reactor-ring ring-2"></div>
        <div class="reactor-ring ring-3"></div>
      </div>
      <div class="hud-info">
        <div class="hud-title">Sam</div>
        <div class="hud-subtitle font-mono">PERSONAL INTERFACE v2.0</div>
      </div>
    </div>
    <div class="hud-corner hud-top-right">
      <div class="system-info">
        <div class="system-time font-mono">{{ currentTime }}</div>
        <div class="system-date font-mono">{{ currentDate }}</div>
      </div>
      <div class="system-status">
        <span class="status-dot"></span>
        <span class="status-label font-mono">SYSTEM ONLINE</span>
      </div>
    </div>
    <div class="hud-corner hud-bottom-left">
      <div class="coord-display font-mono">
        <div class="coord-label">LOCATION</div>
        <div class="coord-value">TAIWAN // KAOHSIUNG</div>
      </div>
    </div>
    <div class="hud-corner hud-bottom-right">
      <div class="nav-hint font-mono">
        <div class="hint-item"><span class="hint-key">SPACE</span><span class="hint-action">OPEN MENU</span></div>
        <div class="hint-item"><span class="hint-key">ESC</span><span class="hint-action">CLOSE</span></div>
      </div>
    </div>
    <div class="corner-bracket top-left"></div>
    <div class="corner-bracket top-right"></div>
    <div class="corner-bracket bottom-left"></div>
    <div class="corner-bracket bottom-right"></div>
  </div>
</template>

<style scoped>
.hud-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: var(--z-hud); padding: 20px; }
.hud-corner { position: absolute; display: flex; align-items: flex-start; gap: 12px; animation: fade-scale-in 0.5s ease forwards; }
.hud-top-left { top: 30px; left: 30px; }
.hud-top-right { top: 30px; right: 30px; flex-direction: column; align-items: flex-end; }
.hud-bottom-left { bottom: 30px; left: 30px; }
.hud-bottom-right { bottom: 30px; right: 30px; }
.arc-reactor { width: 50px; height: 50px; position: relative; }
.reactor-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--primary-cyan); border-radius: 50%; box-shadow: 0 0 20px var(--primary-cyan), 0 0 40px var(--primary-cyan), inset 0 0 10px rgba(255,255,255,0.5); animation: core-pulse 2s ease-in-out infinite; }
.reactor-ring { position: absolute; top: 50%; left: 50%; border: 1px solid var(--primary-cyan); border-radius: 50%; opacity: 0.6; }
.ring-1 { width: 26px; height: 26px; transform: translate(-50%, -50%); animation: ring-rotate 10s linear infinite; }
.ring-2 { width: 36px; height: 36px; transform: translate(-50%, -50%); animation: ring-rotate-reverse 15s linear infinite; border-style: dashed; }
.ring-3 { width: 46px; height: 46px; transform: translate(-50%, -50%); animation: ring-rotate 20s linear infinite; opacity: 0.3; }
.hud-info { display: flex; flex-direction: column; gap: 2px; }
.hud-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--primary-cyan); text-shadow: var(--glow-text); letter-spacing: 4px; }
.hud-subtitle { font-size: 0.65rem; color: var(--text-dim); letter-spacing: 2px; }
.system-info { text-align: right; }
.system-time { font-size: 1.5rem; color: var(--primary-cyan); text-shadow: var(--glow-text); letter-spacing: 2px; }
.system-date { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px; }
.system-status { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 0.7rem; color: var(--text-secondary); }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ff88; box-shadow: 0 0 10px #00ff88; animation: pulse-glow 2s ease-in-out infinite; }
.coord-display { display: flex; flex-direction: column; gap: 4px; }
.coord-label { font-size: 0.65rem; color: var(--text-dim); letter-spacing: 2px; }
.coord-value { font-size: 0.8rem; color: var(--primary-cyan); letter-spacing: 1px; }
.nav-hint { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
.hint-item { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; }
.hint-key { padding: 2px 6px; background: var(--hologram); border: 1px solid var(--hologram-border); color: var(--primary-cyan); }
.hint-action { color: var(--text-dim); letter-spacing: 1px; }
.corner-bracket { position: absolute; width: 40px; height: 40px; border-color: var(--hologram-border); border-style: solid; opacity: 0.5; }
.corner-bracket.top-left { top: 15px; left: 15px; border-width: 2px 0 0 2px; }
.corner-bracket.top-right { top: 15px; right: 15px; border-width: 2px 2px 0 0; }
.corner-bracket.bottom-left { bottom: 15px; left: 15px; border-width: 0 0 2px 2px; }
.corner-bracket.bottom-right { bottom: 15px; right: 15px; border-width: 0 2px 2px 0; }
@media (max-width: 768px) {
  .hud-corner { transform: scale(0.85); }
  .hud-top-left { top: 15px; left: 15px; }
  .hud-top-right { top: 15px; right: 15px; }
  .hud-bottom-left, .hud-bottom-right { display: none; }
}
</style>