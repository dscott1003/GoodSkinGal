import { useSyncExternalStore } from 'react';
import { PRODUCTS } from '../data/skinScriptProducts';

// Runtime overrides for the catalog (listed / dropship / price / inStock / pro /
// trashed), controlled from the Admin dashboard and stored per-device in
// localStorage.
//
// Trash model:
//   - trashed: item is soft-deleted (hidden from the shop, shown in the Admin
//     Trash bin, and restorable).
//   - purged:  emptying the trash permanently removes the item from the catalog
//     snapshot on this device.
//
// NOTE: localStorage is per-browser, so admin changes take effect on the device
// where they are made. To broadcast catalog changes to every visitor from
// anywhere, connect a shared backend (see the notes in Admin.jsx).

const STORAGE_KEY = 'gsg_catalog_overrides_v1';
const PURGE_KEY = 'gsg_catalog_purged_v1';
const EDITABLE_FIELDS = ['listed', 'dropship', 'price', 'inStock', 'pro', 'trashed'];

let overrides = loadJSON(STORAGE_KEY, {});
let purged = loadJSON(PURGE_KEY, []);
const listeners = new Set();

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    localStorage.setItem(PURGE_KEY, JSON.stringify(purged));
  } catch {
    /* storage unavailable — keep in-memory only */
  }
}

// A stable, memoized merged snapshot so useSyncExternalStore doesn't loop.
let cachedSnapshot = buildSnapshot();

function buildSnapshot() {
  const purgedSet = new Set(purged);
  return PRODUCTS.filter((p) => !purgedSet.has(p.id)).map((p) => {
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

export function trashProduct(id) {
  updateProduct(id, { trashed: true });
}

export function restoreProduct(id) {
  updateProduct(id, { trashed: false });
}

// Permanently remove every currently-trashed item from this device's catalog.
export function emptyTrash() {
  const trashedIds = cachedSnapshot.filter((p) => p.trashed).map((p) => p.id);
  if (trashedIds.length === 0) return;
  purged = [...new Set([...purged, ...trashedIds])];
  const next = { ...overrides };
  trashedIds.forEach((id) => delete next[id]);
  overrides = next;
  emit();
}

export function resetOverrides() {
  overrides = {};
  purged = [];
  emit();
}

export function exportConfig() {
  // A compact JSON of just the edited defaults + purges, handy to hand back to
  // the dev so the shared/deployed defaults can be updated to match.
  return JSON.stringify({ overrides, purged }, null, 2);
}

export function useCatalog() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
