import { useMemo, useState } from 'react';
import { getBookingLinkProps } from '../config';
import { useCatalog } from '../shop/catalogStore';
import { useCart } from '../shop/CartContext';
import {
  CATEGORIES,
  CATEGORY_COLORS,
  DROPSHIP_LABEL,
  INSTOCK_LABEL,
  SHOW_PRICES,
  formatPrice,
  productInitials,
} from '../data/skinScriptProducts';
import './Shop.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [g1, g2] = CATEGORY_COLORS[product.category] || ['#e7dccf', '#cbb6a2'];

  return (
    <article className="shop__card">
      <div
        className="shop__art"
        style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
      >
        <span className="shop__art-initials">{productInitials(product.name)}</span>
        <span className="shop__art-size">{product.size}</span>
      </div>

      <div className="shop__body">
        <span className="shop__cat">{product.category}</span>
        <h3 className="shop__name">{product.name}</h3>
        <p className="shop__blurb">{product.blurb}</p>

        {product.skinTypes?.length > 0 && (
          <div className="shop__tags">
            {product.skinTypes.slice(0, 3).map((t) => (
              <span key={t} className="shop__tag">{t}</span>
            ))}
          </div>
        )}

        <div
          className={`shop__fulfillment ${
            product.dropship ? 'shop__fulfillment--ship' : 'shop__fulfillment--stock'
          }`}
        >
          <span className="shop__fulfillment-dot" />
          {product.dropship ? DROPSHIP_LABEL : INSTOCK_LABEL}
        </div>

        <div className="shop__footer">
          <span className="shop__price">{formatPrice(product.price)}</span>
          <button
            className="btn btn-primary shop__add"
            onClick={() => addItem(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Shop() {
  const catalog = useCatalog();
  const [activeCat, setActiveCat] = useState('All');

  const listed = useMemo(
    () => catalog.filter((p) => p.listed),
    [catalog]
  );

  const visible = useMemo(
    () => (activeCat === 'All' ? listed : listed.filter((p) => p.category === activeCat)),
    [listed, activeCat]
  );

  // Only show category chips that actually have listed products.
  const availableCats = useMemo(
    () => CATEGORIES.filter(
      (c) => c === 'All' || listed.some((p) => p.category === c)
    ),
    [listed]
  );

  return (
    <section className="shop section" id="shop">
      <div className="container">
        <span className="section-label">Shop Skincare</span>
        <h2 className="section-title">Skin Script, curated by Kristin</h2>
        <p className="section-subtitle">
          Professional-grade, fruit-based formulas available only through a licensed
          esthetician. Pick up in-stock favorites at your visit, or have select items
          shipped straight to your door.
        </p>

        {listed.length === 0 ? (
          <p className="shop__empty">
            The shop is being stocked right now — check back very soon!
          </p>
        ) : (
          <>
            <div className="shop__filters">
              {availableCats.map((cat) => (
                <button
                  key={cat}
                  className={`shop__filter ${activeCat === cat ? 'shop__filter--active' : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="shop__grid">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <p className="shop__note">
              {SHOW_PRICES
                ? 'Prices are suggested retail. '
                : 'Pricing coming soon. '}
              Have a question about what's right for your skin?{' '}
              <a {...getBookingLinkProps()}>Book a consultation</a> and Kristin
              will build your routine with you.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
