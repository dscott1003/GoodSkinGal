import { useState, useEffect } from 'react';
import { getBookingLinkProps } from '../config';
import { useCart } from '../shop/CartContext';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Shop', href: '#shop' },
  { label: 'Forms', href: '#forms' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#home" className="header__logo" onClick={closeMenu}>
          GoodSkin<span className="header__logo-accent">Gal</span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a
            {...getBookingLinkProps()}
            className="btn btn-primary header__cta"
            onClick={closeMenu}
          >
            Book Now
          </a>
        </nav>

        <button
          className="header__cart"
          onClick={() => { setOpen(true); closeMenu(); }}
          aria-label={`Open cart${count > 0 ? `, ${count} item${count === 1 ? '' : 's'}` : ''}`}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6L5 2H2" />
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
          </svg>
          {count > 0 && <span className="header__cart-badge">{count}</span>}
        </button>

        <button
          className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
