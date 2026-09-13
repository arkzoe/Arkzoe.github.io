<template>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeLabels, supportedLocales, type SupportedLocale } from '../i18n'

const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value as SupportedLocale)
const nextLocale = computed(() => {
  const index = supportedLocales.indexOf(currentLocale.value)
  return supportedLocales[(index + 1) % supportedLocales.length]
})
const currentLocaleLabel = computed(() => localeLabels[currentLocale.value])
const nextLocaleLabel = computed(() => localeLabels[nextLocale.value])

const applyDocumentLang = (value: string): void => {
  document.documentElement.lang = value === 'zh' ? 'zh-CN' : value
}

const toggleLocale = (): void => {
  locale.value = nextLocale.value
  applyDocumentLang(locale.value)
}

applyDocumentLang(locale.value)
</script>

<style>
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

.site-header nav a {
  transition: color 180ms ease, opacity 180ms ease;
}

.site-header nav a:hover {
  color: var(--ink);
}

@media (max-width: 700px) {
  .site-header {
    gap: 14px;
    padding-top: 24px;
  }

  .site-header nav {
    gap: 12px;
    font-size: 0.65rem;
  }

  .language-switch {
    padding: 6px 8px;
    font-size: 0.62rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header nav a {
    transition: none;
  }
}
</style>
