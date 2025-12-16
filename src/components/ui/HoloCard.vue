<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PanelItem } from '@/types'

const props = defineProps<{
    item: PanelItem
}>()

const displayTitle = computed(() => props.item?.title)
const displayTags = computed(() => props.item?.tags)
const displayDate = computed(() => {
    if (props.item?.updated_at) {
        return new Date(props.item.updated_at).toLocaleDateString()
    }
    return new Date(props.item.created_at).toLocaleDateString()
})
const displaySummary = computed(() => props.item?.summary)

// Randomized Hover Effects
const activeEffect = ref('flow-standard')
const effects = ['flow-standard', 'flow-reverse', 'flow-turbo', 'flow-single', 'flow-pulse']

function randomizeEffect() {
    const randomIndex = Math.floor(Math.random() * effects.length)
    activeEffect.value = effects[randomIndex]
}
</script>

<template>
    <div class="holo-card-wrapper">
        <div class="card-container" :class="activeEffect" @mouseenter="randomizeEffect">
            <!-- 頂部梯形金色裝飾 -->
            <div class="gold-trapezoid gold-trapezoid-top"></div>
            <!-- 底部梯形金色裝飾 -->
            <div class="gold-trapezoid gold-trapezoid-bottom"></div>

            <div class="card-outer-frame">
                <div class="card-spacer">
                    <div class="card-inner-frame">
                        <div class="card-content">
                            <!-- Content -->
                            <div v-if="displayTitle || (displayTags && displayTags.length)" class="card-header-section">
                                <h2 v-if="displayTitle" class="card-title">{{ displayTitle }}</h2>
                                <div v-if="displayTags && displayTags.length" class="card-tags">
                                    <span v-for="tag in displayTags" :key="tag" class="tag">{{ tag }}</span>
                                </div>
                            </div>

                            <div class="card-description">
                                <slot>
                                    {{ displaySummary }}
                                </slot>
                            </div>

                            <div class="decorative-line"></div>

                            <div class="card-footer">
                                <div class="card-icon">
                                    <svg viewBox="0 0 40 40">
                                        <rect x="8" y="8" width="24" height="24" rx="2" />
                                        <circle cx="20" cy="20" r="6" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="20" y1="26" x2="20" y2="32" />
                                        <line x1="8" y1="20" x2="14" y2="20" />
                                        <line x1="26" y1="20" x2="32" y2="20" />
                                        <circle cx="8" cy="8" r="2" />
                                        <circle cx="32" cy="8" r="2" />
                                        <circle cx="8" cy="32" r="2" />
                                        <circle cx="32" cy="32" r="2" />
                                    </svg>
                                </div>
                                <span v-if="displayDate" class="card-timestamp">{{ displayDate }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

.holo-card-wrapper {
    height: 100%;
    width: 100%;
}

.card-container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
}


/* 梯形金色裝飾 - 中間高光、兩側暗部 */
.gold-trapezoid {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    max-width: 200px;
    width: 50%;
    height: 11px;
    z-index: 999;
}

.gold-trapezoid-top {
    top: 0px;
}

.gold-trapezoid-bottom {
    bottom: -1px;
}

/* 雙層結構實現邊框：::after 為邊框底層，::before 為金屬面頂層 */
.gold-trapezoid::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    /* 亮金色邊框背景 */
    background: linear-gradient(90deg, #ffe082, #ffd54f, #ffca28, #ffecb3, #ffe082);
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.6);
}

.gold-trapezoid::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;

    background:
        /* 主金屬光澤 */
        linear-gradient(90deg,
            #3e3310 0%,
            #5c4b16 8%,
            #7a6420 16%,
            #a07d2a 26%,
            #c89a33 36%,
            #f2e6b5 48%,
            /* 白金高光 */
            #fff6d8 50%,
            /* 核心高光 */
            #f2e6b5 52%,
            #c89a33 64%,
            #a07d2a 74%,
            #7a6420 84%,
            #5c4b16 92%,
            #3e3310 100%),

        /* 垂直刷紋 */
        repeating-linear-gradient(90deg,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 1px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 3px);

    background-blend-mode: overlay;

    box-shadow:
        inset 0 1px 1px rgba(255, 255, 255, 0.35),
        inset 0 -1px 1px rgba(0, 0, 0, 0.45);
}

/* 頂部梯形設定 */
.gold-trapezoid-top::after,
.gold-trapezoid-top::before {
    clip-path: polygon(0% 0%, 100% 0%, 94% 100%, 6% 100%);
}

/* 頂部梯形 Metal Layer Offset - Hide Top Border */
.gold-trapezoid-top::before {
    top: 0;
    left: 1px;
    right: 1px;
    bottom: 2px;
}

/* 底部梯形設定 */
.gold-trapezoid-bottom::after,
.gold-trapezoid-bottom::before {
    clip-path: polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%);
}

/* 底部梯形 Metal Layer Offset - Hide Bottom Border */
.gold-trapezoid-bottom::before {
    bottom: 0;
    left: 1px;
    right: 1px;
    top: 2px;
}

@keyframes goldGlow {

    0%,
    100% {
        filter: drop-shadow(0 0 4px rgba(212, 165, 74, 0.6));
    }

    50% {
        filter: drop-shadow(0 0 12px rgba(245, 215, 142, 0.9));
    }
}

/* 外層邊框 - 青藍色霓虹 */
.card-outer-frame {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 3px;
    background: linear-gradient(180deg,
            #00d9ff 0%,
            #0891b2 10%,
            #065666 20%,
            #1a2530 35%,
            #0d1520 50%,
            #1a2530 65%,
            #065666 80%,
            #0891b2 90%,
            #00d9ff 100%);
    clip-path: polygon(0 20px,
            20px 0,
            /* Top taper */
            calc(50% - 120px) 0,
            calc(50% - 100px) 0px,
            calc(50% + 100px) 0px,
            calc(50% + 120px) 0,

            calc(100% - 20px) 0,
            100% 20px,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,

            /* Bottom taper */
            calc(50% + 120px) 100%,
            calc(50% + 100px) calc(100% - 0px),
            calc(50% - 100px) calc(100% - 0px),
            calc(50% - 120px) 100%,

            20px 100%,
            0 calc(100% - 20px));
    animation: cyanOuterGlow 2.5s ease-in-out infinite;
}

@keyframes cyanOuterGlow {

    0%,
    100% {
        filter: drop-shadow(0 0 5px rgba(0, 217, 255, 0.4));
    }

    50% {
        filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.7));
    }
}

/* 流動光效 - Hover Flow Effect */
/* 流動光效 - Hover Flow Effect */
.card-outer-frame::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    mix-blend-mode: screen;
}

/* Base Gradient - Default/Standard */
.card-container.flow-standard .card-outer-frame::before,
.card-container.flow-reverse .card-outer-frame::before,
.card-container.flow-turbo .card-outer-frame::before {
    background: conic-gradient(from 0deg,
            transparent 0deg,
            transparent 10deg,
            rgba(0, 217, 255, 0.9) 40deg,
            rgba(0, 217, 255, 0) 60deg,
            transparent 180deg,
            transparent 190deg,
            rgba(0, 217, 255, 0.9) 220deg,
            rgba(0, 217, 255, 0) 240deg);
}

/* Single Beam Gradient */
.card-container.flow-single .card-outer-frame::before {
    background: conic-gradient(from 0deg,
            transparent 0deg,
            rgba(0, 217, 255, 1) 20deg,
            transparent 40deg);
}

/* Hover Triggers */
.card-container:hover .card-outer-frame::before {
    opacity: 1;
}

/* Animation Variants */
.card-container.flow-standard:hover .card-outer-frame::before {
    animation: borderSpin 1.8s linear infinite;
}

.card-container.flow-reverse:hover .card-outer-frame::before {
    animation: borderSpin 1.6s linear infinite reverse;
}

.card-container.flow-turbo:hover .card-outer-frame::before {
    animation: borderSpin 1.4s linear infinite;
}

.card-container.flow-single:hover .card-outer-frame::before {
    animation: borderSpin 1.5s linear infinite;
}

@keyframes borderSpin {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

/* 間隔層 */
.card-spacer {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 4px;
    background: #0a1118;
    clip-path: polygon(0 18px,
            18px 0,
            calc(100% - 18px) 0,
            100% 18px,
            100% calc(100% - 18px),
            calc(100% - 18px) 100%,
            18px 100%,
            0 calc(100% - 18px));
}

/* 內層邊框 - 青藍色霓虹 */
.card-inner-frame {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2px;
    background: linear-gradient(180deg,
            #00d9ff 0%,
            #0891b2 15%,
            #065666 30%,
            #1e3a4a 50%,
            #065666 70%,
            #0891b2 85%,
            #00d9ff 100%);
    clip-path: polygon(
            /* Top Left */
            0 14px,
            14px 0,
            /* Top Notch */
            22.8% 0,
            28.2% 12px,
            71.8% 12px,
            77.2% 0,
            /* Top Right */
            calc(100% - 14px) 0,
            100% 14px,
            /* Bottom Right */
            100% calc(100% - 14px),
            calc(100% - 14px) 100%,
            /* Bottom Notch */
            77.2% 100%,
            71.8% calc(100% - 12px),
            28.2% calc(100% - 12px),
            22.8% 100%,
            /* Bottom Left */
            14px 100%,
            0 calc(100% - 14px));
    animation: cyanInnerGlow 2s ease-in-out infinite;
    animation-delay: 0.5s;
}

/* Inner Frame Flow Effect */
.card-inner-frame::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    transform: translate(-50%, -50%);
    z-index: 1;
    /* Above background, behind content (content is in .card-content) */
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    mix-blend-mode: screen;
}

/* Inner Frame Gradient Variants */
.card-container.flow-standard .card-inner-frame::before,
.card-container.flow-reverse .card-inner-frame::before,
.card-container.flow-turbo .card-inner-frame::before {
    background: conic-gradient(from 180deg,
            /* Offset from outer */
            transparent 0deg,
            transparent 10deg,
            rgba(0, 217, 255, 0.8) 40deg,
            rgba(0, 217, 255, 0) 60deg,
            transparent 180deg,
            transparent 190deg,
            rgba(0, 217, 255, 0.8) 220deg,
            rgba(0, 217, 255, 0) 240deg);
}

.card-container.flow-single .card-inner-frame::before {
    background: conic-gradient(from 180deg,
            transparent 0deg,
            rgba(0, 217, 255, 0.9) 20deg,
            transparent 40deg);
}


/* Gold Trapezoid Effects */
.card-container:hover .gold-trapezoid {
    filter: brightness(1.3) drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
    transition: filter 0.3s ease;
}

.card-container.flow-turbo:hover .gold-trapezoid {
    filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 200, 0, 0.8));
}

@keyframes cyanInnerGlow {

    0%,
    100% {
        filter: brightness(1);
    }

    50% {
        filter: brightness(1.2);
    }
}

@keyframes pulseGlow {

    0%,
    100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.95);
    }

    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.05);
    }
}

.card-content {
    position: relative;
    height: 100%;
    background: linear-gradient(180deg,
            #0d1a24 0%,
            #091218 30%,
            #0a151d 70%,
            #0d1a24 100%);
    padding: 28px 24px;
    clip-path: polygon(
            /* Top Left */
            0 12px,
            12px 0,
            /* Top Notch */
            25.0% 0,
            27.8% 10px,
            72.2% 10px,
            75.0% 0,
            /* Top Right */
            calc(100% - 12px) 0,
            100% 12px,
            /* Bottom Right */
            100% calc(100% - 12px),
            calc(100% - 12px) 100%,
            /* Bottom Notch */
            75.0% 100%,
            72.2% calc(100% - 10px),
            27.8% calc(100% - 10px),
            25.0% 100%,
            /* Bottom Left */
            12px 100%,
            0 calc(100% - 12px));
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* Scanline effect */
.card-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(0deg,
            transparent,
            transparent 2px,
            rgba(0, 217, 255, 0.02) 2px,
            rgba(0, 217, 255, 0.02) 4px);
    pointer-events: none;
    z-index: 1;
}

/* Noise texture overlay */
.card-content::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 1;
}

.card-header-section {
    margin-bottom: 16px;
    position: relative;
    z-index: 2;
}

.card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #00d9ff;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.3;
    margin: 0 0 8px 0;
    text-shadow:
        0 0 10px rgba(0, 217, 255, 0.5),
        0 0 20px rgba(0, 217, 255, 0.3);
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
}

.tag {
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.8rem;
    color: #d4a54a;
    border: 1px solid rgba(212, 165, 74, 0.3);
    padding: 2px 8px;
    background: rgba(212, 165, 74, 0.1);
    border-radius: 2px;
    text-transform: uppercase;
}

.card-description {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #7ec8cf;
    line-height: 1.6;
    letter-spacing: 0.5px;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
    flex-grow: 1;
}

.decorative-line {
    position: absolute;
    bottom: 60px;
    left: 24px;
    right: 80px;
    height: 1px;
    background: linear-gradient(90deg,
            transparent 0%,
            #00d9ff 10%,
            #00d9ff 90%,
            transparent 100%);
    opacity: 0.4;
    z-index: 2;
}

.decorative-line::before {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 7px;
    height: 7px;
    background: #00d9ff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0, 217, 255, 0.8);
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-top: auto;
}

.card-icon {
    width: 36px;
    height: 36px;
    position: relative;
}

.card-icon svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #00d9ff;
    stroke-width: 1.5;
    filter: drop-shadow(0 0 4px rgba(0, 217, 255, 0.6));
}

.card-timestamp {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: #d4a54a;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 0 8px rgba(212, 165, 74, 0.5);
}

/* Hover effects */
.card-container:hover {
    transform: translateY(-5px);
}

.card-container:hover .card-title {
    text-shadow:
        0 0 15px rgba(0, 217, 255, 0.7),
        0 0 30px rgba(0, 217, 255, 0.5);
}
</style>
