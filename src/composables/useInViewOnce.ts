import { nextTick, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

function toHTMLElement(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) return el
  if (el && typeof el === 'object' && '$el' in el) {
    const node = el.$el
    if (node instanceof HTMLElement) return node
  }
  return null
}

export function useInViewOnce(rootRef: Ref<unknown>) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    void nextTick(() => {
      const root = toHTMLElement(rootRef.value)
      if (!root) return

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          inView.value = true
          observer?.disconnect()
        },
        { threshold: 0, rootMargin: '0px 0px -8% 0px' },
      )
      observer.observe(root)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return inView
}
