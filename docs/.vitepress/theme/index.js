import DefaultTheme from "vitepress/theme";
import DownloadChart from "./DownloadChart.vue";
import DownloadStats from "./DownloadStats.vue";
import Layout from "./Layout.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("DownloadStats", DownloadStats);
    app.component("DownloadChart", DownloadChart);
  },
};
