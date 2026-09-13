<template>
  <FluidBackground>
    <div class="site-content">
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <AboutSection />
      </main>
      <ConnectSection />
    </div>
  </FluidBackground>
</template>

<script setup lang="ts">
import AboutSection from './components/AboutSection.vue'
import ConnectSection from './components/ConnectSection.vue'
import FluidBackground from './components/FluidBackground.vue'
import HeroSection from './components/HeroSection.vue'
import SiteHeader from './components/SiteHeader.vue'
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

.site-content {
  position: relative;
  z-index: 1;
}

.content-width {
  width: min(1180px, calc(100% - 48px));
  margin-inline: auto;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  line-height: 1.5;
}

@media (max-width: 700px) {
  .content-width {
    width: min(100% - 36px, 1180px);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
