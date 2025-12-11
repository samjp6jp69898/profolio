import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface SkillsPanelData extends BasePanelData {
  readonly type: 'skills'
  categories: Array<{
    id: string
    name: string
    skills: Array<{
      name: string
      level: number // 0-100
      experience: string
    }>
  }>
}

export class SkillsPanel extends Panel<SkillsPanelData> {
  readonly info: PanelInfo = {
    id: 'skills',
    icon: '⚡',
    title: '技能',
    titleEn: 'SKILLS'
  }

  readonly data: SkillsPanelData = {
    type: 'skills',
    categories: [
      {
        id: 'frontend',
        name: '前端開發',
        skills: [
          { name: 'Vue.js', level: 90, experience: '3 years' },
          { name: 'TypeScript', level: 85, experience: '2 years' }
        ]
      }
    ]
  }

  getComponent(): Component {
    return () => import('@/components/panels/SkillsPanel.vue')
  }
}

// 創建實例並註冊
const skillsPanel = new SkillsPanel()
skillsPanel.register()