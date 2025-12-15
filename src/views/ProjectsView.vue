<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { storeToRefs } from 'pinia'

const store = useContentStore()
const { projects } = storeToRefs(store)
</script>

<template>
    <ContentLayout title="PROJECT BLUEPRINTS">
        <div class="projects-grid">
            <HoloCard v-for="project in projects" :key="project.id" :title="project.title" :tags="project.tags"
                :date="project.date" class="project-card">
                <p>{{ project.description }}</p>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
}

p {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
}
</style>
