<script setup lang="ts">
import ContentPanel from '@/components/ui/ContentPanel.vue'

const experiences = [
  { id: 'software', title: '軟體工程師', company: 'Software Engineer', period: '2022 - PRESENT', description: '三年前端開發經驗，專注於 Vue.js 生態系與互動式網頁應用開發。', tags: ['Vue.js', 'TypeScript', 'Frontend'], isCurrent: true },
  { id: 'teacher', title: '英文老師', company: 'English Teacher', period: '2020 - 2022', description: '正式進入教育領域，負責課程設計與教學。', tags: ['Teaching', 'Communication'] },
  { id: 'trainer', title: '健身教練', company: 'Fitness Trainer', period: '2018 - 2020', description: '第一份正職工作。學習目標設定、客戶管理與一對一指導技巧。', tags: ['Fitness', 'Goal Setting'] },
  { id: 'tutor', title: '補習班助教', company: 'Tutoring Assistant', period: '2016 - 2018', description: '學生時期的第一份打工經驗。在英文補習班擔任助教。', tags: ['Part-time', 'Education'] }
]
</script>

<template>
  <ContentPanel panel-id="work">
    <div class="timeline">
      <div v-for="(exp, index) in experiences" :key="exp.id" class="timeline-item animate-item" :class="{ 'is-current': exp.isCurrent }">
        <div class="timeline-node"><div class="node-dot"></div><div class="node-line" v-if="index < experiences.length - 1"></div></div>
        <div class="timeline-content">
          <div class="content-header">
            <div class="header-main"><h3 class="job-title">{{ exp.title }}</h3><span class="job-title-en font-mono">{{ exp.company }}</span></div>
            <div class="period-badge font-mono" :class="{ current: exp.isCurrent }">{{ exp.period }}</div>
          </div>
          <p class="job-description">{{ exp.description }}</p>
          <div class="job-tags"><span v-for="tag in exp.tags" :key="tag" class="tag font-mono">{{ tag }}</span></div>
        </div>
      </div>
    </div>
  </ContentPanel>
</template>

<style scoped>
.timeline { display: flex; flex-direction: column; }
.timeline-item { display: flex; gap: 24px; position: relative; }
.timeline-node { display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0; }
.node-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--bg-dark); border: 2px solid var(--hologram-border); position: relative; z-index: 1; transition: all 0.3s ease; }
.timeline-item.is-current .node-dot { border-color: var(--accent-gold); box-shadow: 0 0 15px var(--accent-gold); }
.timeline-item.is-current .node-dot::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 6px; height: 6px; background: var(--accent-gold); border-radius: 50%; }
.timeline-item:hover .node-dot { border-color: var(--primary-cyan); box-shadow: var(--glow-cyan); }
.node-line { width: 2px; flex: 1; background: linear-gradient(180deg, var(--hologram-border) 0%, var(--hologram-border) 50%, transparent 100%); min-height: 40px; }
.timeline-content { flex: 1; background: var(--hologram); border: 1px solid var(--hologram-border); padding: 20px 24px; margin-bottom: 24px; transition: all 0.3s ease; position: relative; }
.timeline-content::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--hologram-border); transition: background 0.3s ease; }
.timeline-item.is-current .timeline-content::before { background: var(--accent-gold); box-shadow: 0 0 10px var(--accent-gold); }
.timeline-content:hover { background: rgba(0,212,255,0.1); border-color: var(--primary-cyan); transform: translateX(5px); }
.timeline-content:hover::before { background: var(--primary-cyan); }
.content-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 16px; }
.header-main { display: flex; flex-direction: column; gap: 4px; }
.job-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 0; }
.timeline-item.is-current .job-title { color: var(--accent-gold); }
.job-title-en { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px; }
.period-badge { font-size: 0.7rem; padding: 4px 10px; background: var(--bg-dark); border: 1px solid var(--hologram-border); color: var(--text-secondary); letter-spacing: 1px; white-space: nowrap; }
.period-badge.current { background: rgba(255,215,0,0.1); border-color: var(--accent-gold); color: var(--accent-gold); }
.job-description { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px; }
.job-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { font-size: 0.65rem; padding: 3px 8px; background: var(--bg-dark); border: 1px solid var(--hologram-border); color: var(--primary-cyan); letter-spacing: 1px; }
</style>