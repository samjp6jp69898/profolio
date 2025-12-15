<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { storeToRefs } from 'pinia'

const store = useContentStore()
const { articles } = storeToRefs(store)
</script>

<template>
    <ContentLayout title="AERIAL LOGS (ARTICLES)">
        <div class="articles-list">
            <HoloCard v-for="article in articles" :key="article.id" :title="article.title" :tags="article.tags"
                :date="article.date" class="article-card">
                <p>{{ article.description }}</p>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.articles-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

p {
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
}
</style>
