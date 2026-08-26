/** @type {import('vitepress').UserConfig} */
module.exports = {
  title: "Open-Logistics",
  description: "Developer documentation for the Open-Logistics SDK",
  themeConfig: {
    nav: [
      { text: "Shiprocket", link: "/shiprocket/" },
      { text: "Delhivery", link: "/delhivery/" },
    ],
    sidebar: {
      "/shiprocket/": [
        {
          text: "Shiprocket",
          items: [
            { text: "Overview", link: "/shiprocket/" },
            {
              text: "Installation",
              link: "/shiprocket/getting-started/installation",
            },
            {
              text: "Authentication",
              link: "/shiprocket/getting-started/authentication",
            },
            {
              text: "Configuration",
              link: "/shiprocket/getting-started/configuration",
            },
            {
              text: "API Reference",
              items: [
                { text: "Client", link: "/shiprocket/api/client" },
                { text: "Orders", link: "/shiprocket/api/orders" },
                { text: "Shipments", link: "/shiprocket/api/shipments" },
                { text: "Courier", link: "/shiprocket/api/courier" },
                { text: "Tracking", link: "/shiprocket/api/tracking" },
                { text: "Rates", link: "/shiprocket/api/rates" },
                { text: "Errors", link: "/shiprocket/api/errors" },
              ],
            },
            {
              text: "Guides",
              items: [
                { text: "Orders", link: "/shiprocket/guides/orders" },
                { text: "Shipments", link: "/shiprocket/guides/shipments" },
                { text: "Tracking", link: "/shiprocket/guides/tracking" },
                {
                  text: "Label Generation",
                  link: "/shiprocket/guides/label-generation",
                },
                {
                  text: "Rate Comparison",
                  link: "/shiprocket/guides/rate-comparison",
                },
              ],
            },
            {
              text: "Examples",
              items: [
                { text: "Create Order", link: "/shiprocket/examples/create-order" },
                { text: "Tracking", link: "/shiprocket/examples/tracking" },
              ],
            },
            {
              text: "Shared",
              items: [
                { text: "Providers API", link: "/shiprocket/api/providers" },
                { text: "Architecture", link: "/concepts/architecture" },
                { text: "Normalization", link: "/concepts/normalization" },
                { text: "Error Model", link: "/concepts/error-model" },
                { text: "Provider Concepts", link: "/concepts/providers" },
                { text: "Error Handling", link: "/advanced/error-handling" },
                { text: "Retries", link: "/advanced/retries" },
                { text: "Performance", link: "/advanced/performance" },
              ],
            },
          ],
        },
      ],
      "/delhivery/": [
        {
          text: "Delhivery",
          items: [
            { text: "Overview", link: "/delhivery/" },
            {
              text: "Authentication",
              link: "/delhivery/getting-started/authentication",
            },
            {
              text: "Configuration",
              link: "/delhivery/getting-started/configuration",
            },
            {
              text: "API Reference",
              items: [
                { text: "Client", link: "/delhivery/api/client" },
                { text: "Orders", link: "/delhivery/api/orders" },
                { text: "Shipments", link: "/delhivery/api/shipments" },
                { text: "Tracking", link: "/delhivery/api/tracking" },
                { text: "Rates", link: "/delhivery/api/rates" },
                {
                  text: "Serviceability",
                  link: "/delhivery/api/serviceability",
                },
                { text: "Waybills", link: "/delhivery/api/waybills" },
              ],
            },
            {
              text: "Guides",
              items: [
                { text: "Delhivery", link: "/delhivery/guides/" },
              ],
            },
            {
              text: "Examples",
              items: [
                {
                  text: "Delhivery Create Order",
                  link: "/delhivery/examples/create-order",
                },
              ],
            },
            {
              text: "Shared",
              items: [
                { text: "Providers API", link: "/shiprocket/api/providers" },
                { text: "Architecture", link: "/concepts/architecture" },
                { text: "Normalization", link: "/concepts/normalization" },
                { text: "Error Model", link: "/concepts/error-model" },
                { text: "Provider Concepts", link: "/concepts/providers" },
                { text: "Error Handling", link: "/advanced/error-handling" },
                { text: "Retries", link: "/advanced/retries" },
                { text: "Performance", link: "/advanced/performance" },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kush34/open-logistics",
      },
    ],
  },
};
