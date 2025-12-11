<template>
  <div class="hud-overlay">
    <!-- 頂部狀態列 -->
    <header class="top-bar">
      <div class="logo-section">
        <div class="arc-reactor-mini"></div>
        <span class="logo-text">PORTFOLIO</span>
      </div>
      <div class="status-section">
        <div class="status-item">
          <span class="status-dot online"></span>
          <span>SYSTEM ONLINE</span>
        </div>
        <div class="time-display">{{ currentTime }}</div>
      </div>
    </header>

    <!-- 角落框架 -->
    <div class="corner-frame top-left"></div>
    <div class="corner-frame top-right"></div>
    <div class="corner-frame bottom-left"></div>
    <div class="corner-frame bottom-right"></div>

    <!-- 側邊資訊面板 -->
    <aside class="side-panel left">
      <div class="panel-header">
        <span class="panel-icon">◈</span>
        <span>LOCATION</span>
      </div>
      <div class="panel-content">
        <div class="location-name">MAIN HALL</div>
        <div class="location-desc">Central Hub Interface</div>
      </div>
    </aside>

    <aside class="side-panel right">
      <div class="panel-header">
        <span class="panel-icon">◈</span>
        <span>CONTROLS</span>
      </div>
      <div class="panel-content">
        <div class="control-item">
          <span class="key">MOUSE</span>
          <span class="desc">Rotate View</span>
        </div>
        <div class="control-item">
          <span class="key">SCROLL</span>
          <span class="desc">Zoom In/Out</span>
        </div>
      </div>
    </aside>

    <!-- 中央提示 -->
    <div class="center-hint">
      <div class="hint-ring"></div>
      <div class="hint-text">
        <span class="hint-icon">⬡</span>
        <span>INTERACT TO EXPLORE</span>
      </div>
    </div>

    <!-- 底部導航 -->
    <nav class="bottom-nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="nav-button"
        :class="{ active: activeNav === item.id }"
        @click="selectNav(item.id)"
        @mouseenter="hoverNav = item.id"
        @mouseleave="hoverNav = null"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <div class="nav-underline"></div>
      </button>
    </nav>

    <!-- 掃描線效果 -->
    <div class="scanline"></div>

    <!-- 數據流裝飾 -->
    <div class="data-stream-left"></div>
    <div class="data-stream-right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const activeNav = ref('home')
const hoverNav = ref<string | null>(null)

const navItems = [
  { id: 'about', icon: '👤', label: '關於' },
  { id: 'work', icon: '💼', label: '工作' },
  { id: 'skills', icon: '⚡', label: '技能' },
  { id: 'travel', icon: '✈️', label: '旅遊' },
  { id: 'contact', icon: '📧', label: '聯絡' }
]

const selectNav = (id: string) => {
  activeNav.value = id
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

let timeInterval: number

onMounted(() => {
  updateTime()
  timeInterval = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<style scoped lang="scss">
$primary-cyan: #00d4ff;
$secondary-blue: #0a84ff;
$accent-gold: #ffd700;
$bg-dark: rgba(10, 10, 15, 0.8);
$hologram: rgba(0, 212, 255, 0.15);
$text-primary: #ffffff;
$text-dim: rgba(255, 255, 255, 0.4);

.hud-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
}

// 頂部狀態列
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(180deg, $bg-dark 0%, transparent 100%);
  pointer-events: auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.arc-reactor-mini {
  width: 35px;
  height: 35px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border: 2px solid $primary-cyan;
    border-radius: 50%;
    box-shadow: 0 0 15px $primary-cyan, inset 0 0 10px rgba(0, 212, 255, 0.3);
    animation: reactorPulse 2s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: $primary-cyan;
    border-radius: 50%;
    box-shadow: 0 0 10px $primary-cyan;
  }
}

@keyframes reactorPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 4px;
  background: linear-gradient(135deg, $primary-cyan, $secondary-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-section {
  display: flex;
  align-items: center;
  gap: 30px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: $text-dim;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  &.online {
    background: #00ff88;
    box-shadow: 0 0 10px #00ff88;
    animation: dotPulse 2s infinite;
  }
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.time-display {
  color: $primary-cyan;
  letter-spacing: 2px;
}

// 角落框架
.corner-frame {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid $primary-cyan;
  opacity: 0.4;

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

// 側邊面板
.side-panel {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 180px;
  background: $bg-dark;
  border: 1px solid $hologram;
  padding: 15px;
  pointer-events: auto;

  &.left {
    left: 30px;
  }

  &.right {
    right: 30px;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  color: $primary-cyan;
  letter-spacing: 2px;
  padding-bottom: 10px;
  border-bottom: 1px solid $hologram;
  margin-bottom: 10px;

  .panel-icon {
    font-size: 0.9rem;
  }
}

.panel-content {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
}

.location-name {
  color: $text-primary;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.location-desc {
  color: $text-dim;
}

.control-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  .key {
    color: $primary-cyan;
    font-weight: bold;
  }

  .desc {
    color: $text-dim;
  }
}

// 中央提示
.center-hint {
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  pointer-events: none;
}

.hint-ring {
  width: 60px;
  height: 60px;
  border: 2px solid $primary-cyan;
  border-radius: 50%;
  opacity: 0.5;
  animation: hintPulse 2s ease-in-out infinite;
}

@keyframes hintPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.5;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.hint-text {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: $text-dim;
  letter-spacing: 2px;

  .hint-icon {
    color: $primary-cyan;
    font-size: 1rem;
  }
}

// 底部導航
.bottom-nav {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  pointer-events: auto;
}

.nav-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 15px 25px;
  background: $bg-dark;
  border: 1px solid $hologram;
  color: $text-dim;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, $hologram, transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover, &.active {
    border-color: $primary-cyan;
    color: $primary-cyan;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }

  &.active {
    background: linear-gradient(180deg, rgba(0, 212, 255, 0.2), transparent);
  }
}

.nav-icon {
  font-size: 1.3rem;
}

.nav-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 1px;
}

.nav-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: $primary-cyan;
  transition: width 0.3s ease;
}

.nav-button:hover .nav-underline,
.nav-button.active .nav-underline {
  width: 80%;
}

// 掃描線
.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 50%,
    rgba(0, 212, 255, 0.015) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
}

// 數據流
.data-stream-left,
.data-stream-right {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    $primary-cyan 20%,
    $primary-cyan 80%,
    transparent 100%
  );
  opacity: 0.2;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -2px;
    width: 5px;
    height: 20px;
    background: $primary-cyan;
    box-shadow: 0 0 10px $primary-cyan;
    animation: streamFlow 4s linear infinite;
  }
}

.data-stream-left {
  left: 100px;
}

.data-stream-right {
  right: 100px;
  
  &::before {
    animation-delay: 2s;
  }
}

@keyframes streamFlow {
  0% { top: -20px; }
  100% { top: 100%; }
}

// 響應式
@media (max-width: 768px) {
  .side-panel {
    display: none;
  }

  .corner-frame {
    width: 40px;
    height: 40px;
  }

  .nav-button {
    padding: 10px 15px;
  }

  .nav-icon {
    font-size: 1.1rem;
  }

  .nav-label {
    font-size: 0.55rem;
  }

  .data-stream-left,
  .data-stream-right {
    display: none;
  }
}
</style>
