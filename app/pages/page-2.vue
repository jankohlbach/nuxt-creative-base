<script setup lang="ts">
const inview = ref(false)

definePageMeta({
  pageTransition: globalTransition,
})

onMounted(() => {
  window.addEventListener('intro:done', () => {
    inview.value = true
  })
})
</script>

<template>
  <main>
    <section class="container">
      <h1
        :class="{ inview }"
        data-inview-manual
      >
        section
      </h1>
      <div class="grid media">
        <div
          class="image"
          data-canvas
        >
          <img
            src="/texture.jpg"
            alt="test-texture"
            crossorigin=""
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
section {
  margin-block: to-rem(100);
  display: flex;
  flex-direction: column;
  gap: to-rem(50);
  align-items: flex-start;
}

.media {
  align-items: start;
}

.image {
  grid-column: span 4;
}

.video {
  grid-column: 7 / span 6;
}
</style>
