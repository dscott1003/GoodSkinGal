// ============================================================
//  BOOKING CONFIGURATION
// ============================================================
//  Paste your Vagaro booking link between the quotes below to
//  turn on real online booking everywhere on the site.
//
//  How to find your Vagaro link:
//    1. Log in to Vagaro
//    2. Go to  Settings  ->  Online Booking  ->  Direct URL / Widget
//    3. Copy your booking page URL (looks like:
//       https://www.vagaro.com/goodskingal )
//
//  Until you add a link, all "Book Now" buttons safely fall back
//  to the contact form (#contact) so nothing is broken.
// ============================================================

export const BOOKING_URL = 'https://www.vagaro.com/goodskingal';

// Returns the props a link should use for booking.
// - With a Vagaro URL: opens the booking page in a new tab.
// - Without one: scrolls to the contact form instead.
export function getBookingLinkProps() {
  if (BOOKING_URL) {
    return {
      href: BOOKING_URL,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return { href: '#contact' };
}

export const BOOKING_ENABLED = Boolean(BOOKING_URL);
