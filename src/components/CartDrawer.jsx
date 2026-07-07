import { useMemo } from 'react';
import { useCart } from '../shop/CartContext';
import { useCatalog } from '../shop/catalogStore';
import {
  DROPSHIP_LABEL,
  SHOW_PRICES,
  formatPrice,
  productInitials,
  CATEGORY_COLORS,
} from '../data/skinScriptProducts';
import './CartDrawer.css';

const ORDER_EMAIL = 'yourgoodskingal@gmail.com';

function buildOrderMailto(lines, subtotal) {
  const pricePart = (l) =>
    SHOW_PRICES
      ? ` ($${l.price.toFixed(2)} each = $${(l.qty * l.price).toFixed(2)})`
      : ' (price TBD)';

  const body = [
    'Hi Kristin! I would like to order the following Skin Script products:',
    '',
    ...lines.map(
      (l) =>
        `- ${l.qty} x ${l.name}${pricePart(l)}` +
        (l.dropship ? '  [ship to me]' : '  [pick up]')
    ),
    '',
    SHOW_PRICES ? `Estimated subtotal: $${subtotal.toFixed(2)}` : 'Estimated subtotal: TBD',
    '',
    'My name: ',
    'Best phone: ',
    'Shipping address (for shipped items): ',
    '',
    'Thank you!',
  ].join('\n');

  const subject = 'Skin Script order request';
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function CartDrawer() {
  const { items, open, setOpen, setQty, removeItem, clear, count } = useCart();
  const catalog = useCatalog();

  const byId = useMemo(() => {
    const map = {};
    catalog.forEach((p) => { map[p.id] = p; });
    return map;
  }, [catalog]);

  const lines = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => {
          const p = byId[id];
          if (!p) return null;
          return { id, qty, name: p.name, price: p.price, dropship: p.dropship, category: p.category };
        })
        .filter(Boolean),
    [items, byId]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.price, 0),
    [lines]
  );

  const hasShipped = lines.some((l) => l.dropship);

  return (
    <>
      <div
        className={`cart__overlay ${open ? 'cart__overlay--show' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`cart ${open ? 'cart--open' : ''}`} aria-hidden={!open}>
        <div className="cart__head">
          <h3 className="cart__title">Your Cart {count > 0 && <span>({count})</span>}</h3>
          <button className="cart__close" onClick={() => setOpen(false)} aria-label="Close cart">
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <p>Your cart is empty.</p>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
              Browse products
            </button>
          </div>
        ) : (
          <>
            <div className="cart__items">
              {lines.map((l) => {
                const [g1, g2] = CATEGORY_COLORS[l.category] || ['#e7dccf', '#cbb6a2'];
                return (
                  <div className="cart__item" key={l.id}>
                    <div
                      className="cart__thumb"
                      style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
                    >
                      {productInitials(l.name)}
                    </div>
                    <div className="cart__item-info">
                      <p className="cart__item-name">{l.name}</p>
                      <p className={`cart__item-fulfill ${l.dropship ? 'is-ship' : 'is-stock'}`}>
                        {l.dropship ? 'Ships in 24 hrs' : 'Pick up at visit'}
                      </p>
                      <div className="cart__qty">
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                        <button
                          className="cart__remove"
                          onClick={() => removeItem(l.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="cart__item-price">{formatPrice(l.qty * l.price)}</span>
                  </div>
                );
              })}
            </div>

            <div className="cart__foot">
              <div className="cart__subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {hasShipped && (
                <p className="cart__ship-note">
                  {DROPSHIP_LABEL}. Shipping &amp; tax are confirmed on your invoice.
                </p>
              )}
              <a
                className="btn btn-primary cart__checkout"
                href={buildOrderMailto(lines, subtotal)}
              >
                Send Order Request
              </a>
              <p className="cart__pay-note">
                Kristin will confirm availability and send a secure payment link /
                invoice. Live card checkout is coming soon.
              </p>
              <button className="cart__clear" onClick={clear}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
