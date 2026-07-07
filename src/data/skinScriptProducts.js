// Skin Script Rx product catalog carried by GoodSkinGal.
//
// Fulfillment model:
//   - inStock:  Kristin keeps these on the shelf ("In stock — ready at your visit").
//   - dropship: Skin Script ships directly to the client
//               ("Ships in 24 hrs, delivery times may vary based off location").
//
// These are DEFAULTS. Kristin can override `listed`, `dropship`, `price`, and
// `inStock` at runtime from the Admin dashboard (stored per-device). See
// src/shop/catalogStore.js.
//
// Prices are approximate suggested retail (USD) and easily edited in Admin.

export const DROPSHIP_LABEL = 'Ships in 24 hrs, delivery times may vary based off location';
export const INSTOCK_LABEL = 'In stock — ready at your next visit';

// Prices below are real online retail (USD) so they're ready to go live.
// They are HIDDEN publicly by default — the shop shows "$xx.xx" until Kristin
// flips the "Show prices" switch in the Admin dashboard. This is the default
// used the first time the site loads on a device; the live value is stored via
// src/shop/settingsStore.js.
export const DEFAULT_SHOW_PRICES = false;

export function formatPrice(price, show) {
  return show ? `$${Number(price).toFixed(2)}` : '$xx.xx';
}

export const CATEGORIES = [
  'All',
  'Cleansers',
  'Toners & Pads',
  'Exfoliants',
  'Serums',
  'Moisturizers',
  'Sun Protection',
  'Eyes & Lips',
  'Masks & Enzymes',
  'Sets',
];

// listed:   shown in the shop
// dropship: uses the "Ships in 24 hrs" label instead of in-stock
// inStock:  informational quantity flag for in-house retail
export const PRODUCTS = [
  // ---------------- Cleansers ----------------
  {
    id: 'green-tea-citrus-cleanser',
    name: 'Green Tea Citrus Cleanser',
    category: 'Cleansers',
    price: 44.89,
    size: '6 oz',
    skinTypes: ['Normal', 'Combination', 'Sensitive'],
    blurb: 'A gentle, refreshing gel cleanser with green tea and citrus to soothe and calm without stripping.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'pomegranate-antioxidant-cleanser',
    name: 'Pomegranate Antioxidant Cleanser',
    category: 'Cleansers',
    price: 44.89,
    size: '6.4 oz',
    skinTypes: ['Dry', 'Sensitive', 'Rosacea'],
    blurb: 'Creamy antioxidant cleanser rich in pomegranate — ideal for dry, sensitive, or rosacea-prone skin.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'glycolic-cleanser',
    name: 'Glycolic Cleanser',
    category: 'Cleansers',
    price: 50.50,
    size: '6 oz',
    skinTypes: ['Oily', 'Acne', 'Aging'],
    blurb: 'A resurfacing glycolic acid cleanser that helps refine texture, unclog pores, and brighten.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'charcoal-clay-cleanser',
    name: 'Charcoal Clay Cleanser',
    category: 'Cleansers',
    price: 44.89,
    size: '4 oz',
    skinTypes: ['Oily', 'Acne', 'Congested'],
    blurb: 'Detoxifying charcoal and clay draw out impurities and absorb excess oil for a clarified finish.',
    listed: true,
    dropship: false,
    inStock: false,
  },

  // ---------------- Toners & Pads ----------------
  {
    id: 'cucumber-hydration-toner',
    name: 'Cucumber Hydration Toner',
    category: 'Toners & Pads',
    price: 33.67,
    size: '6 oz',
    skinTypes: ['All', 'Sensitive'],
    blurb: 'A hydrating, alcohol-free mist that calms and preps the skin for serums and moisturizer.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'clarifying-toner-pads',
    name: 'Clarifying Toner Pads',
    category: 'Toners & Pads',
    price: 30.86,
    size: '50 pads',
    skinTypes: ['Oily', 'Acne'],
    blurb: 'Pre-soaked pads with salicylic acid to keep pores clear and reduce breakouts on the go.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'glycolic-retinol-pads',
    name: 'Glycolic & Retinol Pads',
    category: 'Toners & Pads',
    price: 42.08,
    size: '50 pads',
    skinTypes: ['Aging', 'Sun Damage'],
    blurb: 'Nightly resurfacing pads pairing glycolic acid with retinol to smooth and renew.',
    listed: true,
    dropship: true,
    inStock: false,
  },

  // ---------------- Exfoliants ----------------
  {
    id: 'raspberry-refining-scrub',
    name: 'Raspberry Refining Scrub',
    category: 'Exfoliants',
    price: 44.89,
    size: '4 oz',
    skinTypes: ['All'],
    blurb: 'A polishing scrub with raspberry seeds and jojoba beads to sweep away dull, dry cells.',
    listed: true,
    dropship: false,
    inStock: true,
  },

  // ---------------- Serums ----------------
  {
    id: 'vitamin-c-green-tea-serum',
    name: 'Vitamin C / Green Tea Serum',
    category: 'Serums',
    price: 61.72,
    size: '1 oz',
    skinTypes: ['All', 'Aging', 'Dull'],
    blurb: 'Brightening antioxidant serum that helps even tone and defend against environmental stress.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'ageless-hydrating-serum',
    name: 'Ageless Skin Hydrating Serum',
    category: 'Serums',
    price: 56.11,
    size: '1 oz',
    skinTypes: ['Dry', 'Aging'],
    blurb: 'A plumping hydration serum with hyaluronic acid and peptides for a smoother, dewy look.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'mandelic-brightening-serum',
    name: 'Mandelic Brightening Serum',
    category: 'Serums',
    price: 56.11,
    size: '1 oz',
    skinTypes: ['Hyperpigmentation', 'Acne'],
    blurb: 'Gentle mandelic acid targets dark spots and uneven tone while refining texture.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'hyaluronic-serum',
    name: 'Hyaluronic Acid Serum',
    category: 'Serums',
    price: 56.11,
    size: '1 oz',
    skinTypes: ['Dry', 'Dehydrated', 'All'],
    blurb: 'Weightless multi-molecular hyaluronic acid delivers deep, lasting hydration.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'retinol-serum',
    name: 'Retinol Serum',
    category: 'Serums',
    price: 61.72,
    size: '1 oz',
    skinTypes: ['Aging', 'Sun Damage'],
    blurb: 'A nightly retinol treatment to support cell turnover, firmness, and a refined surface.',
    listed: true,
    dropship: true,
    inStock: false,
  },

  // ---------------- Moisturizers ----------------
  {
    id: 'hydrating-moisturizer',
    name: 'Hydrating Moisturizer',
    category: 'Moisturizers',
    price: 44.89,
    size: '1.7 oz',
    skinTypes: ['Dry', 'Normal'],
    blurb: 'A rich daily moisturizer that restores softness and locks in lasting hydration.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'light-aloe-moisturizer',
    name: 'Light Aloe Moisturizer',
    category: 'Moisturizers',
    price: 30.86,
    size: '2 oz',
    skinTypes: ['Oily', 'Combination', 'Acne'],
    blurb: 'A featherlight aloe-based hydrator perfect for oily and combination skin.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'acai-berry-moisturizer',
    name: 'Acai Berry Moisturizer',
    category: 'Moisturizers',
    price: 51.90,
    size: '1.7 oz',
    skinTypes: ['Aging', 'Dry'],
    blurb: 'Antioxidant-rich acai and vitamins nourish and protect mature or dehydrated skin.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'barrier-balancing-moisturizer',
    name: 'Barrier Balancing Moisturizer',
    category: 'Moisturizers',
    price: 51.90,
    size: '1.7 oz',
    skinTypes: ['Sensitive', 'Rosacea', 'Compromised'],
    blurb: 'Cacteen and ceramides rebuild a compromised barrier and calm redness.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'peptide-restoration-moisturizer',
    name: 'Peptide Restoration Moisturizer',
    category: 'Moisturizers',
    price: 56.11,
    size: '1.7 oz',
    skinTypes: ['Aging'],
    blurb: 'A peptide-powered night cream that supports firmness and a rested, restored look.',
    listed: true,
    dropship: true,
    inStock: false,
  },

  // ---------------- Sun Protection ----------------
  {
    id: 'sheer-protection-spf-30',
    name: 'Sheer Protection SPF 30',
    category: 'Sun Protection',
    price: 42.08,
    size: '2.5 oz',
    skinTypes: ['All'],
    blurb: 'A lightweight, non-greasy daily sunscreen that layers beautifully under makeup.',
    listed: true,
    dropship: false,
    inStock: true,
  },
  {
    id: 'tinted-spf-30',
    name: 'Tinted Sheer Protection SPF 30',
    category: 'Sun Protection',
    price: 42.08,
    size: '2.5 oz',
    skinTypes: ['All'],
    blurb: 'The daily favorite with a universal tint for a smooth, even, protected finish.',
    listed: true,
    dropship: false,
    inStock: true,
  },

  // ---------------- Eyes & Lips ----------------
  {
    id: 'peptide-eye-serum',
    name: 'Peptide Eye Serum',
    category: 'Eyes & Lips',
    price: 51.90,
    size: '0.5 oz',
    skinTypes: ['All', 'Aging'],
    blurb: 'A cooling peptide roller-serum to de-puff and brighten the delicate eye area.',
    listed: true,
    dropship: true,
    inStock: false,
  },
  {
    id: 'lip-balm-spf-15',
    name: 'Lip Balm with SPF 15',
    category: 'Eyes & Lips',
    price: 12.00,
    size: '0.15 oz',
    skinTypes: ['All'],
    blurb: 'A nourishing, protective lip balm with SPF 15 for everyday softness.',
    listed: true,
    dropship: false,
    inStock: true,
  },

  // ---------------- Masks & Enzymes ----------------
  {
    id: 'botanical-bloom-mask',
    name: 'Botanical Bloom Hydrating Mask',
    category: 'Masks & Enzymes',
    price: 42.08,
    size: '2 oz',
    skinTypes: ['Dry', 'Dehydrated'],
    blurb: 'A soothing, botanical hydrating mask for a plump, glowing complexion.',
    listed: true,
    dropship: true,
    inStock: false,
  },

  // ---------------- Sets ----------------
  {
    id: 'ultimate-glow-up-set',
    name: 'Ultimate Glow Up Set',
    category: 'Sets',
    price: 120.00,
    size: 'Kit',
    skinTypes: ['All'],
    blurb: 'A curated routine — cleanse, treat, hydrate, and protect — bundled at a set price.',
    listed: true,
    dropship: true,
    inStock: false,
  },
];

// Deterministic accent color per category, used for the product-card artwork.
export const CATEGORY_COLORS = {
  Cleansers: ['#c9dce6', '#8fb2c4'],
  'Toners & Pads': ['#d7e6dd', '#93b8a4'],
  Exfoliants: ['#efd9c7', '#d3a982'],
  Serums: ['#e6d3e2', '#b48fac'],
  Moisturizers: ['#e7dccf', '#cbb6a2'],
  'Sun Protection': ['#f3e5c0', '#dcc079'],
  'Eyes & Lips': ['#e9cfd2', '#c795a0'],
  'Masks & Enzymes': ['#e2ddc4', '#bcb478'],
  Sets: ['#cbd6e6', '#8f9fc4'],
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
