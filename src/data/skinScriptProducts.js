// Skin Script product catalog carried by GoodSkinGal.
//
// The product list is generated from Skin Script's own live catalog
// (skinscript.com) and stored in skinScriptProducts.generated.json. To refresh
// it, re-run scripts/gen_catalog.ps1 against a fresh Store API snapshot.
//
// Fields per product:
//   id        - Skin Script product slug (stable key)
//   name      - display name
//   category  - shop grouping (see CATEGORY_ORDER below)
//   skinTypes - skin-type tags
//   price     - real online retail (USD); HIDDEN publicly until Kristin flips
//               the "Show prices" switch in Admin
//   size      - pack size if present in the name
//   blurb     - short description
//   image     - official product photo URL from skinscript.com
//   pro       - professional / back-bar item ("Pro" toggle in Admin)
//   retail    - part of Skin Script's retail line (drives default visibility)
//   listed    - shown in the public shop (default = retail)
//   dropship  - uses the "Ships in 24 hrs" label instead of in-house pickup
//   inStock   - informational in-house quantity flag
//
// listed / dropship / price / inStock / pro / trashed are all overridable at
// runtime from the Admin dashboard (stored per-device). See catalogStore.js.

import PRODUCTS_DATA from './skinScriptProducts.generated.json';

export const DROPSHIP_LABEL = 'Ships in 24 hrs, delivery times may vary based off location';
export const INSTOCK_LABEL = 'In stock — ready at your next visit';

// Prices are loaded and ready, but HIDDEN publicly by default. The shop shows
// "$xx.xx" until Kristin flips the "Show prices" switch in Admin. The live
// value is stored via src/shop/settingsStore.js.
export const DEFAULT_SHOW_PRICES = false;

export function formatPrice(price, show) {
  return show ? `$${Number(price).toFixed(2)}` : '$xx.xx';
}

// Preferred display order for the shop's category chips.
const CATEGORY_ORDER = [
  'Cleansers',
  'Toners',
  'Exfoliants',
  'Enzymes',
  'Masks',
  'Serums & Lips',
  'Moisturizers',
  'Sunscreen (SPF)',
  'Peel Care',
  'Chemical Peels',
  'Tools',
  'Kits & Collections',
  'Other',
];

function fallbackBlurb(p) {
  const article = /^[aeiou]/i.test(p.category) ? 'an' : 'a';
  return `A Skin Script professional formula — ${article} ${p.category.toLowerCase()} selection curated by Kristin.`;
}

export const PRODUCTS = PRODUCTS_DATA.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  skinTypes: p.skinTypes || [],
  price: p.price,
  size: p.size || '',
  blurb: p.blurb && p.blurb.length > 3 ? p.blurb : fallbackBlurb(p),
  image: p.image || '',
  pro: !!p.pro,
  retail: !!p.retail,
  listed: !!p.listed,
  dropship: !!p.dropship,
  inStock: !!p.inStock,
  trashed: false,
}));

// Categories present in the data, in preferred order, with 'All' first.
const present = new Set(PRODUCTS.map((p) => p.category));
export const CATEGORIES = [
  'All',
  ...CATEGORY_ORDER.filter((c) => present.has(c)),
  ...[...present].filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
];

// Deterministic accent color per category, used for the card artwork fallback.
export const CATEGORY_COLORS = {
  Cleansers: ['#c9dce6', '#8fb2c4'],
  Toners: ['#d7e6dd', '#93b8a4'],
  Exfoliants: ['#efd9c7', '#d3a982'],
  Enzymes: ['#f0dcc0', '#d8b271'],
  Masks: ['#e2ddc4', '#bcb478'],
  'Serums & Lips': ['#e6d3e2', '#b48fac'],
  Moisturizers: ['#e7dccf', '#cbb6a2'],
  'Sunscreen (SPF)': ['#f3e5c0', '#dcc079'],
  'Peel Care': ['#dfe1ea', '#a9afc4'],
  'Chemical Peels': ['#e9cfd2', '#c795a0'],
  Tools: ['#d6dbe0', '#9aa7b3'],
  'Kits & Collections': ['#cbd6e6', '#8f9fc4'],
  Other: ['#e7dccf', '#cbb6a2'],
};

export function productInitials(name) {
  return name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
