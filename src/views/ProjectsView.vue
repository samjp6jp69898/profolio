<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import type { PanelItem } from '@/types'

const store = useContentStore()
const uiStore = useUIStore()
const { projects } = storeToRefs(store)

const openProject = (project: PanelItem) => {
    uiStore.openDetail(project)
}
</script>

<template>
    <ContentLayout title="PROJECT BLUEPRINTS">
        <div class="projects-grid">
            <HoloCard v-for="project in projects" :key="project.id" :item="project" @click="openProject(project)">
                <p>{{ project.summary }}</p>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

p {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
}

.project-card {
    cursor: pointer;
}
</style>
