import type { Component } from 'vue'
import { Panel, type PanelInfo, type BasePanelData } from '@/types/panel'

interface TravelPanelData extends BasePanelData {
  readonly type: 'travel'
  trips: Array<{
    id: string
    destination: string
    country: string
    date: string
    duration: string
    highlights: string[]
    photos?: string[]
  }>
  bucketList: string[]
}

export class TravelPanel extends Panel<TravelPanelData> {
  readonly info: PanelInfo = {
    id: 'travel',
    icon: '✈️',
    title: '旅遊',
    titleEn: 'TRAVEL'
  }

  readonly data: TravelPanelData = {
    type: 'travel',
    trips: [
      {
        id: '1',
        destination: '東京',
        country: '日本',
        date: '2023-05',
        duration: '7 天',
        highlights: ['科技博物館', '秋葉原', '富士山']
      }
    ],
    bucketList: ['冰島極光', '馬丘比丘', '北歐設計之旅']
  }

  getComponent(): Component {
    return () => import('@/components/panels/TravelPanel.vue')
  }
}

// 創建實例並註冊
const travelPanel = new TravelPanel()
travelPanel.register()