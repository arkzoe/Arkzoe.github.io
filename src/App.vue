<template>
  <div
    class="page-shell"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="fluid-container" aria-hidden="true">
      <canvas ref="canvasRef"></canvas>
    </div>

    <div class="site-content">
      <header class="site-header content-width">
        <a class="brand" href="#top" :aria-label="t('nav.home')">MUTSUKI</a>
        <nav :aria-label="t('nav.label')">
          <a href="#about">{{ t('nav.about') }}</a>
          <a href="#interests">{{ t('nav.interests') }}</a>
          <a href="#connect">{{ t('nav.connect') }}</a>
        </nav>
        <button
          class="language-switch"
          type="button"
          :aria-label="t('language.label')"
          :title="t('language.label')"
          @click="toggleLocale"
        >
          {{ currentLocaleLabel }} <span aria-hidden="true">/</span> {{ nextLocaleLabel }}
        </button>
      </header>

      <main id="top">
        <section class="hero content-width" aria-labelledby="hero-title">
          <div class="hero-copy">
            <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
            <h1 id="hero-title">{{ t('hero.titleLine1') }}<br />{{ t('hero.titleLine2') }}</h1>
            <p class="hero-intro">{{ t('hero.intro') }}</p>

            <div class="tag-cloud" :aria-label="t('hero.tagsLabel')">
              <span v-for="tag in heroTags" :key="tag">{{ tag }}</span>
            </div>

            <a class="scroll-link" href="#about">{{ t('hero.scroll') }} <span>↓</span></a>
          </div>
        </section>

        <section
          id="about"
          class="about-section content-width"
          aria-labelledby="about-title"
        >
          <div class="section-heading">
            <p class="eyebrow">{{ t('about.label') }}</p>
            <h2 id="about-title">{{ t('about.title') }}</h2>
          </div>

          <div class="about-copy">
            <p v-for="paragraph in aboutParagraphs" :key="paragraph">
              {{ paragraph }}
            </p>
            <p class="about-last-line">{{ t('about.lastLine') }}</p>
          </div>

          <div id="interests" class="interest-grid" :aria-label="t('cards.label')">
            <article class="interest-card interest-card--blue">
              <p class="card-index">{{ t('cards.make.index') }}</p>
              <h3>{{ t('cards.make.title') }}</h3>
              <p>{{ t('cards.make.text') }}</p>
            </article>
            <article class="interest-card interest-card--pink">
              <p class="card-index">{{ t('cards.novel.index') }}</p>
              <h3>{{ t('cards.novel.title') }}</h3>
              <p>{{ t('cards.novel.text') }}</p>
            </article>
            <article class="interest-card interest-card--purple">
              <p class="card-index">{{ t('cards.anime.index') }}</p>
              <h3>{{ t('cards.anime.title') }}</h3>
              <p>{{ t('cards.anime.text') }}</p>
            </article>
            <article class="interest-card interest-card--blue">
              <p class="card-index">{{ t('cards.yuri.index') }}</p>
              <h3>{{ t('cards.yuri.title') }}</h3>
              <p>{{ t('cards.yuri.text') }}</p>
            </article>
          </div>
        </section>
      </main>
      <footer id="connect" class="connect-section content-width">
        <p class="eyebrow">/ CONNECT</p>
        <h2 id="connect-title">{{ t('connect.title') }}</h2>
        <p class="connect-sub">{{ t('connect.subtitle') }}</p>
        <a
          class="github-link"
          href="https://github.com/arkzoe"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('footer.github')"
          :title="t('footer.github')"
        >
          <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { createNoise3D } from 'simplex-noise'
import { localeLabels, supportedLocales, type SupportedLocale } from './i18n'

const { t, tm, locale } = useI18n()
const heroTags = computed(() => tm('hero.tags') as string[])
const aboutParagraphs = computed(() => tm('about.paragraphs') as string[])
const currentLocale = computed(() => locale.value as SupportedLocale)
const nextLocale = computed(() => {
  const index = supportedLocales.indexOf(currentLocale.value)
  return supportedLocales[(index + 1) % supportedLocales.length]
})
const currentLocaleLabel = computed(() => localeLabels[currentLocale.value])
const nextLocaleLabel = computed(() => localeLabels[nextLocale.value])

const toggleLocale = (): void => {
  locale.value = nextLocale.value
  document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : locale.value
}
document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : locale.value

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
:root {
  --background: #f5f2ee;
  --ink: #24303a;
  --muted: #66717a;
  --blue: #dcebf5;
  --pink: #f5e6dc;
  --purple: #ebe1f5;
  --line: rgba(36, 48, 58, 0.16);
  --scroll-track: rgba(245, 242, 238, 0.88);
  --scroll-thumb: rgba(36, 48, 58, 0.42);
  scrollbar-color: var(--scroll-thumb) var(--scroll-track);
  scrollbar-width: thin;
  color: var(--ink);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  margin: 0;
  background: var(--background);
  color: var(--ink);
}

body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: var(--scroll-track);
}

body::-webkit-scrollbar-thumb {
  border: 3px solid var(--scroll-track);
  border-radius: 999px;
  background: var(--scroll-thumb);
}

body::-webkit-scrollbar-thumb:hover {
  background: var(--ink);
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 5px;
}

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

.site-content {
  position: relative;
  z-index: 1;
}

.content-width {
  width: min(1180px, calc(100% - 48px));
  margin-inline: auto;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 34px;
}

.brand {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.22em;
}

.site-header nav {
  display: flex;
  gap: 32px;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.language-switch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(245, 242, 238, 0.36);
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
}

.language-switch:hover {
  border-color: var(--ink);
  background: rgba(245, 242, 238, 0.72);
  color: var(--ink);
}

.site-header nav a,
.scroll-link {
  transition: color 180ms ease, opacity 180ms ease;
}

.site-header nav a:hover,
.scroll-link:hover {
  color: var(--ink);
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100svh - 88px);
  padding-top: 96px;
  padding-bottom: 12vh;
  text-align: center;
}

.hero-copy {
  width: min(920px, 100%);
  margin-inline: auto;
}

.eyebrow,
.card-index {
  margin: 0;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  line-height: 1.5;
}

.hero h1,
.about-section h2 {
  margin: 22px 0 0;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-weight: 600;
  letter-spacing: -0.055em;
}

.hero h1 {
  max-width: 1000px;
  margin-inline: auto;
  font-size: clamp(3rem, 8vw, 6.5rem);
  line-height: 1.02;
}

.hero-intro {
  max-width: 680px;
  margin: 34px auto 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.8;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
  max-width: 850px;
  margin: 32px auto 0;
}

.tag-cloud span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 13px 9px;
  background: rgba(245, 242, 238, 0.34);
  color: var(--ink);
  font-size: 0.78rem;
  line-height: 1.2;
  backdrop-filter: blur(4px);
}

.scroll-link {
  display: inline-block;
  margin-top: 48px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 7px;
  font-size: 0.85rem;
}

.about-section {
  padding-top: 12vh;
  padding-bottom: 14vh;
}

.about-section h2 {
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.2;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: 54px;
}

.interest-card {
  min-height: 280px;
  border: 1px solid var(--line);
  border-radius: 28px;
  padding: 27px 28px 30px;
}

.interest-card--blue {
  background: color-mix(in srgb, var(--blue) 78%, transparent);
}

.interest-card--pink {
  background: color-mix(in srgb, var(--pink) 78%, transparent);
}

.interest-card--purple {
  background: color-mix(in srgb, var(--purple) 78%, transparent);
}

.interest-card h3 {
  margin: 74px 0 14px;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(1.45rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.04em;
}

.interest-card > p:last-child {
  max-width: 250px;
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
}
.connect-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 16vh;
}

.connect-section h2 {
  margin: 22px 0 0;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.connect-sub {
  max-width: 480px;
  margin: 14px 0 0;
  color: var(--muted);
  line-height: 1.8;
}

.connect-section .github-link {
  margin-top: 36px;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
    justify-content: center;
  width: 54px;
  height: 54px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(245, 242, 238, 0.36);
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
}

.github-link:hover {
  border-color: var(--ink);
  background: rgba(245, 242, 238, 0.72);
  color: var(--ink);
}

@media (max-width: 980px) {
  .interest-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .content-width {
    width: min(100% - 36px, 1180px);
  }

  .site-header {
    padding-top: 24px;
  }

  .site-header nav {
    gap: 16px;
    font-size: 0.65rem;
  }

  .hero {
    min-height: calc(100svh - 72px);
    padding-top: 72px;
    padding-bottom: 10vh;
  }

  .hero h1 {
    margin-top: 18px;
    font-size: clamp(1.75rem, 9.6vw, 4.5rem);
  }

  .hero-intro {
    margin-top: 25px;
    line-height: 1.75;
  }

  .scroll-link {
    margin-top: 34px;
  }
  .site-header {
    gap: 14px;
  }

  .site-header nav {
    gap: 12px;
  }

  .language-switch {
    padding: 6px 8px;
    font-size: 0.62rem;
  }
  .header-actions {
    gap: 7px;
  }

  .github-link--header {
    width: 34px;
    height: 34px;
  }

  .about-section {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  .interest-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 34px;
  }

  .interest-card {
    min-height: 220px;
    border-radius: 22px;
    padding: 22px;
  }

  .interest-card h3 {
    margin-top: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .site-header nav a,
  .scroll-link {
    transition: none;
  }
}
</style>
