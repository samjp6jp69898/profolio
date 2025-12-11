import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface AboutPanelData extends BasePanelData {
  readonly type: 'about'
  bio: string
  highlights: string[]
  personality: Array<{
    trait: string
    description: string
  }>
}

export class AboutPanel extends Panel<AboutPanelData> {
  readonly info: PanelInfo = {
    id: 'about',
    icon: '👤',
    title: '關於',
    titleEn: 'ABOUT'
  }

  readonly data: AboutPanelData = {
    type: 'about',
    bio: '熱愛技術的全端開發者',
    highlights: ['創新思維', '團隊合作', '持續學習'],
    personality: [
      { trait: '好奇心', description: '對新技術充滿熱忱' },
      { trait: '解決問題', description: '享受挑戰與突破' }
    ]
  }

  getComponent(): Component {
    return () => import('@/components/panels/AboutPanel.vue')
  }
}

// 創建實例並註冊
const aboutPanel = new AboutPanel()
aboutPanel.register()