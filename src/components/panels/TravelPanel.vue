<script setup lang="ts">
import ContentPanel from '@/components/ui/ContentPanel.vue'

const photos = [
  { id: '1', location: '東京', country: 'JAPAN', date: '2024.03', icon: '🗼' },
  { id: '2', location: '大阪', country: 'JAPAN', date: '2024.03', icon: '🏯' },
  { id: '3', location: '首爾', country: 'KOREA', date: '2023.11', icon: '🎡' },
  { id: '4', location: '曼谷', country: 'THAILAND', date: '2023.08', icon: '🛕' },
  { id: '5', location: '新加坡', country: 'SINGAPORE', date: '2023.05', icon: '🌴' },
  { id: '6', location: '香港', country: 'HONG KONG', date: '2022.12', icon: '🌃' },
]
</script>

<template>
  <ContentPanel panel-id="travel">
    <div class="travel-panel">
      <p class="travel-intro animate-item">探索世界各地的美景，用影像記錄每一次冒險與發現。</p>
      <div class="photo-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-card animate-item">
          <div class="photo-placeholder"><span class="placeholder-icon">{{ photo.icon }}</span><span class="placeholder-text font-mono">PHOTO</span></div>
          <div class="photo-info"><div class="photo-location">{{ photo.location }}</div><div class="photo-meta font-mono"><span>{{ photo.country }}</span><span>{{ photo.date }}</span></div></div>
        </div>
      </div>
    </div>
  </ContentPanel>
</template>

<style scoped>
.travel-panel { display: flex; flex-direction: column; gap: 24px; }
.travel-intro { font-size: 1rem; color: var(--text-secondary); line-height: 1.7; }
.photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.photo-card { background: var(--hologram); border: 1px solid var(--hologram-border); overflow: hidden; transition: all 0.3s ease; cursor: pointer; }
.photo-card:hover { border-color: var(--primary-cyan); transform: translateY(-5px); box-shadow: var(--glow-cyan); }
.photo-placeholder { aspect-ratio: 4/3; background: var(--bg-dark); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border-bottom: 1px solid var(--hologram-border); }
.placeholder-icon { font-size: 2.5rem; opacity: 0.5; }
.placeholder-text { font-size: 0.65rem; color: var(--text-dim); letter-spacing: 2px; }
.photo-info { padding: 12px; }
.photo-location { font-family: var(--font-display); font-size: 1rem; color: var(--text-primary); margin-bottom: 4px; }
.photo-meta { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-dim); letter-spacing: 1px; }
</style>