<template>
  <div class="hud-container">
    <!-- 頂部 HUD -->
    <header class="top-hud">
      <div class="logo-section">
        <div class="arc-reactor"></div>
        <div class="logo-text glitch" data-text="PORTFOLIO">PORTFOLIO</div>
      </div>
      <div class="system-status">
        <div class="status-line">
          <span class="status-indicator"></span>
          <span>SYSTEM ONLINE</span>
        </div>
        <div class="version">VER 1.0.0 | 2024</div>
        <div class="visitor" ref="visitorCounter">VISITOR #00001</div>
      </div>
    </header>

    <!-- 角落括號 -->
    <div class="corner-brackets">
      <div class="corner-bracket top-left"></div>
      <div class="corner-bracket top-right"></div>
      <div class="corner-bracket bottom-left"></div>
      <div class="corner-bracket bottom-right"></div>
    </div>

    <!-- 掃描線 -->
    <div class="scan-line"></div>

    <!-- 粒子效果 -->
    <div class="particles">
      <div
        v-for="i in 12"
        :key="i"
        class="particle"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }"
      ></div>
    </div>

    <!-- 導航環 -->
    <nav class="nav-ring">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="setActiveNav(item.id)"
      >
        {{ item.label }}
      </button>
    </nav>

    <!-- 控制說明 -->
    <div class="controls-info">
      <div class="control-hint">
        <span class="key">MOUSE</span>
        <span class="action">ROTATE VIEW</span>
      </div>
      <div class="control-hint">
        <span class="key">WHEEL</span>
        <span class="action">ZOOM</span>
      </div>
    </div>

    <!-- 載入文字 -->
    <div class="loading-text">INITIALIZING 3D ENVIRONMENT</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visitorCounter = ref()
const activeNav = ref('home')

const navItems = [
  { id: 'home', label: '首頁 HOME' },
  { id: 'about', label: '關於 ABOUT' },
  { id: 'experience', label: '經歷 EXPERIENCE' },
  { id: 'skills', label: '技能 SKILLS' },
  { id: 'travel', label: '旅遊 TRAVEL' },
  { id: 'contact', label: '聯絡 CONTACT' }
]

let visitorInterval: number | null = null

const setActiveNav = (navId: string) => {
  activeNav.value = navId
}

// 隨機訪客計數器
const updateVisitorCounter = () => {
  if (visitorCounter.value) {
    const num = Math.floor(Math.random() * 99999).toString().padStart(5, '0')
    visitorCounter.value.textContent = `VISITOR #${num}`
  }
}

onMounted(() => {
  // 啟動訪客計數器動畫
  visitorInterval = window.setInterval(updateVisitorCounter, 5000)
})

onUnmounted(() => {
  if (visitorInterval) {
    window.clearInterval(visitorInterval)
  }
})
</script>

<style scoped lang="scss">
:root {
  --primary-cyan: #00d4ff;
  --secondary-blue: #0a84ff;
  --accent-gold: #ffd700;
  --warning-red: #ff3b30;
  --bg-dark: #0a0a0f;
  --bg-darker: #050508;
  --grid-line: rgba(0, 212, 255, 0.08);
  --hologram: rgba(0, 212, 255, 0.15);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-dim: rgba(255, 255, 255, 0.4);
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3);
}

.hud-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
}

.top-hud {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid var(--hologram);
  pointer-events: auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.arc-reactor {
  width: 50px;
  height: 50px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-cyan);
    border-radius: 50%;
    box-shadow: var(--glow-cyan), inset 0 0 20px rgba(0, 212, 255, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    background: var(--primary-cyan);
    border-radius: 50%;
    box-shadow: var(--glow-cyan);
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.95); }
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(135deg, var(--primary-cyan), var(--secondary-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.system-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-dim);

  .status-line {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff88;
    animation: blink 2s infinite;
  }

  .version, .visitor {
    margin-top: 5px;
  }

  .visitor {
    color: var(--primary-cyan);
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.corner-brackets {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .corner-bracket {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 2px solid var(--primary-cyan);

    &.top-left {
      top: 20px;
      left: 20px;
      border-right: none;
      border-bottom: none;
    }

    &.top-right {
      top: 20px;
      right: 20px;
      border-left: none;
      border-bottom: none;
    }

    &.bottom-left {
      bottom: 20px;
      left: 20px;
      border-right: none;
      border-top: none;
    }

    &.bottom-right {
      bottom: 20px;
      right: 20px;
      border-left: none;
      border-top: none;
    }
  }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 50%,
    rgba(0, 212, 255, 0.02) 50%
  );
  background-size: 100% 4px;
  animation: scanMove 8s linear infinite;
}

@keyframes scanMove {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--primary-cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--primary-cyan);
    animation: float 12s infinite linear;
  }
}

@keyframes float {
  0% { transform: translateY(100vh) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-10vh) translateX(100px); opacity: 0; }
}

.nav-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  pointer-events: auto;
  z-index: 200;
}

.nav-item {
  padding: 12px 25px;
  background: transparent;
  border: 1px solid var(--hologram);
  color: var(--text-secondary);
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--hologram), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: var(--hologram);
    color: var(--primary-cyan);
    border-color: var(--primary-cyan);
    box-shadow: var(--glow-cyan);
  }

  &.active {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(10, 132, 255, 0.2));
    border-color: var(--primary-cyan);
    color: var(--primary-cyan);
  }
}

.controls-info {
  position: absolute;
  bottom: 30px;
  left: 30px;
  font-family: 'Share Tech Mono', monospace;

  .control-hint {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 8px;

    .key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      height: 28px;
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid var(--primary-cyan);
      color: var(--primary-cyan);
      font-size: 0.7rem;
      font-weight: bold;
      text-align: center;
    }

    .action {
      color: var(--text-secondary);
      font-size: 0.7rem;
      letter-spacing: 1px;
    }
  }
}

.loading-text {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: var(--primary-cyan);
  letter-spacing: 2px;

  &::after {
    content: '';
    animation: loadingDots 1.5s infinite;
  }
}

@keyframes loadingDots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
}

.glitch {
  position: relative;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    animation: glitch-1 0.3s infinite linear alternate-reverse;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    -webkit-text-fill-color: var(--primary-cyan);
  }

  &::after {
    animation: glitch-2 0.3s infinite linear alternate-reverse;
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
    -webkit-text-fill-color: var(--warning-red);
  }
}

@keyframes glitch-1 {
  0% { transform: translateX(0); }
  100% { transform: translateX(2px); }
}

@keyframes glitch-2 {
  0% { transform: translateX(0); }
  100% { transform: translateX(-2px); }
}

@media (max-width: 768px) {
  .nav-ring {
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    padding: 10px 15px;
    font-size: 0.75rem;
  }

  .top-hud {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .controls-info {
    bottom: 100px;
  }
}
</style>