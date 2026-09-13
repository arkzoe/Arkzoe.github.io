<template>
  <span
    ref="rootRef"
    class="word-reveal"
    :class="{ 'is-inview': inView }"
  >
    <template v-for="(token, index) in tokens" :key="index">
      <span v-if="token.kind === 'word'" class="word-reveal__clip">
        <span
          class="word-reveal__word"
          :style="{ '--i': token.i, '--delay': `${delayMs}ms` }"
        >{{ token.text }}</span>
      </span>
      <template v-else>{{ token.text }}</template>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInViewOnce } from '../composables/useInViewOnce'

const props = withDefaults(
  defineProps<{
    text: string
    delayMs?: number
  }>(),
  { delayMs: 0 },
)

type WordSegment = { segment: string; isWordLike: boolean }

type Token =
  | { kind: 'word'; text: string; i: number }
  | { kind: 'gap'; text: string }

type SegmenterCtor = new (
  locales?: string | string[],
  options?: { granularity?: 'grapheme' | 'word' | 'sentence' },
) => { segment: (input: string) => Iterable<WordSegment> }

function segmentText(text: string, locale: string): WordSegment[] {
  const Segmenter = (Intl as typeof Intl & { Segmenter?: SegmenterCtor }).Segmenter
  if (typeof Segmenter === 'function') {
    return Array.from(new Segmenter(locale, { granularity: 'word' }).segment(text))
  }
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map((segment) => ({ segment, isWordLike: /\S/.test(segment) }))
}

function tokenize(text: string, locale: string): Token[] {
  if (!text) return []

  const tokens: Token[] = []
  let wordIndex = 0

  for (const { segment, isWordLike } of segmentText(text, locale)) {
    if (isWordLike) {
      tokens.push({ kind: 'word', text: segment, i: wordIndex })
      wordIndex += 1
      continue
    }

    if (/^\s+$/.test(segment)) {
      tokens.push({ kind: 'gap', text: segment })
      continue
    }

    const previous = tokens[tokens.length - 1]
    if (previous?.kind === 'word') {
      previous.text += segment
    } else {
      tokens.push({ kind: 'word', text: segment, i: wordIndex })
      wordIndex += 1
    }
  }

  return tokens
}

const { locale } = useI18n()
const tokens = computed(() => tokenize(props.text, String(locale.value)))

const rootRef = ref<HTMLElement | null>(null)
const inView = useInViewOnce(rootRef)
</script>

<style scoped>
.word-reveal__clip {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}
.word-reveal__word {
  display: inline-block;
  transform: translateY(110%);
}
.word-reveal.is-inview .word-reveal__word {
  animation: word-slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--i) * 45ms + var(--delay, 0ms));
}
@keyframes word-slide-up {
  from { transform: translateY(110%); }
  to { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .word-reveal__word,
  .word-reveal.is-inview .word-reveal__word {
    animation: none;
    transform: none;
  }
}
</style>
