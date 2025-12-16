<script setup lang="ts">
import { useUIStore } from '@/stores/uiStore'
import { ref, onMounted, onUnmounted } from 'vue'

const uiStore = useUIStore()
const cpuUsage = ref(4)
const userNameRef = ref<HTMLElement | null>(null)
let intervalId: number
let shakeIntervalId: number
let shakeTimeoutId: number

function updateCpuUsage() {
    // Randomize CPU usage between 2% and 8%
    cpuUsage.value = Math.floor(Math.random() * (8 - 2 + 1) + 2)
}

function triggerShake() {
    if (userNameRef.value) {
        userNameRef.value.style.animationPlayState = 'running, running'

        shakeTimeoutId = window.setTimeout(() => {
            if (userNameRef.value) {
                userNameRef.value.style.animationPlayState = 'running, paused'
            }
        }, 400)
    }
}

onMounted(() => {
    intervalId = window.setInterval(updateCpuUsage, 2000)

    // Initial delay then start shake interval
    shakeTimeoutId = window.setTimeout(() => {
        triggerShake()
        shakeIntervalId = window.setInterval(triggerShake, 3000)
    }, 1500)
})

onUnmounted(() => {
    clearInterval(intervalId)
    clearInterval(shakeIntervalId)
    clearTimeout(shakeTimeoutId)
})

const items = [
    { id: 'dashboard', label: 'HOME', icon: '🏠' },
    { id: 'articles', label: 'ARTICLES', icon: '📄' },
    { id: 'projects', label: 'PROJECTS', icon: '🛠️' },
    { id: 'about', label: 'ABOUT', icon: '👤' }
]

function setActive(id: string) {
    // mapping old flow to new: we treat panelId as the view id
    uiStore.openPanel(id)
    // close holo panel
    uiStore.closeDetail()
}
</script>

<template>
    <aside class="sidebar">
        <!-- Top Section: Arc Reactor & Identity -->
        <div class="identity-section">
            <div class="logo-container">
                <div class="arc-reactor">
                    <div class="core"></div>
                </div>
            </div>
            <h1 class="user-name" ref="userNameRef">SAM</h1>
        </div>

        <!-- Navigation -->
        <nav class="nav-menu">
            <div v-for="item in items" :key="item.id" class="nav-item"
                :class="{ active: uiStore.activePanel === item.id || (item.id === 'dashboard' && !uiStore.activePanel) }"
                @click="setActive(item.id)">

                <svg class="border-svg" viewBox="0 0 280 52" preserveAspectRatio="none">
                    <path class="border-path" d="M 1 1 
                             L 279 1 
                             L 280 39 
                             L 262 51 
                             L 1 51 
                             Z" fill="none" stroke-width="2" />
                </svg>

                <div class="gold-bar"></div>
                <!-- <div class="triangle-left"
                    v-if="uiStore.activePanel === item.id || (item.id === 'dashboard' && !uiStore.activePanel)"></div> -->

                <span class="nav-text">{{ item.label }}</span>

                <div class="corner-triangle"></div>
            </div>
        </nav>

        <!-- Bottom: Tech Specs -->
        <div class="tech-specs">
            <div class="spec-row">
                <span class="label">CPU:</span>
                <span class="value">{{ cpuUsage }}% [OPTIMAL]</span>
            </div>
            <div class="spec-row">
                <span class="label">LOC:</span>
                <span class="value">34.05N, 118.24W</span>
            </div>
            <div class="spec-row">
                <span class="label">SYS:</span>
                <span class="value">ONLINE</span>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 280px;
    height: 100vh;
    background: rgba(10, 10, 15, 0.95);
    border-right: 1px solid var(--grid-line, rgba(0, 212, 255, 0.1));
    display: flex;
    flex-direction: column;
    padding: 30px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
}

.identity-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
}

.arc-reactor {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid var(--primary-cyan, #00d4ff);
    box-shadow: 0 0 15px var(--primary-cyan, #00d4ff);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: pulse 3s infinite ease-in-out;
}

.core {
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 20px #fff, 0 0 40px var(--primary-cyan, #00d4ff);
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.8;
        box-shadow: 0 0 15px var(--primary-cyan, #00d4ff);
    }

    50% {
        opacity: 1;
        box-shadow: 0 0 25px var(--primary-cyan, #00d4ff), 0 0 10px #fff;
    }
}

.user-name {
    margin-top: 20px;
    font-family: 'Orbitron', sans-serif;
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    z-index: 10;

    /* Metallic Gradient - Cyan/Steel Style */
    background: linear-gradient(180deg,
            #062c38 0%,
            /* Dark Deep Cyan */
            #0e7490 20%,
            /* Dark Cyan */
            #22d3ee 48%,
            /* Bright Cyan */
            #aadbfc 50%,
            /* White Highlight (Horizon) */
            #22d3ee 52%,
            /* Bright Cyan */
            #0e7490 80%,
            /* Dark Cyan */
            #062c38 100%
            /* Dark Deep Cyan */
        );

    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Chrome/Metal Stroke Effect */
    -webkit-text-stroke: 1.5px rgba(156, 212, 255, 0.8);
    /* #ffe082 HoloCard Gold */

    /* Metallic Shine & Glow */
    filter:
        drop-shadow(0 2px 0px rgba(0, 0, 0, 0.5))
        /* Hard shadow for depth */
        drop-shadow(0 0 10px rgba(8, 145, 178, 0.4))
        /* Soft cyan glow reduced */
        drop-shadow(0 0 15px rgba(255, 215, 0, 0.2));
    /* Faint gold ambient glow */

    /* Animated Metal Sheen */
    animation: metalSheen 6s linear infinite;
}

/* Reflection Effect */
.user-name::after {
    content: 'SAM';
    position: absolute;
    left: 0;
    top: 90%;
    /* Slight overlap for better reflection connection */
    width: 100%;
    height: 100%;

    /* Faded reflection gradient */
    background: linear-gradient(180deg,
            rgba(34, 211, 238, 0.25) 0%,
            rgba(8, 145, 178, 0.1) 40%,
            transparent 80%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    transform: scaleY(-0.6) perspective(500px) rotateX(20deg);
    transform-origin: top;
    filter: blur(2px);
    opacity: 0.5;
    pointer-events: none;
    z-index: -1;
}

@keyframes metalSheen {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 200% 50%;
    }
}

/* Soft Glow Pulse - Refined for sharpness */
@keyframes glowPulse {

    0%,
    100% {
        filter:
            drop-shadow(0 0 2px rgba(0, 217, 255, 0.9)) drop-shadow(0 0 5px rgba(0, 217, 255, 0.6)) drop-shadow(0 0 12px rgba(0, 217, 255, 0.4));
    }

    50% {
        filter:
            drop-shadow(0 0 3px rgba(180, 245, 255, 0.9)) drop-shadow(0 0 8px rgba(0, 217, 255, 0.7)) drop-shadow(0 0 18px rgba(0, 217, 255, 0.5));
    }
}

/* Left-Right Shake Effect */
@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-1px);
    }

    75% {
        transform: translateX(1px);
    }
}

/* Navigation Menu */
.nav-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 20px;
    /* Increased to accommodate left-hanging decorations */
}

/* Base Nav Item */
.nav-item {
    position: relative;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba(10, 15, 25, 0.8);
    transition: all 0.3s ease;
    border: none;
    /* Reset existing border style */
    padding: 0;
    /* Content centered */
}

/* Variables matching reference */
.nav-item {
    --cyan-neon: #00f5ff;
    --cyan-glow: rgba(0, 245, 255, 0.5);
    --cyan-border-inactive: rgba(0, 245, 255, 0.35);
    --dark-gold: #c89a33;
}

/* ========== GOLD BAR (shared) - Outside left border ========== */
.gold-bar {
    position: absolute;
    left: -8px;
    /* Outside the left border */
    top: 4px;
    bottom: 4px;
    width: 3px;
    background: linear-gradient(180deg,
            #3e3310 0%,
            #5c4b16 8%,
            #7a6420 16%,
            #a07d2a 26%,
            #c89a33 36%,
            #f2e6b5 48%,
            #fff6d8 50%,
            #f2e6b5 52%,
            #c89a33 64%,
            #a07d2a 74%,
            #7a6420 84%,
            #5c4b16 92%,
            #3e3310 100%);
    transition: filter 0.3s ease;
}

/* Active item gold bar with brightness 1.2 */
.nav-item.active .gold-bar {
    filter: brightness(1.2);
}

/* Dark Gold Triangle - Bottom Right Corner */
.corner-triangle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 8px;
    height: 8px;
    background: linear-gradient(180deg,
            #c89a33 0%,
            #f2e6b5 40%,
            #f2e6b5 60%,
            #c89a33 100%);

    clip-path: polygon(0 100%, 100% 100%, 100% 0);
    z-index: 2;
}

/* Border SVG */
.border-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.border-path {
    transition: stroke 0.3s ease;
}

/* ========== INACTIVE ITEM ========== */
.nav-item:not(.active) .border-path {
    stroke: var(--cyan-border-inactive);
}

.nav-item:not(.active) .nav-text {
    color: rgba(200, 200, 210, 0.85);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 3px;
    text-shadow: none;
}

/* Hover Effects for Inactive */
.nav-item:not(.active):hover .border-path {
    stroke: rgba(0, 245, 255, 0.5);
}

.nav-item:not(.active):hover .nav-text {
    color: rgba(230, 230, 240, 0.95);
}

/* ========== ACTIVE ITEM ========== */
.nav-item.active {
    background:
        linear-gradient(180deg,
            rgba(0, 245, 255, 0.12) 0%,
            rgba(0, 180, 200, 0.06) 50%,
            rgba(0, 245, 255, 0.12) 100%);
}

.nav-item.active .border-svg {
    filter: drop-shadow(0 0 4px var(--cyan-neon)) drop-shadow(0 0 8px var(--cyan-glow));
    animation: borderGlow 2s ease-in-out infinite;
}

.nav-item.active .border-path {
    stroke: var(--cyan-neon);
}

/* Cyan Triangle - Left Side (Active) */
.triangle-left {
    position: absolute;
    left: -24px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 12px;
    border-color: transparent transparent transparent var(--cyan-neon);
    filter: drop-shadow(0 0 6px var(--cyan-neon)) drop-shadow(0 0 10px var(--cyan-glow));
    animation: trianglePulse 2s ease-in-out infinite;
}

.nav-item.active .nav-text {
    color: var(--cyan-neon);
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 4px;
    text-shadow:
        0 0 8px var(--cyan-glow),
        0 0 15px var(--cyan-glow);
}

/* Animations */
@keyframes trianglePulse {

    0%,
    100% {
        filter: drop-shadow(0 0 6px var(--cyan-neon)) drop-shadow(0 0 10px var(--cyan-glow));
    }

    50% {
        filter: drop-shadow(0 0 10px var(--cyan-neon)) drop-shadow(0 0 18px var(--cyan-glow));
    }
}

@keyframes borderGlow {

    0%,
    100% {
        filter: drop-shadow(0 0 4px var(--cyan-neon)) drop-shadow(0 0 8px var(--cyan-glow));
    }

    50% {
        filter: drop-shadow(0 0 6px var(--cyan-neon)) drop-shadow(0 0 12px var(--cyan-glow)) drop-shadow(0 0 20px rgba(0, 245, 255, 0.3));
    }
}

.nav-text {
    position: relative;
    z-index: 2;
    font-family: 'Orbitron', monospace;
    transition: all 0.3s ease;
}

.tech-specs {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;

    /* Cyan-Blue Neon Gradient Text */
    background: linear-gradient(180deg, #00f5ff 0%, #00aaff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    font-weight: 500;
}

.spec-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.label {
    /* Inherit gradient from parent */
    color: inherit;
}
</style>
