<script setup lang="ts">
defineProps<{
    title?: string
    tags?: string[]
    date?: string
}>()
</script>

<template>
    <div class="holo-card">
        <!-- Top Layer: Title & Tags -->
        <div v-if="title || (tags && tags.length)" class="card-header">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <div v-if="tags && tags.length" class="card-tags">
                <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
        </div>

        <!-- Middle Layer: Description (Slot) -->
        <div class="card-content">
            <slot></slot>
        </div>

        <!-- Bottom Layer: Created time and Arrow -->
        <div v-if="date" class="card-footer">
            <span class="created-time">{{ date }}</span>
            <div class="entry-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>

        <div class="corner-bracket tl"></div>
        <div class="corner-bracket tr"></div>
        <div class="corner-bracket bl"></div>
        <div class="corner-bracket br"></div>
        <div class="scan-line"></div>
    </div>
</template>

<style scoped>
.holo-card {
    position: relative;
    background: rgba(10, 15, 20, 0.6);
    border: 1px solid rgba(0, 212, 255, 0.2);
    padding: 24px;
    backdrop-filter: blur(5px);
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 16px;
}

.holo-card:hover {
    border-color: rgba(0, 212, 255, 0.5);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
}

.card-title {
    font-family: var(--font-display);
    color: var(--primary-cyan);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
}

.card-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent-gold);
    border: 1px solid rgba(255, 215, 0, 0.3);
    padding: 2px 6px;
    border-radius: 2px;
    background: rgba(255, 215, 0, 0.05);
    text-transform: uppercase;
}

.card-content {
    flex: 1;
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.95rem;
    line-height: 1.5;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 212, 255, 0.1);
    margin-top: auto;
}

.created-time {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-dim);
}

.entry-arrow {
    color: var(--primary-cyan);
    opacity: 0.7;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.holo-card:hover .entry-arrow {
    transform: translateX(4px);
    opacity: 1;
    filter: drop-shadow(0 0 5px var(--primary-cyan));
}

.corner-bracket {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid var(--primary-cyan, #00d4ff);
    transition: all 0.3s ease;
}

.tl {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
}

.tr {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
}

.bl {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
}

.br {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
}

.holo-card:hover .corner-bracket {
    width: 15px;
    height: 15px;
    box-shadow: 0 0 5px var(--primary-cyan, #00d4ff);
}

.scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
    opacity: 0;
    animation: scan 4s linear infinite;
    pointer-events: none;
}

.holo-card:hover .scan-line {
    opacity: 0.5;
}

@keyframes scan {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(500%);
    }
}
</style>
