import DefaultTheme from "vitepress/theme";
import DownloadStats from "./DownloadStats.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("DownloadStats", DownloadStats);
  },
};
