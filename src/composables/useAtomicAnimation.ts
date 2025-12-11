import { ref } from 'vue'
import gsap from 'gsap'

export function useAtomicAnimation() {
  const isAnimating = ref(false)
  let tl: gsap.core.Timeline | null = null

  function expandAnimation(core: HTMLElement, rings: HTMLElement[], electrons: HTMLElement[], beams: HTMLElement[], onComplete?: () => void) {
    if (isAnimating.value) return
    isAnimating.value = true
    tl = gsap.timeline({ onComplete: () => { isAnimating.value = false; onComplete?.() } })

    tl.to(core, { scale: 1.3, duration: 0.1, ease: 'power2.out' })
      .to(core, { scale: 1, duration: 0.1, ease: 'power2.in' })
      .to(core, { boxShadow: '0 0 60px rgba(0, 212, 255, 0.8), 0 0 120px rgba(0, 212, 255, 0.4)', duration: 0.2 }, '-=0.1')

    const waves = core.querySelectorAll('.wave-ring')
    waves.forEach((wave, i) => {
      tl!.to(wave, { scale: 2.5, opacity: 0, duration: 0.5, ease: 'power1.out' }, 0.05 + i * 0.15)
    })

    rings.forEach((ring, i) => {
      tl!.fromTo(ring, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, 0.2 + i * 0.1)
    })

    electrons.forEach((electron, i) => {
      const angle = (electron.dataset.angle ? parseFloat(electron.dataset.angle) : i * 60) - 90
      const rad = angle * (Math.PI / 180)
      const radius = 140
      tl!.fromTo(electron,
        { x: 0, y: 0, scale: 0, opacity: 0, rotation: -180 },
        { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.4)' },
        0.3 + i * 0.08
      )
    })

    beams.forEach((beam, i) => {
      tl!.fromTo(beam, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.6, duration: 0.3, ease: 'power2.out' }, 0.4 + i * 0.08)
    })

    return tl
  }

  function collapseAnimation(core: HTMLElement, rings: HTMLElement[], electrons: HTMLElement[], beams: HTMLElement[], onComplete?: () => void) {
    if (isAnimating.value) return
    isAnimating.value = true
    tl = gsap.timeline({ onComplete: () => { isAnimating.value = false; onComplete?.() } })

    beams.forEach((beam, i) => { tl!.to(beam, { scaleX: 0, opacity: 0, duration: 0.2, ease: 'power2.in' }, i * 0.03) })
    electrons.forEach((electron, i) => { tl!.to(electron, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 180, duration: 0.3, ease: 'back.in(1.4)' }, 0.1 + i * 0.05) })
    rings.forEach((ring, i) => { tl!.to(ring, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.2 + i * 0.05) })
    tl.to(core, { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)', duration: 0.2 }, '-=0.2')

    return tl
  }

  return { isAnimating, expandAnimation, collapseAnimation }
}