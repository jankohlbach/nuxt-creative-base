<script setup lang="ts">
import { gsap } from 'gsap'

const { $scrollStart } = useNuxtApp()

const splash = useTemplateRef('splash')

onMounted(() => {
  if (!sessionStorage.getItem('intro:done') && splash.value) {
    splash.value.style.display = 'block'
  }

  const tl = gsap.timeline({ delay: 0.2, defaults: { duration: 1, ease: 'power4.inOut' } })
    .to(splash.value, {
      scale: 0.8,
    })
    .to(splash.value, {
      scale: 0.5,
      autoAlpha: 0,
    })
    .call(() => {
      window.dispatchEvent(new Event('intro:done'))
    }, [], '<0.4')
    .call(() => {
      if (!sessionStorage.getItem('intro:done')) {
        $scrollStart()
        sessionStorage.setItem('intro:done', 'true')
      }
    })

  if (sessionStorage.getItem('intro:done') && splash.value) {
    nextTick(() => {
      tl.progress(1)
      window.dispatchEvent(new Event('intro:done'))
      setTimeout(() => {
        $scrollStart()
      }, 500)
    })
  }
})
</script>

<template>
  <div
    ref="splash"
    class="splash"
  >
    <div class="content">
      <h1>splish splash</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.splash {
  position: fixed;
  inset: 0;
  display: none;
  width: 100vw;
  height: 100%;
  z-index: var(--zi-splash);
  background-color: var(--c-dark);
}

.content {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

h1 {
  color: var(--c-light);
}
</style>
