<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { computed } from 'vue'

const store = useContentStore()
const latestProject = computed(() => store.projects[0])
const latestArticle = computed(() => store.articles[0])
const today = new Date().toISOString().split('T')[0]
</script>

<template>
    <ContentLayout title="MISSION DASHBOARD">
        <div class="dashboard-grid">
            <HoloCard title="SYSTEM STATUS" :tags="['ONLINE', 'STABLE']" :date="today" class="status-card">
                <p class="welcome-text">Welcome back, <span class="text-cyan">Sam</span>.</p>
                <p>System operating at peak efficiency. New mission data available for review.</p>
            </HoloCard>

            <HoloCard v-if="latestArticle" title="LATEST LOG" :tags="['ARTICLE']" :date="latestArticle.date">
                <p class="item-title">{{ latestArticle.title }}</p>
                <p class="item-desc">{{ latestArticle.description }}</p>
            </HoloCard>

            <HoloCard v-if="latestProject" title="CURRENT OBJECTIVE" :tags="['PROJECT']" :date="latestProject.date">
                <p class="item-title">{{ latestProject.title }}</p>
                <p class="item-desc">{{ latestProject.description }}</p>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.status-card {
    grid-column: 1 / -1;
}

.welcome-text {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #fff;
}

.item-title {
    color: var(--primary-cyan);
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 0.5rem;
}

.item-desc {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
}

p {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
}
</style>
