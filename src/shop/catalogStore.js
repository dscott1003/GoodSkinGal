import { useSyncExternalStore } from 'react';
import { PRODUCTS } from '../data/skinScriptProducts';

// Runtime overrides for the catalog (listed / dropship / price / inStock),
// controlled from the Admin dashboard and stored per-device in localStorage.
//
// NOTE: localStorage is per-browser, so admin changes take effect on the
// device where they are made. To broadcast catalog changes to every visitor
// from anywhere, connect a shared backend (see the notes in Admin.jsx).

const STORAGE_KEY = 'gsg_catalog_overrides_v1';
const EDITABLE_FIELDS = ['listed', 'dropship', 'price', 'inStock'];

let overrides = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    /* storage unavailable — keep in-memory only */
  }
}

// A stable, memoized merged snapshot so useSyncExternalStore doesn't loop.
let cachedSnapshot = buildSnapshot();

function buildSnapshot() {
  return PRODUCTS.map((p) => {
    const o = overrides[p.id] || {};
    const merged = { ...p };
    for (const field of EDITABLE_FIELDS) {
      if (o[field] !== undefined) merged[field] = o[field];
    }
    return merged;
  });
}

function emit() {
  cachedSnapshot = buildSnapshot();
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cachedSnapshot;
}

export function updateProduct(id, patch) {
  const clean = {};
  for (const field of EDITABLE_FIELDS) {
    if (patch[field] !== undefined) clean[field] = patch[field];
  }
  overrides = { ...overrides, [id]: { ...(overrides[id] || {}), ...clean } };
  emit();
}

export function resetOverrides() {
  overrides = {};
  emit();
}

export function exportConfig() {
  // A compact JSON of just the edited defaults, handy to hand back to the dev
  // so the shared/deployed defaults can be updated to match.
  return JSON.stringify(overrides, null, 2);
}

export function useCatalog() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
