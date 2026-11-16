<script setup>
import { onMounted, onUnmounted } from "vue";
import { onContentUpdated } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HeroCode from "./HeroCode.vue";
import HomeCards from "./HomeCards.vue";
import { applyStoredLanguage, rememberLanguage } from "./language.js";

const { Layout } = DefaultTheme;

onMounted(() => {
  applyStoredLanguage();
  document.addEventListener("change", rememberLanguage);
});

onUnmounted(() => {
  document.removeEventListener("change", rememberLanguage);
});

// Runs after every content update: SPA navigation, and VitePress's dev-only
// reset of code groups to their first tab on hot reload.
onContentUpdated(applyStoredLanguage);
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroCode />
    </template>

    <template #home-features-after>
      <HomeCards />
    </template>
  </Layout>
</template>
