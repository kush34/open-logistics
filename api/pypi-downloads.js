// pypistats.org sends no CORS headers, so the browser reads PyPI counts through
// this function instead. Vercel deploys everything under api/ automatically.
const PACKAGE = "open-logistics-sdk";
const UPSTREAM = `https://pypistats.org/api/packages/${PACKAGE}/overall?mirrors=false`;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  try {
    const upstream = await fetch(UPSTREAM, {
      headers: { "User-Agent": "open-logistics-docs" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) throw new Error(String(upstream.status));
    const body = await upstream.json();
    const data = Array.isArray(body?.data) ? body.data : [];
    res.status(200).json({ data });
  } catch {
    res.status(502).json({ error: "pypi stats unavailable" });
  }
};
