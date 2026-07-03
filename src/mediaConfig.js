// ============================================================
//  MEDIA CONFIGURATION  (hero reel + photo slideshow)
// ============================================================
//
//  --- THE HERO REEL (looping video on the home page) ---
//  1. Export your reel from Google Drive as an .mp4
//  2. Save it into the project's  public/  folder as  reel.mp4
//     (path on disk: public/reel.mp4)
//  3. Set REEL_ENABLED to true below.
//  Optional: add a poster image (public/reel-poster.jpg) that
//  shows while the video loads, and set REEL_POSTER to
//  '/reel-poster.jpg'.
//
//  Until REEL_ENABLED is true, the hero shows its original
//  animated design (nothing breaks).
//
//  --- THE PHOTO SLIDESHOW (crossfading gallery) ---
//  Just drop your photos into  src/assets/gallery/
//  (any .jpg/.jpeg/.png/.webp). They're picked up automatically
//  and shown in a fade in / fade out slideshow — no code needed.
//  Files are sorted by name, so prefix them (01_, 02_, ...) if
//  you want a specific order.
//
//  Until photos are added, the Gallery shows its placeholder grid.
// ============================================================

export const REEL_ENABLED = false;
export const REEL_SRC = '/reel.mp4';
export const REEL_POSTER = '';

// Seconds each photo stays fully visible before crossfading.
export const SLIDESHOW_INTERVAL_MS = 4000;
