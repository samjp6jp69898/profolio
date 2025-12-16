<script setup lang="ts">
import ContentLayout from '@/components/layout/ContentLayout.vue'
import HoloCard from '@/components/ui/HoloCard.vue'
import { PanelItem } from '@/types';

const panelItem: PanelItem = {
    id: 'about',
    title: 'About',
    summary: 'About summary',
    content: 'About content',
    tags: ['CLEARANCE L10', 'ADMIN'],
    updated_at: '2024-12-15',
    status: 'completed',
    category: 'about',
}
</script>

<template>
    <ContentLayout title="PERSONNEL FILE">
        <div class="about-container">
            <HoloCard :item="panelItem" class="profile-card">
                <div class="profile-grid">
                    <div class="profile-item">
                        <span class="label">SUBJECT</span>
                        <span class="value text-cyan">Sam</span>
                    </div>
                    <div class="profile-item">
                        <span class="label">ROLE</span>
                        <span class="value">Frontend Engineer</span>
                    </div>
                    <div class="profile-item">
                        <span class="label">LOCATION</span>
                        <span class="value">Taiwan</span>
                    </div>
                    <div class="profile-item">
                        <span class="label">STATUS</span>
                        <span class="value text-gold">Active</span>
                    </div>
                    <div class="profile-item full-width">
                        <span class="label">SPECIALIZATION</span>
                        <span class="value">Vue.js Ecosystem, Creative Interaction, Advanced UI/UX</span>
                    </div>
                </div>
            </HoloCard>
        </div>
    </ContentLayout>
</template>

<style scoped>
.about-container {
    max-width: 800px;
    margin: 0 auto;
}

.profile-card {
    min-height: 300px;
}

.profile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 12px 0;
}

.profile-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.profile-item.full-width {
    grid-column: 1 / -1;
}

.label {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-dim);
    letter-spacing: 1px;
}

.value {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: #fff;
}
</style>
