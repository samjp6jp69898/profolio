<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ContentPanel from '@/components/ui/ContentPanel.vue'

const categories = [
  { name: '前端開發', nameEn: 'FRONTEND', icon: '💻', skills: [{ name: 'Vue.js', level: 90 }, { name: 'TypeScript', level: 85 }, { name: 'JavaScript', level: 92 }, { name: 'HTML/CSS', level: 95 }] },
  { name: '工具', nameEn: 'TOOLS', icon: '🛠️', skills: [{ name: 'Git', level: 85 }, { name: 'Vite', level: 80 }, { name: 'GSAP', level: 70 }] },
  { name: '軟實力', nameEn: 'SOFT SKILLS', icon: '🎯', skills: [{ name: '團隊合作', level: 90 }, { name: '溝通能力', level: 88 }, { name: '英語能力', level: 85 }] }
]
const animated = ref<Record<string, number>>({})

onMounted(() => {
  categories.forEach(c => c.skills.forEach(s => animated.value[s.name] = 0))
  setTimeout(() => categories.forEach(c => c.skills.forEach(s => animated.value[s.name] = s.level)), 300)
})
</script>

<template>
  <ContentPanel panel-id="skills">
    <div class="skills-panel">
      <div v-for="cat in categories" :key="cat.nameEn" class="skill-category animate-item">
        <div class="category-header">
          <span class="category-icon">{{ cat.icon }}</span>
          <div class="category-title-group"><h3 class="category-title">{{ cat.name }}</h3><span class="category-title-en font-mono">{{ cat.nameEn }}</span></div>
        </div>
        <div class="skills-list">
          <div v-for="skill in cat.skills" :key="skill.name" class="skill-item">
            <div class="skill-header"><span class="skill-name">{{ skill.name }}</span><span class="skill-level font-mono">{{ skill.level }}%</span></div>
            <div class="skill-bar"><div class="skill-fill" :style="{ width: `${animated[skill.name] || 0}%` }"></div></div>
          </div>
        </div>
      </div>
    </div>
  </ContentPanel>
</template>

<style scoped>
.skills-panel { display: flex; flex-direction: column; gap: 30px; }
.skill-category { background: var(--hologram); border: 1px solid var(--hologram-border); padding: 20px; }
.category-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--hologram-border); }
.category-icon { font-size: 1.5rem; }
.category-title-group { display: flex; flex-direction: column; gap: 2px; }
.category-title { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; }
.category-title-en { font-size: 0.65rem; color: var(--text-dim); letter-spacing: 2px; }
.skills-list { display: flex; flex-direction: column; gap: 16px; }
.skill-item { display: flex; flex-direction: column; gap: 8px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; }
.skill-name { font-size: 0.9rem; color: var(--text-secondary); }
.skill-level { font-size: 0.75rem; color: var(--primary-cyan); }
.skill-bar { position: relative; height: 6px; background: var(--bg-dark); border: 1px solid var(--hologram-border); overflow: hidden; }
.skill-fill { height: 100%; background: linear-gradient(90deg, var(--secondary-blue), var(--primary-cyan)); transition: width 1s ease-out; box-shadow: 0 0 10px var(--primary-cyan); }
</style>