import { useCallback, useEffect, useRef, useState } from 'react';
import './Gallery.css';

// Auto-import every photo dropped into src/assets/gallery/.
const galleryModules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
);
const GALLERY_IMAGES = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key]);

const TILE_COUNT = 8;

const PLACEHOLDER_ITEMS = [
  { id: 1, label: 'Treatment room', gradient: 'linear-gradient(135deg, #C9DCE6, #E7DCCF)' },
  { id: 2, label: 'Facial glow', gradient: 'linear-gradient(135deg, #E7DCCF, #CBB6A2)' },
  { id: 3, label: 'Skincare ritual', gradient: 'linear-gradient(135deg, #CBB6A2, #5D768B)' },
  { id: 4, label: 'Calm ambiance', gradient: 'linear-gradient(135deg, #F4F1EB, #C9DCE6)' },
  { id: 5, label: 'Before & after', gradient: 'linear-gradient(135deg, #5D768B, #C9DCE6)' },
  { id: 6, label: 'Product favorites', gradient: 'linear-gradient(135deg, #C9DCE6, #F4F1EB)' },
];

export default function Gallery() {
  if (GALLERY_IMAGES.length > 0) {
    return <GalleryMosaic images={GALLERY_IMAGES} />;
  }
  return <GalleryPlaceholder />;
}

function GalleryMosaic({ images }) {
  // Track which images are currently on screen so no two tiles show the
  // same photo at the same moment.
  const inUse = useRef(new Set());

  const pickImage = useCallback(
    (exclude) => {
      let pool = images.filter(
        (img) => img !== exclude && !inUse.current.has(img),
      );
      if (pool.length === 0) {
        pool = images.filter((img) => img !== exclude);
      }
      if (pool.length === 0) pool = images;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      inUse.current.add(chosen);
      return chosen;
    },
    [images],
  );

  const releaseImage = useCallback((img) => {
    if (img) inUse.current.delete(img);
  }, []);

  const tileCount = Math.min(TILE_COUNT, images.length);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <span className="section-label">Gallery</span>
        <h2 className="section-title">A peek inside the experience</h2>
        <p className="section-subtitle">
          Real skin, real results — a living look at the faces, treatments, and
          glow that come through the studio.
        </p>

        <div className="gallery__grid gallery__grid--live">
          {Array.from({ length: tileCount }).map((_, i) => (
            <GalleryTile
              key={i}
              className={`gallery__tile--${i + 1}`}
              pick={pickImage}
              release={releaseImage}
            />
          ))}
        </div>

        <div className="gallery__cta">
          <a
            href="https://instagram.com/goodskingal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            See more on @goodskingal
          </a>
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ className, pick, release }) {
  const [layers, setLayers] = useState(() => ({
    a: pick(null),
    b: null,
    showA: true,
  }));
  const layersRef = useRef(layers);
  layersRef.current = layers;

  useEffect(() => {
    let alive = true;
    let timer;

    const tick = () => {
      // Each tile fades on its own random rhythm so they never move together.
      const wait = 2600 + Math.random() * 4600;
      timer = setTimeout(() => {
        if (!alive) return;
        const { a, b, showA } = layersRef.current;
        const visible = showA ? a : b;
        const incoming = pick(visible);

        const swap = () => {
          if (!alive) {
            release(incoming);
            return;
          }
          setLayers((prev) => {
            const replaced = prev.showA ? prev.b : prev.a;
            release(replaced);
            return prev.showA
              ? { a: prev.a, b: incoming, showA: false }
              : { a: incoming, b: prev.b, showA: true };
          });
          tick();
        };

        // Preload so the crossfade is smooth.
        const img = new Image();
        img.onload = swap;
        img.onerror = swap;
        img.src = incoming;
      }, wait);
    };

    tick();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [pick, release]);

  return (
    <div className={`gallery__tile ${className}`}>
      <img
        className="gallery__tile-img"
        src={layers.a || undefined}
        style={{ opacity: layers.showA ? 1 : 0 }}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="gallery__tile-img"
        src={layers.b || undefined}
        style={{ opacity: layers.showA ? 0 : 1 }}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </div>
  );
}

function GalleryPlaceholder() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <span className="section-label">Gallery</span>
        <h2 className="section-title">A peek inside the experience</h2>
        <p className="section-subtitle">
          Real moments from the studio — swap these placeholders with your own
          photos anytime. Follow along on Instagram for the latest.
        </p>

        <div className="gallery__grid">
          {PLACEHOLDER_ITEMS.map((item, index) => (
            <button
              key={item.id}
              className={`gallery__item gallery__item--${index + 1}`}
              style={{ background: item.gradient }}
              onClick={() => setActiveItem(item)}
              aria-label={`View ${item.label}`}
            >
              <span className="gallery__item-label">{item.label}</span>
              <span className="gallery__item-hint">View</span>
            </button>
          ))}
        </div>

        <div className="gallery__cta">
          <a
            href="https://instagram.com/goodskingal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            See more on @goodskingal
          </a>
        </div>
      </div>

      {activeItem && (
        <div
          className="gallery__lightbox"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.label}
        >
          <div
            className="gallery__lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery__lightbox-close"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div
              className="gallery__lightbox-image"
              style={{ background: activeItem.gradient }}
            />
            <p className="gallery__lightbox-caption">{activeItem.label}</p>
            <p className="gallery__lightbox-note">
              Replace with your own photo — drop images into the project when ready.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
