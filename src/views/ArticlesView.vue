<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import type { PanelItem } from '@/types'

const store = useContentStore()
const uiStore = useUIStore()
const { articles } = storeToRefs(store)

const openArticle = (article: PanelItem) => {
    uiStore.openDetail(article)
}
</script>

<template>
    <ContentLayout title="ARTICLES">
        <div class="articles-list">
            <HoloCard v-for="article in articles" :key="article.id" :item="article" @click="openArticle(article)">
                <p>{{ article.summary }}</p>
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

.article-card {
    cursor: pointer;
}
</style>
