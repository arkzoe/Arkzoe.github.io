<template>
  <div
    class="page-shell"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="fluid-container" aria-hidden="true">
      <canvas ref="canvasRef"></canvas>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createNoise3D } from 'simplex-noise'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const noise3D = createNoise3D()

const STEP = 4
const MAX_DPR = 1.2
const MAX_DRAW_PIXELS = 360000
const FRAME_INTERVAL = 1000 / 30
const colors = [
  [245, 230, 220],
  [220, 235, 245],
  [235, 225, 245],
] as const

let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let frameImageData: ImageData | null = null
let lastRenderTimestamp = -Infinity
let physWidth = 0
let physHeight = 0
let drawWidth = 0
let drawHeight = 0
let mouseX = 0.5
let mouseY = 0.5
let isMouseOver = false
let prefersReducedMotion = false
let reducedMotionQuery: MediaQueryList | null = null

const renderFrame = (timestamp: number, force = false): void => {
  if (!ctx || !frameImageData || (!force && timestamp - lastRenderTimestamp < FRAME_INTERVAL)) {
    return
  }

  lastRenderTimestamp = timestamp
  const time = timestamp * 0.0001
  const data = frameImageData.data
  const feedbackX = (mouseX - 0.5) * 0.2 * (isMouseOver ? 1 : 0)
  const feedbackY = (mouseY - 0.5) * 0.2 * (isMouseOver ? 1 : 0)

  for (let y = 0; y < drawHeight; y += 1) {
    for (let x = 0; x < drawWidth; x += 1) {
      const nx = (x * STEP) / physWidth
      const ny = (y * STEP) / physHeight
      const warpX = noise3D(nx * 0.8, ny * 0.8, time) * 0.3
      const warpY = noise3D(nx * 0.8 + 3.7, ny * 0.8 + 1.2, time + 1.8) * 0.3
      const noiseValue = noise3D(
        nx * 1.2 + warpX + feedbackX,
        ny * 1.2 + warpY + feedbackY,
        time * 0.8,
      )
      const palettePosition = ((noiseValue + 1) / 2) * (colors.length - 1)
      const paletteIndex = Math.min(Math.floor(palettePosition), colors.length - 2)
      const fraction = palettePosition - paletteIndex
      const firstColor = colors[paletteIndex]
      const secondColor = colors[paletteIndex + 1]
      const pixelIndex = (y * drawWidth + x) * 4

      data[pixelIndex] = firstColor[0] + (secondColor[0] - firstColor[0]) * fraction
      data[pixelIndex + 1] = firstColor[1] + (secondColor[1] - firstColor[1]) * fraction
      data[pixelIndex + 2] = firstColor[2] + (secondColor[2] - firstColor[2]) * fraction
      data[pixelIndex + 3] = 255
    }
  }

  ctx.putImageData(frameImageData, 0, 0)
}

const animate = (timestamp: number): void => {
  renderFrame(timestamp)
  animationId = requestAnimationFrame(animate)
}

const stopAnimation = (): void => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const startAnimation = (): void => {
  if (prefersReducedMotion || document.hidden || animationId !== null) return
  animationId = requestAnimationFrame(animate)
}

const resizeCanvas = (): void => {
  const canvas = canvasRef.value
  const container = canvas?.parentElement
  if (!canvas || !container) return

  const rect = container.getBoundingClientRect()
  let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
  physWidth = Math.max(1, rect.width * dpr)
  physHeight = Math.max(1, rect.height * dpr)
  drawWidth = Math.max(1, Math.floor(physWidth / STEP))
  drawHeight = Math.max(1, Math.floor(physHeight / STEP))

  if (drawWidth * drawHeight > MAX_DRAW_PIXELS) {
    dpr *= Math.sqrt(MAX_DRAW_PIXELS / (drawWidth * drawHeight))
    physWidth = Math.max(1, rect.width * dpr)
    physHeight = Math.max(1, rect.height * dpr)
    drawWidth = Math.max(1, Math.floor(physWidth / STEP))
    drawHeight = Math.max(1, Math.floor(physHeight / STEP))
  }

  canvas.width = drawWidth
  canvas.height = drawHeight
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.imageSmoothingEnabled = true
  frameImageData = ctx.createImageData(drawWidth, drawHeight)
  lastRenderTimestamp = -Infinity
  renderFrame(performance.now(), true)
}

const onPointerMove = (event: PointerEvent): void => {
  const content = event.currentTarget as HTMLElement
  const rect = content.getBoundingClientRect()
  mouseX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  mouseY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
  isMouseOver = true
}

const onPointerLeave = (): void => {
  isMouseOver = false
}

const updateReducedMotion = (): void => {
  prefersReducedMotion = reducedMotionQuery?.matches ?? false
  stopAnimation()
  if (prefersReducedMotion) {
    renderFrame(performance.now(), true)
  } else {
    startAnimation()
  }
}

const onVisibilityChange = (): void => {
  if (document.hidden) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (typeof window.matchMedia === 'function') {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = reducedMotionQuery.matches
    reducedMotionQuery.addEventListener('change', updateReducedMotion)
  }
  startAnimation()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', updateReducedMotion)
  stopAnimation()
  frameImageData = null
  ctx = null
})
</script>

<style>
.page-shell {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
}

.fluid-container {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background: var(--background);
}

.fluid-container canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: auto;
}
</style>
