import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const activePanel = ref<string>('dashboard')
  const isLoading = ref(true)

  function openPanel(panelId: string) {
    activePanel.value = panelId
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    activePanel,
    isLoading,
    openPanel,
    setLoading
  }
})