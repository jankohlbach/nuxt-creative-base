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
        nuxt creative base
      </h1>
      <p
        :class="{ inview }"
        data-inview-manual
      >
        nuxt starter for creative projects, includes scss setup, gsap, lenis scroll, curtainsjs to load media with webgl, custom cursor, inview trigger, splash screen, robots.txt, sitemap.xml
      </p>
    </section>
    <section class="container">
      <h2
        :class="{ inview }"
        data-inview-manual
      >
        section
      </h2>
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
        <div
          class="video"
          data-canvas
        >
          <video
            src="/video.mp4"
            muted
            autoplay
            loop
            playsinline
            crossorigin=""
          />
        </div>
      </div>
    </section>
    <section class="container">
      <h2 data-inview>
        section
      </h2>
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
    <section class="container">
      <h2 data-inview>
        section
      </h2>
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

<style lang="scss" scoped>
section {
  margin-block: to-rem(100);
  display: flex;
  flex-direction: column;
  gap: to-rem(50);
  align-items: flex-start;
}

p {
  max-width: 60ch;
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
