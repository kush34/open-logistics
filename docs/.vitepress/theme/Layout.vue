<script setup>
import { computed, ref } from "vue";
import DefaultTheme from "vitepress/theme";
import HeroCode from "./HeroCode.vue";
import HomeCards from "./HomeCards.vue";

const { Layout } = DefaultTheme;

const installs = [
  { id: "npm", command: "npm i open-logistics" },
  { id: "pip", command: "pip install open-logistics-sdk" },
  { id: "cargo", command: "cargo add open-logistics" },
];

const active = ref("npm");
const copied = ref(false);

const command = computed(
  () => installs.find((item) => item.id === active.value).command,
);

function selectInstall(id) {
  active.value = id;
  copied.value = false;
}

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(command.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard is unavailable outside secure contexts.
  }
}
</script>

<template>
  <Layout>
    <template #home-hero-info-after>
      <div class="hero-install">
        <div class="hero-install-tabs" role="group" aria-label="Package manager">
          <button
            v-for="item in installs"
            :key="item.id"
            type="button"
            :aria-pressed="active === item.id"
            @click="selectInstall(item.id)"
          >
            {{ item.id }}
          </button>
        </div>
        <code><span class="prompt" aria-hidden="true">$</span> {{ command }}</code>
        <button class="hero-install-copy" type="button" @click="copyInstall">
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>
    </template>

    <template #home-hero-image>
      <HeroCode />
    </template>

    <template #home-features-after>
      <HomeCards />
    </template>
  </Layout>
</template>
