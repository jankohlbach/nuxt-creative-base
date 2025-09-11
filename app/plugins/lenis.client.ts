import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const scroll = useScroll()

  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.07,
  })

  const scrollStop = () => {
    if (!lenis.isStopped) {
      const scrollBarWidth = window.innerWidth - document.body.offsetWidth
      document.body.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`)
      document.body.style.paddingRight = document.body.style.getPropertyValue('--scroll-bar-width') || scrollBarWidth + 'px'
    }

    document.body.style.overflowY = 'clip'
    lenis.stop()
  }

  const scrollStart = () => {
    lenis.start()
    document.body.style.removeProperty('--scroll-bar-width')
    document.body.style.paddingRight = ''
    document.body.style.overflowY = ''
  }

  scroll.value.scrollY = window.scrollY

  lenis.on('scroll', (_e) => {
    scroll.value.scrollY = window.scrollY
  })

  return {
    provide: {
      lenis,
      scrollStop,
      scrollStart,
    },
  }
})
