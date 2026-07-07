import { useSyncExternalStore } from 'react';
import { DEFAULT_SHOW_PRICES } from '../data/skinScriptProducts';

// Whether real prices are shown publicly. Controlled by the "Show prices"
// switch in the Admin dashboard and remembered per-device in localStorage.
// While off, the shop displays "$xx.xx" everywhere.
//
// NOTE: like the catalog overrides, this is per-browser today. Connecting a
// shared backend later makes one flip apply to every visitor.

const STORAGE_KEY = 'gsg_show_prices_v1';

let showPrices = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_SHOW_PRICES;
    return raw === '1';
  } catch {
    return DEFAULT_SHOW_PRICES;
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, showPrices ? '1' : '0');
  } catch {
    /* storage unavailable — keep in-memory only */
  }
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return showPrices;
}

export function setShowPrices(value) {
  showPrices = !!value;
  persist();
  listeners.forEach((l) => l());
}

export function useShowPrices() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
