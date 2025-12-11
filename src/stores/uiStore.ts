import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PanelFactory } from '@/panels'
import type { Panel } from '@/types/panel'

export type PanelType = string | null

export interface MenuItem {
  id: string
  icon: string
  label: string
  labelEn: string
  angle: number
}

export const useUIStore = defineStore('ui', () => {
  const isMenuOpen = ref(false)
  const activePanel = ref<PanelType>(null)
  const isLoading = ref(true)

  const menuItems = computed((): MenuItem[] => {
    const panelInfos = PanelFactory.getPanelInfos()
    const totalItems = panelInfos.length

    return panelInfos.map((panelInfo, index) => {
      const startAngle = 300 // 8點鐘
      const endAngle = 60   // 4點鐘
      const totalRange = (360 - startAngle) + endAngle // 120 + 120 = 240°
      const angleStep = totalItems > 1 ? totalRange / (totalItems - 1) : 0

      // 逆時鐘 = 角度增加，超過 360 要取餘數
      const angle = (startAngle + angleStep * index) % 360

      return {
        id: panelInfo.id,
        icon: panelInfo.icon,
        label: panelInfo.title,
        labelEn: panelInfo.titleEn,
        angle
      }
    })
  })

  const isPanelOpen = computed(() => activePanel.value !== null)

  function toggleMenu() {
    if (activePanel.value) {
      closePanel()
    } else {
      isMenuOpen.value = !isMenuOpen.value
    }
  }

  function openPanel(panelId: string) {
    activePanel.value = panelId
    isMenuOpen.value = false
  }

  function getActivePanel(): Panel | undefined {
    return activePanel.value ? PanelFactory.getPanel(activePanel.value) : undefined
  }

  function closePanel() {
    activePanel.value = null
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    isMenuOpen,
    activePanel,
    isLoading,
    menuItems,
    isPanelOpen,
    toggleMenu,
    openPanel,
    closePanel,
    setLoading,
    getActivePanel
  }
})