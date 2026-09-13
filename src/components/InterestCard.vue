<template>
  <Reveal
    as="article"
    class="interest-card"
    :class="`interest-card--${tone}`"
    :delay-ms="delayMs"
  >
    <p class="card-index">{{ t(`cards.${id}.index`) }}</p>
    <h3>
      <WordReveal
        :key="`${locale}-card-${id}`"
        :text="t(`cards.${id}.title`)"
        :delay-ms="delayMs"
      />
    </h3>
    <p>
      <WordReveal
        :key="`${locale}-card-${id}-text`"
        :text="t(`cards.${id}.text`)"
        :delay-ms="delayMs + 160"
      />
    </p>
  </Reveal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Reveal from './Reveal.vue'
import WordReveal from './WordReveal.vue'

withDefaults(
  defineProps<{
    id: 'make' | 'novel' | 'anime' | 'yuri'
    tone: 'blue' | 'pink' | 'purple'
    delayMs?: number
  }>(),
  { delayMs: 0 },
)

const { t, locale } = useI18n()
</script>

<style>
.card-index {
  margin: 0;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  line-height: 1.5;
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

@media (max-width: 700px) {
  .interest-card {
    min-height: 220px;
    border-radius: 22px;
    padding: 22px;
  }

  .interest-card h3 {
    margin-top: 44px;
  }
}
</style>
