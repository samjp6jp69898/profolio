<script setup lang="ts">
import ContentPanel from '@/components/ui/ContentPanel.vue'
</script>

<template>
  <ContentPanel panel-id="about">
    <div class="about-panel">
      <div class="about-header animate-item">
        <div class="avatar"><span class="avatar-icon">👨‍💻</span></div>
        <div class="intro">
          <h3 class="name font-display">YOUR NAME</h3>
          <p class="title font-mono">FRONTEND DEVELOPER</p>
        </div>
      </div>
      <div class="about-content animate-item">
        <p>熱愛前端開發的軟體工程師，擁有三年 Vue.js 開發經驗。從健身教練到英文老師，再到軟體工程師，每一段經歷都讓我成長。</p>
        <p>喜歡旅遊、攝影，也喜歡用程式碼創造有趣的互動體驗。這個網站就是我對鋼鐵人 JARVIS 介面的致敬。</p>
      </div>
      <div class="about-stats animate-item">
        <div class="stat"><span class="stat-value font-display">3+</span><span class="stat-label font-mono">YEARS EXP</span></div>
        <div class="stat"><span class="stat-value font-display">10+</span><span class="stat-label font-mono">PROJECTS</span></div>
        <div class="stat"><span class="stat-value font-display">6+</span><span class="stat-label font-mono">COUNTRIES</span></div>
      </div>
    </div>
  </ContentPanel>
</template>

<style scoped>
.about-panel { display: flex; flex-direction: column; gap: 30px; }
.about-header { display: flex; align-items: center; gap: 20px; }
.avatar { width: 80px; height: 80px; background: var(--hologram); border: 2px solid var(--hologram-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.avatar-icon { font-size: 2.5rem; }
.intro { display: flex; flex-direction: column; gap: 4px; }
.name { font-size: 1.5rem; color: var(--primary-cyan); text-shadow: var(--glow-text); margin: 0; letter-spacing: 3px; }
.title { font-size: 0.8rem; color: var(--text-dim); letter-spacing: 2px; }
.about-content { display: flex; flex-direction: column; gap: 16px; }
.about-content p { font-size: 1rem; color: var(--text-secondary); line-height: 1.8; }
.about-stats { display: flex; gap: 30px; padding: 20px; background: var(--hologram); border: 1px solid var(--hologram-border); }
.stat { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.stat-value { font-size: 2rem; color: var(--accent-gold); text-shadow: var(--glow-gold); }
.stat-label { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 1px; }
</style>