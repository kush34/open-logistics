const fs = require("fs");
const path = require("path");
const pkg = require("../../package.json");

const SITE_URL = "https://open-logistics.vercel.app";
const SITE_NAME = "Open-Logistics";
const SITE_DESCRIPTION =
  "TypeScript, Python, and Rust SDK documentation for the Shiprocket and Delhivery logistics APIs.";
const REPO_URL = "https://github.com/kush34/open-logistics";
const DOCS_ROOT = path.resolve(__dirname, "..");

const STAR_ICON =
  '<span class="star-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg></span>';

// Build-time star count keeps the nav free of client-side fetches; offline
// builds just show the label without a number.
async function starNavItem() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/kush34/open-logistics",
      {
        headers: { accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (response.ok) {
      const { stargazers_count: stars } = await response.json();
      return {
        text: `${STAR_ICON}Star on GitHub <span class="star-count">${stars}</span>`,
        link: REPO_URL,
      };
    }
  } catch {
    // Offline or rate limited; the link still works.
  }
  return { text: `${STAR_ICON}Star on GitHub`, link: REPO_URL };
}

const packageLinks = {
  npm: "https://www.npmjs.com/package/open-logistics",
  pypi: "https://pypi.org/project/open-logistics-sdk/",
  crates: "https://crates.io/crates/open-logistics",
};

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
  return `${SITE_URL}/${target.replace(/\.md$/, "")}`;
}

function isRedirect(relativePath) {
  return relativePath in redirectPages;
}

function stripInline(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
}

// Read the FAQ that is already rendered on a page, so structured data never
// drifts from the visible copy.
const faqCache = new Map();

function faqFor(relativePath) {
  if (faqCache.has(relativePath)) return faqCache.get(relativePath);

  const entries = [];
  const file = path.join(DOCS_ROOT, relativePath);

  if (fs.existsSync(file)) {
    let inFaq = false;
    let current = null;

    for (const rawLine of fs.readFileSync(file, "utf8").split("\n")) {
      const line = rawLine.trim();
      if (/^##\s+(FAQ|Frequently asked questions)$/i.test(line)) {
        inFaq = true;
        continue;
      }
      if (inFaq && /^##\s+/.test(line)) break;
      if (!inFaq) continue;

      const question = line.match(/^###\s+(.+)$/);
      if (question) {
        if (current && current.answer) entries.push(current);
        current = { question: question[1], answer: "" };
        continue;
      }
      if (current && line && !line.startsWith(":::") && !line.startsWith("<")) {
        current.answer = current.answer ? `${current.answer} ${line}` : line;
      }
    }
    if (current && current.answer) entries.push(current);
    if (inFaq && !entries.length) {
      throw new Error(`FAQ heading in ${relativePath} has no parseable questions`);
    }
  }

  const result = entries.map(({ question, answer }) => ({
    "@type": "Question",
    name: stripInline(question),
    acceptedAnswer: { "@type": "Answer", text: stripInline(answer) },
  }));

  faqCache.set(relativePath, result);
  return result;
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
  sameAs: [
    REPO_URL,
    packageLinks.npm,
    packageLinks.pypi,
    packageLinks.crates,
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function structuredData(pageData, canonical, description, isHome) {
  const graph = [organization, website];
  const faq = faqFor(pageData.relativePath);

  if (isHome) {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      softwareVersion: pkg.version,
      license: "https://opensource.org/licenses/MIT",
      codeRepository: REPO_URL,
      programmingLanguage: ["TypeScript", "Python", "Rust"],
      featureList: [
        "Shiprocket orders, shipments, courier, tracking, and rates",
        "Delhivery B2C orders, tracking, serviceability, rates, labels, pickups, and waybills",
        "Normalized API errors",
        "Automatic Shiprocket token refresh on 401",
      ],
      keywords: "Shiprocket SDK, Delhivery SDK, logistics API, TypeScript, Python, Rust",
      sameAs: [REPO_URL, packageLinks.npm, packageLinks.pypi, packageLinks.crates],
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  } else {
    const section = pageData.relativePath.split("/")[0];
    graph.push({
      "@type": "TechArticle",
      "@id": `${canonical}#article`,
      headline: pageData.title,
      name: pageData.title,
      description,
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      inLanguage: "en-US",
      articleSection: sectionNames[section] || "Documentation",
      keywords: [pageData.title, sectionNames[section], "Shiprocket", "Delhivery"]
        .filter(Boolean)
        .join(", "),
      ...(pageData.lastUpdated
        ? { dateModified: new Date(pageData.lastUpdated).toISOString() }
        : {}),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    });
    graph.push(breadcrumb(pageData, canonical));
  }

  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faq,
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// Concatenate every page into one file for LLM crawlers that prefer a single
// fetch (the llms-full.txt convention). Generated at build time, never edited.
function writeLlmsFull(outDir) {
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "public") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) files.push(full);
    }
  };
  walk(DOCS_ROOT);

  const sections = files
    .map((file) => path.relative(DOCS_ROOT, file).split(path.sep).join("/"))
    .filter((relativePath) => !isRedirect(relativePath))
    .sort((a, b) => {
      if (a === "index.md") return -1;
      if (b === "index.md") return 1;
      return a.localeCompare(b);
    })
    .map((relativePath) => {
      const raw = fs.readFileSync(path.join(DOCS_ROOT, relativePath), "utf8");
      const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
      return `<!-- ${relativePath} -->\n\n${body}`;
    });

  const header = [
    "# Open-Logistics — full documentation",
    "",
    `> ${SITE_DESCRIPTION} This file mirrors every page of ${SITE_URL} in plain Markdown for language models and answer engines.`,
    "",
    `Source: ${REPO_URL}`,
  ].join("\n");

  fs.writeFileSync(
    path.join(outDir, "llms-full.txt"),
    `${header}\n\n${sections.join("\n\n---\n\n")}\n`,
  );
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
module.exports = async () => ({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  lang: "en-US",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    theme: {
      light: "github-light-high-contrast",
      dark: "github-dark-high-contrast",
    },
  },
  sitemap: {
    hostname: SITE_URL,
    transformItems: (items) =>
      items.filter(
        (item) => item.url !== "shiprocket/getting-started/installation",
      ),
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    [
      "meta",
      {
        name: "theme-color",
        content: "#ffffff",
        media: "(prefers-color-scheme: light)",
      },
    ],
    [
      "meta",
      {
        name: "theme-color",
        content: "#0a0a0a",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    [
      "link",
      {
        rel: "alternate",
        href: `${SITE_URL}/llms.txt`,
        type: "text/markdown",
        title: "LLM-friendly documentation index",
      },
    ],
  ],
  transformHead({ pageData }) {
    const canonical = pageUrl(pageData.relativePath);
    const isHome = pageData.relativePath === "index.md";
    const isSection = pageData.relativePath.endsWith("/index.md");
    const redirect = isRedirect(pageData.relativePath) || pageData.relativePath === "404.md";
    const title = isHome
      ? `${SITE_NAME} — Shiprocket and Delhivery SDK`
      : `${pageData.title} | ${SITE_NAME}`;
    const description = pageData.description || SITE_DESCRIPTION;
    const image = `${SITE_URL}/og-image.png`;
    const imageAlt = `${SITE_NAME} — Shiprocket and Delhivery SDK documentation`;

    const tags = [
      ...(pageData.relativePath === "404.md"
        ? []
        : [["link", { rel: "canonical", href: canonical }]]),
      [
        "meta",
        {
          name: "robots",
          content: redirect
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
      ],
      ["meta", { name: "author", content: SITE_NAME }],
      ["meta", { property: "og:type", content: isHome || isSection ? "website" : "article" }],
      ["meta", { property: "og:site_name", content: SITE_NAME }],
      ["meta", { property: "og:locale", content: "en_US" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { property: "og:image:width", content: "1200" }],
      ["meta", { property: "og:image:height", content: "630" }],
      ["meta", { property: "og:image:alt", content: imageAlt }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: image }],
      ["meta", { name: "twitter:image:alt", content: imageAlt }],
    ];

    if (!redirect) {
      tags.push([
        "script",
        { type: "application/ld+json" },
        JSON.stringify(structuredData(pageData, canonical, description, isHome)),
      ]);
    }

    return tags;
  },
  buildEnd(siteConfig) {
    writeLlmsFull(siteConfig.outDir);
  },
  themeConfig: {
    logo: { src: "/logo.svg", alt: "Open-Logistics" },
    search: {
      provider: "local",
    },
    nav: [
      { text: "Shiprocket", link: "/shiprocket/" },
      { text: "Delhivery", link: "/delhivery/" },
      { text: "SDKs", link: "/languages/" },
      await starNavItem(),
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
  },
});
