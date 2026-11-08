<template>
  <section class="home-cards">
    <div class="home-group">
      <h2 class="home-group-title">Supported couriers</h2>
      <div class="home-group-cards">
        <a class="home-card" href="/shiprocket/">
          <img
            class="home-logo"
            src="/logos/shiprocket.svg"
            alt="Shiprocket"
            width="108"
            height="24"
          />
          <span class="home-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11 11 5" /><path d="M6.5 5H11v4.5" /></svg></span>
          <div class="home-tags">
            <span>orders</span><span>tracking</span><span>rates</span>
          </div>
        </a>
        <a class="home-card" href="/delhivery/">
          <img
            class="home-logo"
            src="/logos/delhivery.png"
            alt="Delhivery"
            width="143"
            height="24"
          />
          <span class="home-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11 11 5" /><path d="M6.5 5H11v4.5" /></svg></span>
          <div class="home-tags">
            <span>orders</span><span>serviceability</span><span>labels</span>
          </div>
        </a>
      </div>
    </div>

    <div class="home-group">
      <h2 class="home-group-title">SDKs and docs</h2>
      <div class="home-group-cards">
        <a class="home-card" href="/languages/">
          <svg
            class="home-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span class="home-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11 11 5" /><path d="M6.5 5H11v4.5" /></svg></span>
          <h3>Typed SDKs</h3>
          <p>Fully typed clients for TypeScript, Python, and Rust, with normalized errors.</p>
        </a>
        <a class="home-card" href="/getting-started/installation">
          <svg
            class="home-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          </svg>
          <span class="home-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11 11 5" /><path d="M6.5 5H11v4.5" /></svg></span>
          <h3>Practical docs</h3>
          <p>Install, authenticate, configure, and copy working examples.</p>
        </a>
      </div>
    </div>
  </section>
</template>
