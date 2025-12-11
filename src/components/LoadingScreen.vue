<template>
  <Transition name="loading-fade">
    <div v-if="!isComplete" class="loading-screen">
      <!-- 背景網格 -->
      <div class="bg-grid"></div>
      
      <!-- 掃描線 -->
      <div class="scanline"></div>

      <!-- 浮動粒子 -->
      <div class="particles">
        <div
          v-for="i in 20"
          :key="i"
          class="particle"
          :style="{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }"
        ></div>
      </div>

      <!-- 主要內容 -->
      <div class="loading-content">
        <!-- Arc Reactor 核心 -->
        <div class="arc-reactor-container">
          <div class="arc-reactor">
            <div class="reactor-ring ring-1"></div>
            <div class="reactor-ring ring-2"></div>
            <div class="reactor-ring ring-3"></div>
            <div class="reactor-core"></div>
            <div class="reactor-glow"></div>
          </div>
          
          <!-- 環繞軌道 -->
          <div class="orbit orbit-1">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="orbit-dot"></div>
          </div>
        </div>

        <!-- 系統啟動文字 -->
        <div class="system-text">
          <div class="title-container">
            <h1 class="main-title" :class="{ 'glitch-active': glitchActive }">
              <span class="title-text">JARVIS</span>
              <span class="title-sub">PERSONAL INTERFACE</span>
            </h1>
          </div>

          <!-- 狀態訊息 -->
          <div class="status-messages">
            <TransitionGroup name="message-list">
              <div
                v-for="(message, index) in visibleMessages"
                :key="message.id"
                class="status-message"
                :class="{ 'completed': message.completed }"
              >
                <span class="message-prefix">[{{ message.timestamp }}]</span>
                <span class="message-text">{{ message.text }}</span>
                <span v-if="message.completed" class="message-status">OK</span>
                <span v-else class="message-loading">...</span>
              </div>
            </TransitionGroup>
          </div>
        </div>

        <!-- 進度條 -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
            <div class="progress-glow" :style="{ left: `${progress}%` }"></div>
          </div>
          <div class="progress-info">
            <span class="progress-label">SYSTEM INITIALIZATION</span>
            <span class="progress-value">{{ Math.floor(progress) }}%</span>
          </div>
        </div>

        <!-- 底部資訊 -->
        <div class="bottom-info">
          <div class="info-item">
            <span class="info-label">VERSION</span>
            <span class="info-value">1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">STATUS</span>
            <span class="info-value status-online">ONLINE</span>
          </div>
          <div class="info-item">
            <span class="info-label">USER</span>
            <span class="info-value">AUTHORIZED</span>
          </div>
        </div>
      </div>

      <!-- 角落裝飾 -->
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>

      <!-- 數據流 -->
      <div class="data-stream left"></div>
      <div class="data-stream right"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits<{
  (e: 'complete'): void
}>()

const progress = ref(0)
const isComplete = ref(false)
const glitchActive = ref(false)
const currentMessageIndex = ref(0)

interface StatusMessage {
  id: number
  text: string
  timestamp: string
  completed: boolean
}

const messages: StatusMessage[] = [
  { id: 1, text: 'Initializing core systems...', timestamp: '00:00:01', completed: false },
  { id: 2, text: 'Loading neural interface...', timestamp: '00:00:02', completed: false },
  { id: 3, text: 'Calibrating holographic display...', timestamp: '00:00:03', completed: false },
  { id: 4, text: 'Establishing secure connection...', timestamp: '00:00:04', completed: false },
  { id: 5, text: 'Rendering 3D environment...', timestamp: '00:00:05', completed: false },
  { id: 6, text: 'Loading user profile data...', timestamp: '00:00:06', completed: false },
  { id: 7, text: 'System ready. Welcome back.', timestamp: '00:00:07', completed: false }
]

const visibleMessages = computed(() => {
  return messages.slice(0, currentMessageIndex.value + 1)
})

// 模擬載入進度
const simulateLoading = () => {
  const duration = Math.random() * 1000 + 700 // 隨機 0.7 秒到 1.7 秒
  const startTime = Date.now()
  const messageInterval = duration / messages.length

  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const newProgress = Math.min((elapsed / duration) * 100, 100)
    progress.value = newProgress

    // 更新訊息
    const newMessageIndex = Math.min(
      Math.floor(elapsed / messageInterval),
      messages.length - 1
    )
    
    if (newMessageIndex > currentMessageIndex.value) {
      // 標記前一個訊息為完成
      if (currentMessageIndex.value >= 0) {
        messages[currentMessageIndex.value].completed = true
      }
      currentMessageIndex.value = newMessageIndex
    }

    // 隨機觸發 glitch 效果
    if (Math.random() < 0.02) {
      glitchActive.value = true
      setTimeout(() => {
        glitchActive.value = false
      }, 100)
    }

    if (newProgress < 100) {
      requestAnimationFrame(updateProgress)
    } else {
      // 標記最後一個訊息為完成
      messages[messages.length - 1].completed = true
      
      // 延遲後完成載入
      setTimeout(() => {
        isComplete.value = true
        emit('complete')
      }, 800)
    }
  }

  requestAnimationFrame(updateProgress)
}

onMounted(() => {
  // 稍微延遲開始載入，讓動畫先顯示
  setTimeout(simulateLoading, 500)
})
</script>

<style scoped lang="scss">
// 變數定義
$primary-cyan: #00d4ff;
$secondary-blue: #0a84ff;
$accent-gold: #ffd700;
$bg-dark: #0a0a0f;
$bg-darker: #050508;
$hologram: rgba(0, 212, 255, 0.15);
$text-primary: #ffffff;
$text-dim: rgba(255, 255, 255, 0.4);

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $bg-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

// 背景網格
.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridPulse 4s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
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
    rgba(0, 212, 255, 0.02) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
}

// 粒子
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: $primary-cyan;
    border-radius: 50%;
    box-shadow: 0 0 10px $primary-cyan;
    animation: particleFloat linear infinite;
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: translateY(-10vh) translateX(50px);
    opacity: 0;
  }
}

// 主要內容
.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  z-index: 10;
}

// Arc Reactor
.arc-reactor-container {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arc-reactor {
  position: relative;
  width: 120px;
  height: 120px;
}

.reactor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid $primary-cyan;

  &.ring-1 {
    width: 100%;
    height: 100%;
    animation: ringRotate 8s linear infinite;
    border-style: dashed;
  }

  &.ring-2 {
    width: 80%;
    height: 80%;
    animation: ringRotate 6s linear infinite reverse;
  }

  &.ring-3 {
    width: 60%;
    height: 60%;
    animation: ringRotate 4s linear infinite;
    border-style: dotted;
  }
}

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.reactor-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #fff 0%, $primary-cyan 40%, transparent 70%);
  border-radius: 50%;
  animation: corePulse 2s ease-in-out infinite;
}

@keyframes corePulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 30px $primary-cyan, 0 0 60px $primary-cyan;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 50px $primary-cyan, 0 0 100px $primary-cyan;
  }
}

.reactor-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

// 軌道
.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;

  &.orbit-1 {
    width: 140px;
    height: 140px;
    transform: translate(-50%, -50%);
    animation: orbitSpin 10s linear infinite;
  }

  &.orbit-2 {
    width: 160px;
    height: 160px;
    transform: translate(-50%, -50%);
    animation: orbitSpin 15s linear infinite reverse;
  }

  &.orbit-3 {
    width: 180px;
    height: 180px;
    transform: translate(-50%, -50%);
    animation: orbitSpin 20s linear infinite;
  }
}

@keyframes orbitSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.orbit-dot {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: $primary-cyan;
  border-radius: 50%;
  box-shadow: 0 0 10px $primary-cyan;
}

// 系統文字
.system-text {
  text-align: center;
}

.title-container {
  margin-bottom: 30px;
}

.main-title {
  font-family: 'Orbitron', sans-serif;
  margin: 0;

  .title-text {
    display: block;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 15px;
    background: linear-gradient(135deg, $primary-cyan, $secondary-blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  }

  .title-sub {
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 8px;
    color: $text-dim;
    margin-top: 10px;
  }

  &.glitch-active {
    animation: glitchText 0.1s linear;
  }
}

@keyframes glitchText {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}

// 狀態訊息
.status-messages {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  text-align: left;
  width: 400px;
  max-width: 90vw;
  height: 140px;
  overflow: hidden;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid $hologram;
  padding: 15px;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: $text-dim;

  .message-prefix {
    color: $primary-cyan;
  }

  .message-text {
    flex: 1;
  }

  .message-status {
    color: #00ff88;
    font-weight: bold;
  }

  .message-loading {
    color: $accent-gold;
    animation: loadingBlink 0.5s infinite;
  }

  &.completed {
    color: rgba(255, 255, 255, 0.6);
  }
}

@keyframes loadingBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

// 訊息列表動畫
.message-list-enter-active {
  transition: all 0.3s ease;
}

.message-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

// 進度條
.progress-container {
  width: 400px;
  max-width: 90vw;
}

.progress-bar {
  position: relative;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: visible;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $primary-cyan, $secondary-blue);
  border-radius: 2px;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px $primary-cyan;
}

.progress-glow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, $primary-cyan 0%, transparent 70%);
  transition: left 0.1s ease;
  margin-left: -10px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;

  .progress-label {
    color: $text-dim;
    letter-spacing: 2px;
  }

  .progress-value {
    color: $primary-cyan;
    font-weight: bold;
  }
}

// 底部資訊
.bottom-info {
  display: flex;
  gap: 40px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .info-label {
    color: $text-dim;
    letter-spacing: 2px;
  }

  .info-value {
    color: $primary-cyan;

    &.status-online {
      color: #00ff88;
      animation: statusPulse 2s infinite;
    }
  }
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

// 角落裝飾
.corner {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid $primary-cyan;
  opacity: 0.5;

  &.corner-tl {
    top: 30px;
    left: 30px;
    border-right: none;
    border-bottom: none;
  }

  &.corner-tr {
    top: 30px;
    right: 30px;
    border-left: none;
    border-bottom: none;
  }

  &.corner-bl {
    bottom: 30px;
    left: 30px;
    border-right: none;
    border-top: none;
  }

  &.corner-br {
    bottom: 30px;
    right: 30px;
    border-left: none;
    border-top: none;
  }
}

// 數據流
.data-stream {
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
  opacity: 0.3;

  &.left {
    left: 60px;
  }

  &.right {
    right: 60px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -2px;
    width: 5px;
    height: 20px;
    background: $primary-cyan;
    box-shadow: 0 0 10px $primary-cyan;
    animation: dataFlow 3s linear infinite;
  }
}

.data-stream.right::before {
  animation-delay: 1.5s;
}

@keyframes dataFlow {
  0% { top: -20px; }
  100% { top: 100%; }
}

// 過渡動畫
.loading-fade-leave-active {
  transition: all 0.8s ease;
}

.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

// 響應式
@media (max-width: 768px) {
  .main-title {
    .title-text {
      font-size: 2rem;
      letter-spacing: 10px;
    }

    .title-sub {
      font-size: 0.7rem;
      letter-spacing: 5px;
    }
  }

  .status-messages {
    width: 100%;
    font-size: 0.65rem;
  }

  .progress-container {
    width: 100%;
  }

  .bottom-info {
    gap: 20px;
    font-size: 0.6rem;
  }

  .corner {
    width: 40px;
    height: 40px;
  }

  .data-stream {
    display: none;
  }
}
</style>
