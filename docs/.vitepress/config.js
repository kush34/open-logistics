const pkg = require("../../package.json");

const SITE_URL = "https://open-logistics.vercel.app";
const SITE_NAME = "Open-Logistics";
const SITE_DESCRIPTION =
  "TypeScript, Python, and Rust SDK documentation for the Shiprocket and Delhivery logistics APIs.";

const sectionNames = {
  "getting-started": "Getting Started",
  api: "API Reference",
  guides: "Guides",
  examples: "Examples",
  concepts: "Concepts",
  advanced: "Advanced",
  languages: "Python and Rust",
  shiprocket: "Shiprocket",
  delhivery: "Delhivery",
};

const sectionLinks = {
  shiprocket: `${SITE_URL}/shiprocket/`,
  delhivery: `${SITE_URL}/delhivery/`,
};

// Pages kept only to redirect old URLs to their new home.
const redirectPages = {
  "shiprocket/getting-started/installation.md": "getting-started/installation.md",
};

function pageUrl(relativePath) {
  const target = redirectPages[relativePath] || relativePath;
  if (target === "index.md") return `${SITE_URL}/`;
  if (target.endsWith("/index.md")) {
    return `${SITE_URL}/${target.replace(/index\.md$/, "")}`;
  }
  return `${SITE_URL}/${target.replace(/\.md$/, ".html")}`;
}

function breadcrumb(pageData, canonical) {
  const parts = pageData.relativePath.replace(/\.md$/, "").split("/");
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
  ];
  let path = "";

  parts.forEach((part, index) => {
    if (part === "index" && index === parts.length - 1) return;
    path = path ? `${path}/${part}` : part;
    const isLast = index === parts.length - 1;
    if (!isLast && !sectionLinks[part]) return;
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: isLast ? pageData.title : sectionNames[part] || part,
      item: isLast ? canonical : sectionLinks[part],
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** @type {import('vitepress').UserConfig} */
module.exports = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  lang: "en-US",
  lastUpdated: true,
  sitemap: {
    hostname: SITE_URL,
    transformItems: (items) =>
      items.filter(
        (item) => item.url !== "shiprocket/getting-started/installation.html",
      ),
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    ["meta", { name: "theme-color", content: "#3451b2" }],
  ],
  transformHead({ pageData }) {
    const canonical = pageUrl(pageData.relativePath);
    const isHome = pageData.relativePath === "index.md";
    const title = isHome
      ? `${SITE_NAME} — Shiprocket and Delhivery SDK`
      : `${pageData.title} | ${SITE_NAME}`;
    const description = pageData.description || SITE_DESCRIPTION;
    const image = `${SITE_URL}/og-image.png`;

    const tags = [
      ["link", { rel: "canonical", href: canonical }],
      ["meta", { property: "og:type", content: isHome ? "website" : "article" }],
      ["meta", { property: "og:site_name", content: SITE_NAME }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { property: "og:image:width", content: "1200" }],
      ["meta", { property: "og:image:height", content: "630" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: image }],
    ];

    if (isHome) {
      tags.push([
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          softwareVersion: pkg.version,
          license: "https://opensource.org/licenses/MIT",
          codeRepository: pkg.repository.url,
          programmingLanguage: ["TypeScript", "Python", "Rust"],
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      ]);
    } else {
      tags.push([
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: pageData.title,
          description,
          url: canonical,
          ...(pageData.lastUpdated
            ? { dateModified: new Date(pageData.lastUpdated).toISOString() }
            : {}),
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }),
      ]);
      tags.push([
        "script",
        { type: "application/ld+json" },
        JSON.stringify(breadcrumb(pageData, canonical)),
      ]);
    }

    return tags;
  },
  themeConfig: {
    logo: { src: "/logo.svg", alt: "Open-Logistics" },
    search: {
      provider: "local",
    },
    nav: [
      { text: "Shiprocket", link: "/shiprocket/" },
      { text: "Delhivery", link: "/delhivery/" },
      { text: "Python & Rust", link: "/languages/" },
    ],
    sidebar: {
      "/shiprocket/": [
        {
          text: "Shiprocket",
          items: [
            { text: "Overview", link: "/shiprocket/" },
            {
              text: "Installation",
              link: "/getting-started/installation",
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
                { text: "Python & Rust", link: "/languages/" },
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
              text: "Installation",
              link: "/getting-started/installation",
            },
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
              items: [{ text: "Delhivery", link: "/delhivery/guides/" }],
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
                { text: "Python & Rust", link: "/languages/" },
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
      "/": [
        {
          text: "Getting started",
          items: [
            { text: "Installation", link: "/getting-started/installation" },
            { text: "Python & Rust", link: "/languages/" },
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
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kush34/open-logistics",
      },
    ],
  },
};
