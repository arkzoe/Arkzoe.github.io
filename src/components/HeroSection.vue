<template>
  <section class="hero content-width" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
      <h1 id="hero-title">
        <WordReveal :key="`${locale}-hero-t1`" :text="t('hero.titleLine1')" /><br />
        <WordReveal :key="`${locale}-hero-t2`" :text="t('hero.titleLine2')" :delay-ms="150" />
      </h1>
      <p class="hero-intro">
        <WordReveal :key="`${locale}-hero-intro`" :text="t('hero.intro')" :delay-ms="320" />
      </p>

      <div class="tag-cloud" :aria-label="t('hero.tagsLabel')">
        <Reveal
          v-for="(tag, i) in heroTags"
          :key="`${locale}-tag-${i}`"
          as="span"
          :delay-ms="480 + i * 45"
        >{{ tag }}</Reveal>
      </div>

      <a class="scroll-link" href="#about">{{ t('hero.scroll') }} <span>↓</span></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Reveal from './Reveal.vue'
import WordReveal from './WordReveal.vue'

const { t, tm, locale } = useI18n()
const heroTags = computed(() => tm('hero.tags') as string[])
</script>

<style>
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

.hero h1 {
  max-width: 1000px;
  margin: 22px auto 0;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 600;
  letter-spacing: -0.055em;
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
  display: inline-block;
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
  transition: color 180ms ease, opacity 180ms ease;
}

.scroll-link:hover {
  color: var(--ink);
}

@media (max-width: 700px) {
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
}

@media (prefers-reduced-motion: reduce) {
  .scroll-link {
    transition: none;
  }
}
</style>
