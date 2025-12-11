import { ref, onUnmounted } from 'vue'

export function useTypewriter() {
  const displayText = ref('')
  const isTyping = ref(false)
  let timeoutId: number | null = null

  function typeText(text: string, speed = 50, onComplete?: () => void) {
    displayText.value = ''
    isTyping.value = true
    let index = 0
    function type() {
      if (index < text.length) {
        displayText.value += text.charAt(index)
        index++
        timeoutId = window.setTimeout(type, speed)
      } else {
        isTyping.value = false
        onComplete?.()
      }
    }
    type()
  }

  function clearText() {
    if (timeoutId) clearTimeout(timeoutId)
    displayText.value = ''
    isTyping.value = false
  }

  onUnmounted(() => { if (timeoutId) clearTimeout(timeoutId) })

  return { displayText, isTyping, typeText, clearText }
}