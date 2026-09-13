<template>
  <component
    :is="as"
    ref="rootRef"
    class="reveal"
    :class="{ 'is-inview': inView }"
    :style="{ '--delay': `${delayMs}ms` }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInViewOnce } from '../composables/useInViewOnce'

withDefaults(
  defineProps<{
    as?: string
    delayMs?: number
  }>(),
  { as: 'div', delayMs: 0 },
)

const rootRef = ref<HTMLElement | null>(null)
const inView = useInViewOnce(rootRef)
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(18px);
}

.reveal.is-inview {
  animation: reveal-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes reveal-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.is-inview {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
