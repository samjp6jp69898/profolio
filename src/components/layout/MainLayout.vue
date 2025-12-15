<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TopBar from './TopBar.vue'
import { useUIStore } from '@/stores/uiStore'
import HomeView from '@/views/HomeView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import AboutView from '@/views/AboutView.vue'
import { computed } from 'vue'

const uiStore = useUIStore()

const currentView = computed(() => {
    switch (uiStore.activePanel) {
        case 'articles': return ArticlesView
        case 'projects': return ProjectsView
        case 'about': return AboutView
        case 'dashboard':
        default: return HomeView
    }
})
</script>

<template>
    <div class="main-layout">
        <Sidebar />

        <div class="content-wrapper">
            <TopBar />
            <main class="main-content">
                <component :is="currentView" />
            </main>
        </div>
    </div>
</template>

<style scoped>
.main-layout {
    display: flex;
    min-height: 100vh;
    /* Background style handled by global app or AnimatedBackground */
}

.content-wrapper {
    margin-left: 280px;
    /* Sidebar width */
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
}

.main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .content-wrapper {
        margin-left: 0;
    }

    /* Need to handle sidebar toggle for mobile, skipping for now as per minimal viable layout */
}
</style>
