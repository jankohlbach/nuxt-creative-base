<script setup lang="ts">
import type { PlaneParams } from 'curtainsjs'

import { Curtains, Plane } from 'curtainsjs'

import vertexShader from '~/assets/shader/vertex.glsl'
import fragmentShader from '~/assets/shader/fragment.glsl'

const { $lenis } = useNuxtApp()

const { canvasItems, setCanvasItems } = useCanvas()

const canvasContainer = useTemplateRef('canvasContainer')

let curtains: Curtains
const planes: Plane[] = []

const canvasItemParams: PlaneParams = {
  vertexShader,
  fragmentShader,
  widthSegments: 100,
  heightSegments: 100,
  transparent: true,
  uniforms: {
    time: {
      name: 'uTime',
      type: '1f',
      value: 0.0,
    },
  },
}

const initializeCanvasItems = () => {
  canvasItems.value?.forEach((planeElement) => {
    const plane = new Plane(curtains, planeElement, canvasItemParams)
    planes.push(plane)

    plane.onRender(() => {
      if (plane.uniforms.time) {
        plane.uniforms.time.value = (plane.uniforms.time.value as number) + 1
      }
    })
  })
}

watch(canvasItems, () => {
  if (!canvasItems.value) {
    planes.forEach((plane) => {
      plane.remove()
    })
  } else {
    initializeCanvasItems()
  }
})

onMounted(() => {
  if (!canvasContainer.value) return

  setCanvasItems()

  curtains = new Curtains({
    container: canvasContainer.value,
    pixelRatio: Math.min(2, window.devicePixelRatio),
    watchScroll: false,
  })

  curtains
    .onError(() => {
      document.body.classList.add('no-curtains')
    })
    .onContextLost(() => {
      curtains.restoreContext()
    })

  // TODO: pause rendering when not scrolling?
  // TODO: don't update planes when not in view?

  $lenis.on('scroll', () => {
    curtains.updateScrollValues(window.scrollX, window.scrollY)
  })
})
</script>

<template>
  <div
    ref="canvasContainer"
    class="canvas"
  />
</template>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
