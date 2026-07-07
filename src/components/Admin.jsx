import { useMemo, useState } from 'react';
import { useCatalog, updateProduct, resetOverrides, exportConfig } from '../shop/catalogStore';
import { useShowPrices, setShowPrices } from '../shop/settingsStore';
import { ADMIN_PASSCODE, ADMIN_SESSION_KEY } from '../shop/adminConfig';
import { CATEGORIES } from '../data/skinScriptProducts';
import './Admin.css';

function Login({ onSuccess }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSCODE) {
      try { sessionStorage.setItem(ADMIN_SESSION_KEY, '1'); } catch { /* ignore */ }
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin__login">
      <form className="admin__login-card" onSubmit={submit}>
        <h1 className="admin__login-title">GoodSkinGal Admin</h1>
        <p className="admin__login-sub">Enter the passcode to manage your shop.</p>
        <input
          type="password"
          className="admin__login-input"
          placeholder="Passcode"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          autoFocus
        />
        {error && <p className="admin__login-error">Incorrect passcode — try again.</p>}
        <button type="submit" className="btn btn-primary admin__login-btn">Enter</button>
        <a href="#home" className="admin__login-back">← Back to site</a>
      </form>
    </div>
  );
}

function Dashboard() {
  const catalog = useCatalog();
  const showPrices = useShowPrices();
  const [savedFlash, setSavedFlash] = useState('');

  const stats = useMemo(() => {
    const listed = catalog.filter((p) => p.listed);
    return {
      total: catalog.length,
      listed: listed.length,
      dropship: listed.filter((p) => p.dropship).length,
      inHouse: listed.filter((p) => !p.dropship).length,
    };
  }, [catalog]);

  const byCategory = useMemo(() => {
    const groups = {};
    for (const cat of CATEGORIES) {
      if (cat === 'All') continue;
      const rows = catalog.filter((p) => p.category === cat);
      if (rows.length) groups[cat] = rows;
    }
    return groups;
  }, [catalog]);

  const flash = (msg) => {
    setSavedFlash(msg);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setSavedFlash(''), 1500);
  };

  const logout = () => {
    try { sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch { /* ignore */ }
    window.location.hash = '#home';
    window.location.reload();
  };

  const doExport = async () => {
    const json = exportConfig();
    try {
      await navigator.clipboard.writeText(json);
      flash('Config copied to clipboard');
    } catch {
      flash('Copy failed — see console');
      // eslint-disable-next-line no-console
      console.log(json);
    }
  };

  return (
    <div className="admin">
      <header className="admin__bar">
        <div>
          <h1 className="admin__brand">GoodSkin<span>Gal</span> · Shop Admin</h1>
          <p className="admin__hint">Changes save automatically to this device.</p>
        </div>
        <div className="admin__bar-actions">
          {savedFlash && <span className="admin__flash">{savedFlash}</span>}
          <a href="#home" className="admin__link">View site</a>
          <button className="admin__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      <div className="admin__stats">
        <div className="admin__stat"><b>{stats.listed}</b><span>Public in shop</span></div>
        <div className="admin__stat"><b>{stats.inHouse}</b><span>In-house / pickup</span></div>
        <div className="admin__stat"><b>{stats.dropship}</b><span>Ships in 24 hrs</span></div>
        <div className="admin__stat"><b>{stats.total}</b><span>Total in catalog</span></div>
      </div>

      <div className="admin__legend">
        <p>
          <b>Public</b> — when on, the product appears in the shop. When off, it is
          NOT listed on the site.
          &nbsp;<b>Ships in 24 hrs</b> — Skin Script drop-ships it to the client
          ("Ships in 24 hrs, delivery times may vary based off location"). Off = you
          keep it in stock for pickup.
          &nbsp;Prices are loaded and ready — use the switch below to reveal them
          publicly when you're ready.
        </p>
      </div>

      <div className="admin__setting">
        <div className="admin__setting-text">
          <h3>Show prices on the public site</h3>
          <p>
            {showPrices
              ? 'Live prices are visible to visitors.'
              : 'Prices are hidden — the shop shows $xx.xx to visitors.'}
          </p>
        </div>
        <label className="admin__toggle admin__toggle--lg">
          <input
            type="checkbox"
            checked={showPrices}
            onChange={(e) => { setShowPrices(e.target.checked); flash(e.target.checked ? 'Prices are now public' : 'Prices hidden'); }}
          />
          <span />
        </label>
      </div>

      {Object.entries(byCategory).map(([cat, rows]) => (
        <section className="admin__group" key={cat}>
          <h2 className="admin__group-title">{cat}</h2>
          <div className="admin__table">
            <div className="admin__row admin__row--head">
              <span>Product</span>
              <span>Price</span>
              <span>Public</span>
              <span>Ships 24h</span>
              <span>In stock</span>
            </div>
            {rows.map((p) => (
              <div className={`admin__row ${p.listed ? '' : 'admin__row--off'}`} key={p.id}>
                <span className="admin__name">{p.name}</span>
                <span className="admin__price">
                  $
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={p.price}
                    onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                  />
                </span>
                <label className="admin__toggle">
                  <input
                    type="checkbox"
                    checked={p.listed}
                    onChange={(e) => updateProduct(p.id, { listed: e.target.checked })}
                  />
                  <span />
                </label>
                <label className="admin__toggle">
                  <input
                    type="checkbox"
                    checked={p.dropship}
                    onChange={(e) => updateProduct(p.id, { dropship: e.target.checked })}
                  />
                  <span />
                </label>
                <label className="admin__toggle">
                  <input
                    type="checkbox"
                    checked={p.inStock}
                    onChange={(e) => updateProduct(p.id, { inStock: e.target.checked })}
                  />
                  <span />
                </label>
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer className="admin__footer">
        <button className="btn btn-secondary" onClick={doExport}>Copy config (JSON)</button>
        <button
          className="admin__reset"
          onClick={() => {
            if (window.confirm('Reset all products to their defaults? This clears your changes on this device.')) {
              resetOverrides();
              flash('Reset to defaults');
            }
          }}
        >
          Reset to defaults
        </button>
      </footer>

      <p className="admin__note">
        Note: edits are stored in this browser. To control the live shop from any
        device and for all visitors, we'll connect a small hosted backend — ask your
        developer to enable it.
      </p>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'; } catch { return false; }
  });

  return authed ? <Dashboard /> : <Login onSuccess={() => setAuthed(true)} />;
}
