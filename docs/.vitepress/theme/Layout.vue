<script setup>
import DefaultTheme from "vitepress/theme";
import HeroCode from "./HeroCode.vue";
import HomeCards from "./HomeCards.vue";

const { Layout } = DefaultTheme;
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
