<script setup lang="ts">
const { inviewTrigger, setInviewTrigger } = useInview()

const initInViewTrigger = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview')
        }
      })
    },
    {
      rootMargin: `0% 0% ${window.innerWidth < 768 ? '-10%' : '-20%'} 0%`,
    },
  )

  inviewTrigger.value?.forEach((elTrigger) => {
    observer.observe(elTrigger as HTMLElement)
  })
}

onMounted(() => {
  watch(inviewTrigger, () => initInViewTrigger())

  setInviewTrigger()

  consoleCredits()
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
