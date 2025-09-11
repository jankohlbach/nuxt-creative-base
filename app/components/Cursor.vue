<script setup lang="ts">
const { cursorPos, setCursorPosCurrent, setCursorPosTarget, hoverTrigger, setHoverTrigger } = useCursor()

const isActive = ref(false)

const initializeHoverTrigger = () => {
  cursorPos.value.isHovering = ''

  hoverTrigger.value?.forEach((trigger) => {
    trigger.addEventListener('mouseenter', () => {
      cursorPos.value.isHovering = (trigger as HTMLElement).dataset.cursorAction || 'hover-default'
    })
    trigger.addEventListener('mouseleave', () => {
      cursorPos.value.isHovering = ''
    })
  })
}

watch(hoverTrigger, () => {
  initializeHoverTrigger()
})

onMounted(() => {
  setHoverTrigger()

  let raf: number | null

  window.addEventListener('mousemove', (event) => {
    setCursorPosTarget(event.clientX, event.clientY)

    if (!raf && hasHover()) {
      isActive.value = true
      raf = requestAnimationFrame(calcLerp)
    }
  })

  const calcLerp = () => {
    const x = lerp(cursorPos.value.current.x, cursorPos.value.target.x, 0.1)
    const y = lerp(cursorPos.value.current.y, cursorPos.value.target.y, 0.1)

    setCursorPosCurrent(x, y)

    const delta = Math.sqrt(
      ((cursorPos.value.target.x - cursorPos.value.current.x) ** 2)
      + ((cursorPos.value.target.y - cursorPos.value.current.y) ** 2),
    )

    if (delta < 0.001 && raf) {
      cancelAnimationFrame(raf)
      raf = null
      return
    }

    raf = requestAnimationFrame(calcLerp)
  }
})
</script>

<template>
  <div
    class="cursor"
    :class="[{ 'is-active': isActive, 'is-hover': cursorPos.isHovering }, cursorPos.isHovering && cursorPos.isHovering]"
    :style="`
      --cursor-x: ${cursorPos.current.x};
      --cursor-y: ${cursorPos.current.y};
    `"
    aria-hidden="true"
  >
    <div class="cursor-inner" />
  </div>
</template>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  z-index: var(--zi-cursor);
  display: none;
  width: to-rem(12);
  height: to-rem(12);
  opacity: 0;
  user-select: none;
  pointer-events: none;
  transform: translate3d(
    calc((100vw * var(--cursor-x) - 50%) + to-rem(24)),
    calc((100vh * var(--cursor-y) - 50%) + to-rem(24)),
    0
  );
  transition: opacity 0.4s var(--ease-smooth);

  &.is-active {
    opacity: 1;
  }

  &.is-hover {
    .cursor-inner {
      background-color: var(--c-light);
      transform: scale(0.5);
    }
  }

  @include has-hover {
    display: block;
  }
}

.cursor-inner {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  color: var(--c-light);
  background-color: var(--c-dark);
  border: 1px solid var(--c-dark);
  transition: transform 0.4s var(--ease-smooth), background-color 0.4s var(--ease-smooth);
}
</style>
