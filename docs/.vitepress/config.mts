import { defineConfig } from "vitepress";

const gettingStarted = [
  { text: "Installation", link: "/getting-started/installation" },
  { text: "Authentication", link: "/getting-started/authentication" },
  { text: "Configuration", link: "/getting-started/configuration" },
];

const concepts = [
  { text: "Architecture", link: "/concepts/architecture" },
  { text: "Providers", link: "/concepts/providers" },
  { text: "Normalization", link: "/concepts/normalization" },
  { text: "Error Model", link: "/concepts/error-model" },
];

const guides = [
  { text: "Orders", link: "/guides/orders" },
  { text: "Shipments", link: "/guides/shipments" },
  { text: "Tracking", link: "/guides/tracking" },
  { text: "Rate Comparison", link: "/guides/rate-comparison" },
  { text: "Label Generation", link: "/guides/label-generation" },
];

const apiReference = [
  { text: "Client", link: "/api/client" },
  { text: "Orders", link: "/api/orders" },
  { text: "Shipments", link: "/api/shipments" },
  { text: "Tracking", link: "/api/tracking" },
  { text: "Courier", link: "/api/courier" },
  { text: "Rates", link: "/api/rates" },
  { text: "Providers", link: "/api/providers" },
  { text: "Errors", link: "/api/errors" },
];

const examples = [
  { text: "Create Order", link: "/examples/create-order" },
  { text: "Tracking", link: "/examples/tracking" },
];

const advanced = [
  { text: "Error Handling", link: "/advanced/error-handling" },
  { text: "Retries", link: "/advanced/retries" },
  { text: "Performance", link: "/advanced/performance" },
];

export default defineConfig({
  title: "Open-Logistics",
  description: "Developer documentation for the Open-Logistics Shiprocket SDK",
  lastUpdated: true,
  cleanUrls: true,
  head: [["meta", { name: "theme-color", content: "#0f172a" }]],
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started/installation" },
      { text: "API Reference", link: "/api/client" },
      { text: "Guides", link: "/guides/orders" },
      { text: "Examples", link: "/examples/create-order" },
    ],
    sidebar: {
      "/getting-started/": [
        {
          text: "Getting Started",
          items: gettingStarted,
        },
      ],
      "/concepts/": [
        {
          text: "Concepts",
          items: concepts,
        },
      ],
      "/guides/": [
        {
          text: "Guides",
          items: guides,
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: apiReference,
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: examples,
        },
      ],
      "/advanced/": [
        {
          text: "Advanced",
          items: advanced,
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: "On this page",
    },
    lastUpdatedText: "Updated on",
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
  },
});
