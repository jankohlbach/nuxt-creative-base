import { gsap } from 'gsap'

export const globalTransition = {
  name: 'page',
  mode: 'out-in' as const,
  css: false,
  onBeforeLeave() {
    handleBeforeLeave()
  },
  onLeave(el: Element, done: () => void) {
    gsap.to(el, {
      autoAlpha: 0,
      duration: 1,
      onComplete: done,
    })
  },
  onAfterLeave() {
    handleAfterLeave()
  },
  onBeforeEnter(el: Element) {
    gsap.set(el, {
      autoAlpha: 0,
    })
  },
  onEnter(el: Element, done: () => void) {
    gsap.to(el, {
      autoAlpha: 1,
      duration: 1,
      onComplete: done,
    })
  },
  onAfterEnter() {
    handleAfterEnter()
  },
}
