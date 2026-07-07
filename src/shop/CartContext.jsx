import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';

const CART_KEY = 'gsg_cart_v1';

const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  // items: { [productId]: quantity }
  const [items, setItems] = useState(loadCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback((id, qty = 1) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
    setOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const count = useMemo(
    () => Object.values(items).reduce((sum, q) => sum + q, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, open, setOpen, addItem, setQty, removeItem, clear }),
    [items, count, open, addItem, setQty, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
