import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PanelItem } from '@/types'

export const useUIStore = defineStore('ui', () => {
  const activePanel = ref<string>('dashboard')
  const isLoading = ref(true)

  // Detail Panel State
  const showDetailPanel = ref(false)
  const selectedDetailItem = ref<PanelItem | null>(null)

  function openPanel(panelId: string) {
    activePanel.value = panelId
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function openDetail(item: PanelItem) {
    selectedDetailItem.value = item
    showDetailPanel.value = true
  }

  function closeDetail() {
    showDetailPanel.value = false
    // We defer clearing the item slightly to avoid content flashing during transition, 
    // or just clear it immediately. Let's keep it for fade out.
    setTimeout(() => {
      selectedDetailItem.value = null
    }, 300)
  }

  return {
    activePanel,
    isLoading,
    showDetailPanel,
    selectedDetailItem,
    openPanel,
    setLoading,
    openDetail,
    closeDetail
  }
})