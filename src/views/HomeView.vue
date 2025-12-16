<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { useContentStore } from '@/stores/contentStore'
import { storeToRefs } from 'pinia'

const store = useContentStore()
const { home } = storeToRefs(store)
</script>

<template>
    <ContentLayout title="MISSION DASHBOARD">
        <div class="home-list">
            <HoloCard v-for="item in home" :key="item.id" :item="item">
                <p>{{ item.summary }}</p>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.home-list {
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
