import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface EducationPanelData extends BasePanelData {
  readonly type: 'education'
  degrees: Array<{
    institution: string
    degree: string
    field: string
    startYear: number
    endYear: number | null
    gpa?: number
  }>
  certifications: Array<{
    name: string
    issuer: string
    date: string
    url?: string
  }>
}

export class EducationPanel extends Panel<EducationPanelData> {
  readonly info: PanelInfo = {
    id: 'education',
    icon: '📚',
    title: '學業',
    titleEn: 'EDUCATION'
  }

  readonly data: EducationPanelData = {
    type: 'education',
    degrees: [
      {
        institution: '台灣大學',
        degree: '學士',
        field: '資訊工程',
        startYear: 2020,
        endYear: 2024
      }
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-12'
      }
    ]
  }

  getComponent(): Component {
    return () => import('@/components/panels/EducationPanel.vue')
  }
}

// 創建實例並註冊
const educationPanel = new EducationPanel()
educationPanel.register()