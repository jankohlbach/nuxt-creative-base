<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <main class="container">
    <section>
      <h1>Error</h1>
    </section>
    <section>
      <hgroup>
        <h2>{{ error.statusCode }}</h2>
        <p>{{ error.message }}</p>
      </hgroup>
    </section>
  </main>
</template>
