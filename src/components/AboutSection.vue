<template>
  <section
    id="about"
    class="about-section content-width"
    aria-labelledby="about-title"
  >
    <div class="section-heading">
      <p class="eyebrow">{{ t('about.label') }}</p>
      <h2 id="about-title">
        <WordReveal :key="`${locale}-about-title`" :text="t('about.title')" />
      </h2>
    </div>

    <div class="about-copy">
      <p v-for="paragraph in aboutParagraphs" :key="paragraph">
        {{ paragraph }}
      </p>
      <p class="about-last-line">{{ t('about.lastLine') }}</p>
    </div>

    <div id="interests" class="interest-grid" :aria-label="t('cards.label')">
      <InterestCard id="make" tone="blue" />
      <InterestCard id="novel" tone="pink" :delay-ms="80" />
      <InterestCard id="anime" tone="purple" :delay-ms="160" />
      <InterestCard id="yuri" tone="blue" :delay-ms="240" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import InterestCard from './InterestCard.vue'
import WordReveal from './WordReveal.vue'

const { t, tm, locale } = useI18n()
const aboutParagraphs = computed(() => tm('about.paragraphs') as string[])
</script>

<style>
.about-section {
  padding-top: 12vh;
  padding-bottom: 14vh;
}

.about-section h2 {
  margin: 22px 0 0;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.055em;
  line-height: 1.2;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: 54px;
}

@media (max-width: 980px) {
  .interest-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .about-section {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  .interest-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 34px;
  }
}
</style>
