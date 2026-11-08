<script setup>
import { ref } from "vue";

const tabs = [
  { id: "ts", label: "TypeScript" },
  { id: "py", label: "Python" },
  { id: "rs", label: "Rust" },
];

const active = ref("ts");
</script>

<template>
  <div class="hero-code">
    <div class="hero-code-bar">
      <span class="hero-code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <div class="hero-code-tabs" role="group" aria-label="Language">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          :aria-pressed="active === tab.id"
          @click="active = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <pre v-if="active === 'ts'"><code><span class="c">// create an order, then read the shipment id</span>
<span class="k">const</span> order = <span class="k">await</span> shiprocket.<span class="f">createOrder</span>(payload);
order.shipment_id; <span class="c">// 123456789</span></code></pre>

    <pre v-else-if="active === 'py'"><code><span class="c"># create an order, then read the shipment id</span>
order = OrdersApi(api_client).<span class="f">orders_create</span>(payload)
order.shipment_id  <span class="c"># 123456789</span></code></pre>

    <pre v-else><code><span class="c">// create an order, then read the shipment id</span>
<span class="k">let</span> order = orders_api::<span class="f">orders_create</span>(&amp;configuration, payload)
    .<span class="k">await</span>?;
order.shipment_id; <span class="c">// 123456789</span></code></pre>
  </div>
</template>
