<template>
  <footer id="connect" class="connect-section content-width">
    <p class="eyebrow">/ CONNECT</p>
    <h2 id="connect-title">
      <WordReveal :key="`${locale}-connect-title`" :text="t('connect.title')" />
    </h2>
    <Reveal as="p" class="connect-sub" :key="`${locale}-connect-sub`" :delay-ms="120">
      {{ t('connect.subtitle') }}
    </Reveal>
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
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Reveal from './Reveal.vue'
import WordReveal from './WordReveal.vue'

const { t, locale } = useI18n()
</script>

<style>
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
  justify-content: center;
  gap: 8px;
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
</style>
