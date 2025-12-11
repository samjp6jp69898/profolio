import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface ContactPanelData extends BasePanelData {
  readonly type: 'contact'
  email: string
  social: Array<{
    platform: string
    url: string
    icon: string
  }>
  availability: {
    status: 'available' | 'busy' | 'unavailable'
    message: string
  }
}

export class ContactPanel extends Panel<ContactPanelData> {
  readonly info: PanelInfo = {
    id: 'contact',
    icon: '📧',
    title: '聯絡',
    titleEn: 'CONTACT'
  }

  readonly data: ContactPanelData = {
    type: 'contact',
    email: 'contact@example.com',
    social: [
      { platform: 'GitHub', url: 'https://github.com', icon: '🐙' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }
    ],
    availability: {
      status: 'available',
      message: '歡迎聯絡討論合作機會'
    }
  }

  getComponent(): Component {
    return () => import('@/components/panels/ContactPanel.vue')
  }
}

// 創建實例並註冊
const contactPanel = new ContactPanel()
contactPanel.register()