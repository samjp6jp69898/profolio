import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface WorkPanelData extends BasePanelData {
  readonly type: 'work'
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    url?: string
    github?: string
  }>
}

export class WorkPanel extends Panel<WorkPanelData> {
  readonly info: PanelInfo = {
    id: 'work',
    icon: '💼',
    title: '工作',
    titleEn: 'WORK'
  }

  readonly data: WorkPanelData = {
    type: 'work',
    projects: [
      {
        id: '1',
        name: '專案一',
        description: '專案描述',
        technologies: ['Vue.js', 'TypeScript', 'Three.js']
      }
    ]
  }

  getComponent(): Component {
    return () => import('@/components/panels/WorkPanel.vue')
  }
}

// 創建實例並註冊
const workPanel = new WorkPanel()
workPanel.register()