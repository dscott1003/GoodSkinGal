import { useEffect, useState } from 'react';
import { SLIDESHOW_INTERVAL_MS } from '../mediaConfig';
import './Gallery.css';

// Auto-import every photo dropped into src/assets/gallery/.
// Files are sorted by name so you can control order with prefixes.
const galleryModules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
);
const GALLERY_IMAGES = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key]);

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
    return <GallerySlideshow images={GALLERY_IMAGES} />;
  }
  return <GalleryPlaceholder />;
}

function GallerySlideshow({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const id = setTimeout(() => {
      const next = (index + 1) % images.length;
      // Preload the next photo before crossfading to it.
      const preload = new Image();
      const advance = () => setIndex(next);
      preload.onload = advance;
      preload.onerror = advance;
      preload.src = images[next];
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, images]);

  // Only keep the current photo and its neighbors loaded so all 80+
  // images never download at once.
  const n = images.length;
  const active = new Set([index, (index + 1) % n, (index - 1 + n) % n]);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <span className="section-label">Gallery</span>
        <h2 className="section-title">A peek inside the experience</h2>
        <p className="section-subtitle">
          Real moments from the studio — a glimpse of the space, the care, and
          the glow.
        </p>

        <div className="slideshow" role="img" aria-label="GoodSkinGal photo slideshow">
          {images.map((src, i) => (
            <img
              key={i}
              className={`slideshow__photo ${i === index ? 'is-active' : ''}`}
              src={active.has(i) ? src : undefined}
              alt=""
              aria-hidden="true"
              draggable="false"
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
