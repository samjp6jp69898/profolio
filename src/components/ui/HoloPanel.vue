<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { PanelItem } from '@/types'

const props = defineProps<{
    modelValue: boolean
    panelItem: PanelItem | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
    emit('update:modelValue', false)
}

// Close on escape key
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
        close()
    }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
    <Teleport to="body">
        <transition name="holo-fade">
            <div v-if="modelValue" class="holo-panel-overlay" @click.self="close">
                <div class="holo-panel-container">

                    <!-- Integrated Top Tab & Close Button -->
                    <div class="top-tab-structure">
                        <div class="tab-shape"></div>
                        <button class="close-btn" @click="close">
                            <span class="btn-text">CLOSE</span>
                            <div class="btn-icon">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <!-- Complex Tech Frame -->
                    <div class="frame-layer">
                        <!-- Top Left Complex -->
                        <svg class="tech-corner tl" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <!-- Outer Chamfered Frame -->
                            <path d="M 2 100 V 40 L 40 2 H 180" class="frame-primary" />
                            <!-- Inner Parallel Lines -->
                            <path d="M 12 180 V 45 L 45 12 H 160" class="frame-secondary" />
                            <path d="M 22 180 V 50 L 50 22 H 140" class="frame-tertiary" />
                            <!-- Decorative Nodes -->
                            <rect x="0" y="38" width="4" height="4" class="node-fill" />
                            <rect x="38" y="0" width="4" height="4" class="node-fill" />
                            <!-- Diagonal Detail -->
                            <path d="M 30 60 L 60 30" class="detail-line" />
                            <circle cx="30" cy="60" r="1.5" class="node-fill" />
                            <circle cx="60" cy="30" r="1.5" class="node-fill" />
                        </svg>

                        <!-- Top Right Complex -->
                        <svg class="tech-corner tr" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <path d="M 20 2 H 160 L 198 40 V 100" class="frame-primary" />
                            <path d="M 40 12 H 155 L 188 45 V 180" class="frame-secondary" />
                            <rect x="196" y="38" width="4" height="4" class="node-fill" />
                            <!-- Header connection decorative block -->
                            <rect x="80" y="0" width="60" height="6" class="deco-block" opacity="0.3" />
                            <rect x="80" y="8" width="60" height="2" class="deco-block" opacity="0.5" />
                        </svg>

                        <!-- Bottom Right Complex -->
                        <svg class="tech-corner br" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <!-- Outer Frame with Notch -->
                            <path d="M 198 100 V 160 L 160 198 H 100" class="frame-primary" />
                            <path d="M 188 20 V 155 L 155 188 H 40" class="frame-secondary" />
                            <path d="M 178 20 V 150 L 150 178 H 60" class="frame-tertiary" />
                            <rect x="196" y="158" width="4" height="4" class="node-fill" />
                            <rect x="158" y="196" width="4" height="4" class="node-fill" />
                        </svg>

                        <!-- Bottom Left Complex -->
                        <svg class="tech-corner bl" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <path d="M 100 198 H 40 L 2 160 V 100" class="frame-primary" />
                            <path d="M 160 188 H 45 L 12 155 V 20" class="frame-secondary" />
                            <rect x="0" y="158" width="4" height="4" class="node-fill" />
                            <rect x="38" y="196" width="4" height="4" class="node-fill" />
                            <!-- Corner Deco -->
                            <path d="M 15 140 L 25 150 H 50" class="detail-line" />
                        </svg>

                        <!-- Center Borders (Absolute Rects for cleanliness) -->
                        <div class="border-h top"></div>
                        <div class="border-h bottom"></div>
                        <div class="border-v left"></div>
                        <div class="border-v right"></div>
                    </div>

                    <!-- Inner Content Mask -->
                    <div class="panel-inner-mask" v-if="panelItem">
                        <div class="panel-bg"></div>
                        <div class="scan-line-vertical"></div>

                        <div class="panel-header">
                            <div class="title-group">
                                <div class="title-overline">PROJECT IDENTITY</div>
                                <h2 class="panel-title">{{ panelItem.title }}</h2>
                            </div>
                            <div class="header-decoration">
                                <div class="status-block">
                                    <div class="label">SYSTEM STATUS</div>
                                    <div class="value">ONLINE</div>
                                </div>
                                <div class="status-indicator"></div>
                            </div>
                        </div>

                        <div class="divider-line">
                            <div class="line-segment"></div>
                            <div class="line-marker"></div>
                            <div class="line-segment"></div>
                        </div>

                        <div v-if="panelItem.tags && panelItem.tags.length" class="panel-tags">
                            <span v-for="tag in panelItem.tags" :key="tag" class="panel-tag">{{ tag }}</span>
                        </div>

                        <div class="panel-content scrollbar-hide">
                            <p class="summary-text">{{ panelItem.summary }}</p>
                            <div class="full-content"
                                v-html="panelItem.content || 'ACCESS RESTRICTED: CONTENT PENDING'"></div>
                        </div>

                        <div class="panel-footer-deco">
                            <div class="deco-id">LAST UPDATE: {{ new Date(panelItem.updated_at).toLocaleDateString() ||
                                'N/A' }}</div>
                            <div class="footer-bars">
                                <div class="bar"></div>
                                <div class="bar"></div>
                                <div class="bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
/* Transitions */
.holo-fade-enter-active,
.holo-fade-leave-active {
    transition: opacity 0.3s ease;
}

.holo-fade-enter-from,
.holo-fade-leave-to {
    opacity: 0;
}

.holo-fade-enter-active .holo-panel-container {
    animation: openPanel 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.holo-fade-leave-active .holo-panel-container {
    animation: closePanel 0.3s ease-in forwards;
}

@keyframes openPanel {
    0% {
        transform: scale(0.95);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes closePanel {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(0.95);
        opacity: 0;
    }
}

/* Layout */
.holo-panel-overlay {
    position: fixed;
    inset: 0;
    background: rgba(3, 5, 8, 0.9);
    backdrop-filter: blur(10px);
    z-index: var(--z-panel);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.holo-panel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    height: 85vh;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    /* Space for the top tab overhang */
}

/* --- Tech Frame --- */
.frame-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 10;
}

.tech-corner {
    position: absolute;
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 5px var(--primary-cyan));
}

.tl {
    top: -2px;
    left: -2px;
}

.tr {
    top: -2px;
    right: -2px;
}

.br {
    bottom: -2px;
    right: -2px;
}

.bl {
    bottom: -2px;
    left: -2px;
}

.frame-primary {
    stroke: var(--primary-cyan);
    stroke-width: 3;
    fill: none;
    filter: drop-shadow(0 0 2px var(--primary-cyan));
}

.frame-secondary {
    stroke: var(--primary-cyan);
    stroke-width: 1;
    fill: none;
    opacity: 0.6;
}

.frame-tertiary {
    stroke: var(--primary-cyan);
    stroke-width: 0.5;
    fill: none;
    opacity: 0.3;
}

.node-fill,
.deco-block {
    fill: var(--primary-cyan);
}

.detail-line {
    stroke: var(--primary-cyan);
    stroke-width: 1;
}

/* Rectilinear Borders connecting corners */
.border-h {
    position: absolute;
    left: 170px;
    right: 170px;
    height: 2px;
    background: rgba(0, 212, 255, 0.3);
}

.border-h.top {
    top: 0;
}

.border-h.bottom {
    bottom: 0;
}

.border-v {
    position: absolute;
    top: 170px;
    bottom: 170px;
    width: 2px;
    background: rgba(0, 212, 255, 0.3);
}

.border-v.left {
    left: 0;
}

.border-v.right {
    right: 0;
}

/* --- Top Tab & Close Button --- */
.top-tab-structure {
    position: absolute;
    top: -80px;
    right: 10px;
    height: 55px;
    display: flex;
    align-items: center;
    z-index: 20;
}

.close-btn {
    background: var(--bg-dark);
    border: 1px solid var(--primary-cyan);
    border-bottom: none;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 24px;
    cursor: pointer;
    clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
    transition: all 0.2s ease;
}

.close-btn:hover {
    background: rgba(0, 212, 255, 0.15);
    padding-right: 30px;
}

.btn-text {
    font-family: var(--font-display);
    color: var(--primary-cyan);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 2px;
}

.btn-icon {
    color: var(--primary-cyan);
}

/* --- Inner Mask & Content --- */
.panel-inner-mask {
    position: absolute;
    inset: 4px;
    /* Inside the frame strokes */
    background: rgba(10, 16, 22, 0.85);
    /* Slightly clearer background */
    clip-path: polygon(40px 0, 100% 0,
            100% calc(100% - 40px), calc(100% - 40px) 100%,
            0 100%, 0 40px);
    /* Matches the chamfered corners of the frame */
    display: flex;
    flex-direction: column;
    padding: 60px 50px 40px 50px;
}

.panel-bg {
    position: absolute;
    inset: 0;
    opacity: 0.15;
    background-image:
        linear-gradient(var(--primary-cyan) 1px, transparent 1px),
        linear-gradient(90deg, var(--primary-cyan) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: -1;
}

/* Header */
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
}

.title-overline {
    font-family: var(--font-mono);
    color: var(--text-dim);
    font-size: 0.8rem;
    letter-spacing: 2px;
    margin-bottom: 4px;
}

.panel-title {
    font-family: var(--font-display);
    font-size: 3rem;
    color: #fff;
    text-transform: uppercase;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    line-height: 0.9;
}

.header-decoration {
    display: flex;
    align-items: center;
    gap: 15px;
}

.status-block {
    text-align: right;
    font-family: var(--font-mono);
}

.status-block .label {
    font-size: 10px;
    color: var(--text-dim);
}

.status-block .value {
    color: var(--primary-cyan);
    font-weight: bold;
}

.status-indicator {
    width: 6px;
    height: 6px;
    background: var(--primary-cyan);
    box-shadow: 0 0 5px var(--primary-cyan);
    border-radius: 50%;
    animation: blink 2s infinite;
}

.divider-line {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 2px;
    margin-bottom: 30px;
    opacity: 0.5;
}

.line-segment {
    flex: 1;
    height: 1px;
    background: var(--primary-cyan);
}

.line-marker {
    width: 40px;
    height: 4px;
    background: var(--primary-cyan);
}

/* Tags */
.panel-tags {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
}

.panel-tag {
    font-family: var(--font-mono);
    color: var(--accent-gold);
    border: 1px solid rgba(255, 215, 0, 0.4);
    padding: 6px 16px;
    font-size: 0.85rem;
    letter-spacing: 1px;
    background: rgba(255, 215, 0, 0.05);
}

/* Content */
.panel-content {
    flex: 1;
    overflow-y: auto;
    font-family: var(--font-body);
    font-size: 1.15rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    padding-right: 20px;
}

/* Scrollbar */
.panel-content::-webkit-scrollbar {
    width: 6px;
}

.panel-content::-webkit-scrollbar-thumb {
    background: var(--primary-cyan);
}

.panel-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
}

.summary-text {
    font-size: 1.2rem;
    color: var(--primary-cyan);
    margin-bottom: 2rem;
    font-weight: 500;
    font-family: 'Rajdhani', sans-serif;
}

.full-content {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.8;
    font-family: 'Rajdhani', sans-serif;
}

/* Footer */
.panel-footer-deco {
    margin-top: 30px;
    border-top: 1px solid rgba(0, 212, 255, 0.3);
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.deco-id {
    font-family: var(--font-mono);
    color: var(--text-dim);
    font-size: 0.8rem;
}

.footer-bars {
    display: flex;
    gap: 4px;
}

.bar {
    width: 20px;
    height: 4px;
    background: rgba(0, 212, 255, 0.3);
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}
</style>
