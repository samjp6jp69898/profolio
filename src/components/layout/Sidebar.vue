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
                <span class="nav-indicator">▶</span>
                <span class="nav-text">{{ item.label }}</span>
                <div class="nav-bg"></div>
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

.nav-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.nav-item {
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s ease;
    overflow: hidden;
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.nav-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-cyan, #00d4ff);
    opacity: 0;
    z-index: 0;
    transition: opacity 0.3s;
}

.nav-text {
    position: relative;
    z-index: 1;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s;
}

.nav-indicator {
    position: relative;
    z-index: 1;
    margin-right: 10px;
    font-size: 0.8rem;
    color: var(--primary-cyan, #00d4ff);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
}

.nav-item:hover {
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.1);
}

.nav-item:hover .nav-bg {
    opacity: 0.1;
}

.nav-item:hover .nav-text {
    color: #fff;
}

.nav-item.active {
    border-color: var(--primary-cyan, #00d4ff);
    background: rgba(0, 212, 255, 0.15);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.nav-item.active .nav-text {
    color: var(--primary-cyan, #00d4ff);
    text-shadow: 0 0 8px rgba(0, 212, 255, 0.8);
}

.nav-item.active .nav-indicator {
    opacity: 1;
    transform: translateX(0);
}

.tech-specs {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
}

.spec-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.label {
    color: rgba(0, 212, 255, 0.6);
}
</style>
