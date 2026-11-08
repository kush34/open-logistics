import DefaultTheme from "vitepress/theme";
import DownloadStats from "./DownloadStats.vue";
import Layout from "./Layout.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("DownloadStats", DownloadStats);
  },
};
