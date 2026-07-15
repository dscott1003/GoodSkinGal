// PUBLISHED catalog overrides — Kristin's customizations that are LIVE for every
// visitor on every device. These are layered on top of the raw Skin Script
// catalog (skinScriptProducts.generated.json) when the site builds PRODUCTS.
//
// Workflow: Kristin edits in /#admin (stored in her browser), clicks
// "Copy changes to publish", and sends the JSON. Paste the `overrides` and
// `purged` values here, then commit + redeploy — the changes go live for all.
//
// Fields honored: price, listed, dropship, inStock, pro.
// `purged` ids are permanently removed from the catalog.

export const PUBLISHED_OVERRIDES = {
  'charcoal-clay-cleanser': { price: 4.74 },
  'green-tea-citrus-cleanser': { inStock: false },
  'pre-post-peel-rack-card-12-pack': { pro: true },
  'discovery-kit': { listed: false },
  'fan-brush': { listed: false },
  'shopping-bags': { listed: false },
  'desert-collection-sensory-mists': { listed: false, inStock: true },
  'everyday-balance-travel-kit': { dropship: true },
  'fully-quenched-travel-kit': { dropship: true },
  'cosmo-intro-kit': { pro: true },
  'retail-clinic-kit': { pro: true },
  'retail-intro-kit': { pro: true },
  'botanical-bloom-hydrating-mask': { dropship: true, listed: false, pro: true },
  'revitalizing-cucumber-treatment': { listed: false, dropship: true },
};

export const PUBLISHED_PURGED = [];
