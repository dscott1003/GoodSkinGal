import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">Esthetics by Kristin</p>
        <h1 className="hero__title">
          Your skin,<br />
          <em>beautifully cared for</em>
        </h1>
        <p className="hero__subtitle">
          Personalized facials and skincare in a calm, welcoming space.
          Real results, gentle touch, and a little glow along the way.
        </p>
        <div className="hero__actions">
          <a href="#contact" className="btn btn-primary">Book a Visit</a>
          <a href="#about" className="btn btn-secondary">Meet Kristin</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">✦</span>
            <span className="hero__stat-label">Custom facials</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">✦</span>
            <span className="hero__stat-label">Skin-first care</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">✦</span>
            <span className="hero__stat-label">Relax &amp; renew</span>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  );
}
