<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="view-container">
        <h2 class="section-title">{{ title }}</h2>
        <div class="content-list">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.view-container {
    padding: 20px;
    animation: fadeIn 0.5s ease-out;
    flex: 1;
    overflow: hidden;
}

.section-title {
    font-family: 'Orbitron', sans-serif;
    color: var(--primary-cyan, #00d4ff);
    margin-bottom: 20px;
    letter-spacing: 2px;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
    padding-bottom: 10px;
    display: inline-block;
    min-width: 300px;
}

.content-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
